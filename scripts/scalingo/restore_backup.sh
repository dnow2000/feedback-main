#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset


if [ "$1" == "-h" ]; then
    echo "$(basename "$0") [-h] [-a s1 -b s2 -d s3 -p s4 -o] -- program to restore a backup file on Scalingo database
where:
    -h  show this help text
    -a  Scalingo app name (required)
    -b  path to backup file
    -f  backup file name
    -d  POSTGRES_URL (required)
    -p  PG_PASSWORD (required)
    -u  PG_USER (required)
    -o  get last dump from production (OVH)"
    # TODO: remove this last option when migration to Scalingo is over
    exit 0
fi

# GET APPLICATION NAME
if [[ $# -gt 1 ]] && [[ "$1" == "-a" ]]; then
  APP_NAME=$2
  shift 2
else
  echo "You must provide a project name."
  exit 1
fi

# PROVIDE BACKUP PATH
if [[ $# -gt 2 ]] && [[ "$1" == "-b" ]]; then
  BACKUP_PATH=$2
  shift 2
else
  BACKUP_PATH=~/science-feedback-main/api/db_dumps/
  echo "Using default BACKUP_PATH."
fi

# PROVIDE BACKUP FILE
if [[ $# -gt 2 ]] && [[ "$1" == "-f" ]]; then
  BACKUP_FILE="$BACKUP_PATH"/$2
  shift 2
else
  BACKUP_FILE="$BACKUP_PATH"/`date +%Y%m%d_%H%M%S`.pgdump
  exit 1
fi

# GET FILE NAME
if [[ $# -gt 1 ]] && [[ "$1" == "-f" ]]; then
  FILE_NAME="$BACKUP_PATH"/$2
  shift 2
else
  FILE_NAME="$BACKUP_PATH"/`date +%Y%m%d_%H%M%S`.pgdump
fi

# GET POSTGRES_URL
if [[ $# -gt 2 ]] && [[ "$1" == "-d" ]]; then
  POSTGRES_URL=$2
  shift 2
else
  echo "You must provide the POSTGRES_URL you want to access."
  exit 1
fi

# GET SCALINGO_PG_PASSWORD
if [[ $# -gt 2 ]] && [[ "$1" == "-p" ]]; then
  PG_PASSWORD=$2
  shift 2
else
  echo "You must provide the SCALINGO_PG_PASSWORD for the database."
  exit 1
fi

# GET SCALINGO_PG_USER
if [[ $# -gt 1 ]] && [[ "$1" == "-u" ]]; then
  PG_USER=$2
  shift 2
else
  echo "You must provide the SCALINGO_PG_USER for the database."
  exit 1
fi

scalingo -a "$APP_NAME" db-tunnel "$POSTGRES_URL" &
sleep 3
DB_TUNNEL_PID=$!
PGPASSWORD="$PG_PASSWORD" pg_restore --clean --host 127.0.0.1 \
                                     --port 10000 \
                                     --username "$PG_USER" \
                                     --no-owner \
                                     --no-privileges \
                                     --dbname "$PG_USER" "$BACKUP_FILE" 2>&1 | grep -v 'must be owner of extension plpgsql' | grep -v 'must be owner of schema public' | grep -v 'ERROR:  schema "public" already exists' > restore_error.log
if grep -q 'ERROR' restore_error.log; then
  echo "Backup fail.."
  echo "ERRORS found during restore backup. Please see file: restore_error.log"
else
  echo "Backup success !"
fi

echo "$DB_TUNNEL_PID"
# for some reason kill -2 does not work (network issues maybe)
sudo kill -9 "$DB_TUNNEL_PID"

echo "Backup restored."

echo "Restarting backend.."
/usr/local/bin/scalingo -a "$APP_NAME" restart

echo "Backup restored."

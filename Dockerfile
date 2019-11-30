FROM ubuntu:14.04

RUN apt-get update && \
    apt-get install -y \
            software-properties-common
RUN add-apt-repository universe
RUN apt-get update && \
    apt-get install -y \
            apt-transport-https \
            ca-certificates \
            curl \
            git \
            gnupg2 \
            php5-mcrypt \
            python3.4 \
            python3-pip \
            software-properties-common

RUN curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add - && \
    apt-key fingerprint 0EBFCD8 && \
    add-apt-repository \
           "deb [arch=amd64] https://download.docker.com/linux/debian \
           $(lsb_release -cs) \
           stable" && \
    apt-get update && \
    apt-get install -y \
            docker-ce \
            docker-ce-cli \
            containerd.io && \
    if [ $# -eq 1 ]; then \
      ALLOWED_DOCKER_USER=$1 \
      usermod -a -G docker $ALLOWED_DOCKER_USER; \
    fi

COPY ./sf /opt/sf
COPY ./docker-compose.test-api.yml /opt/docker-compose.test-api.yml
COPY ./nginx /opt/nginx
COPY ./api /opt/api
COPY ./params.txt /opt/params.txr
COPY ./.env /opt/.env
COPY ./requirements.txt /opt/requirements.txt

WORKDIR /opt

RUN python3 -m virtualenv venv && \
    . venv/bin/activate & \
    pip install --upgrade pip & \
    pip install -r requirements.txt

RUN . venv/bin/activate

RUN ./sf -m test-end2end start

RUN mkdir -p /opt/docker-caches/
RUN docker images | sed '1d' | awk '{print $1 " " $2 " " $3}' > ~/opt/docker-caches/images.list
RUN docker save $(docker images -q) -o ~/main-ci/docker-caches/images.tar

RUN docker images --no-trunc --format '{{.ID}}' | xargs docker rmi

RUN docker load -i /opt/docker-caches/images.tar
RUN while read REPOSITORY TAG IMAGE_ID \
    do \
    echo "== Tagging $REPOSITORY $TAG $IMAGE_ID ==" \
    docker tag "$IMAGE_ID" "$REPOSITORY:$TAG" \
    done < ~/main-ci/docker-caches/<<parameters.mode>>/images.list

RUN ./sf -m test-end2end start

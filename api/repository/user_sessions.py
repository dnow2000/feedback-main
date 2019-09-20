from uuid import UUID
from sqlalchemy_handler import Handler

from models import UserSession


def register_user_session(user_id: int, session_uuid: UUID):
    session = UserSession()
    session.userId = user_id
    session.uuid = session_uuid
    Handler.save(session)


def delete_user_session(user_id: int, session_uuid: UUID):
    session = UserSession.query \
        .filter_by(userId=user_id, uuid=session_uuid) \
        .first()
    Handler.delete(session)


def existing_user_session(user_id: int, session_uuid: UUID) -> bool:
    session = UserSession.query \
        .filter_by(userId=user_id, uuid=session_uuid) \
        .first()
    return session is not None

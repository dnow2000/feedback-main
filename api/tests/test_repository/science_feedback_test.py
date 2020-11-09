# pylint: disable=W0613

import pytest
from sqlalchemy_api_handler import ApiHandler

from models.claim import Claim
from models.content import Content
from models.link import Link
from models.user import User
from models.verdict import Verdict
from repository.science_feedback import sync
from repository.tags import sync as sync_tags
from tests.decorators import with_delete


@pytest.mark.standalone
@with_delete
def when_sync_is_a_success(app):
    # given
    sync_tags()

    # when
    sync()

    # then
    for model in [Claim, Content, Link, User, Verdict]:
        print(model, len(model.query.all()))
        assert len(model.query.all()) > 0

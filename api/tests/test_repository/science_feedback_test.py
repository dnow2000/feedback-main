# pylint: disable=W0613

import pytest
from sqlalchemy_api_handler import ApiHandler

from models.appearance import Appearance
from models.claim import Claim
from models.content import Content
from models.review import Review
from models.user import User
from repository.science_feedback import sync
from tests.decorators import with_clean


@pytest.mark.standalone
@with_clean
def when_sync_is_a_success(app):
    # when
    sync()

    # then
    for model in [Appearance, Claim, Content, Review, User]:
        print(model, len(model.query.all()))
        assert len(model.query.all()) > 0

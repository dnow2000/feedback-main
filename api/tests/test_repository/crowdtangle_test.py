# pylint: disable=W0613

import pytest
from sqlalchemy_api_handler import ApiHandler

from models.content import Content
from repository.crowdtangle import attach_crowdtangle_entities_from_content
from tests.decorators import with_clean


@pytest.mark.standalone
@with_clean
def when_crowdtangle_attach_entities_to_content(app):
    # given
    content = Content(url='https://twitter.com/davidicke/status/1262482651333738500')
    ApiHandler.save(content)

    # when
    attach_crowdtangle_entities_from_content(content)

    # then
    print(content.quotedFromAppearances)
    assert 3 == 2

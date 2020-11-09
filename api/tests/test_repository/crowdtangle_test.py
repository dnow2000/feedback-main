# pylint: disable=W0613

import pytest
from sqlalchemy_api_handler import ApiHandler

from models.content import Content
from repository.crowdtangle import attach_crowdtangle_entities_from_content
from tests.decorators import with_delete


def crowdtangle_test(url):
    content = Content(url=url)
    ApiHandler.save(content)
    attach_crowdtangle_entities_from_content(content,
                                             request_start_date='2019-09-01')
    return content


@pytest.mark.standalone
@with_delete
def when_crowdtangle_attach_entities_to_content_gives_a_few_results(app):
    content = crowdtangle_test('https://www.dcclothesline.com/2019/12/24/warning-what-men-need-to-know-before-eating-impossible-whoppers-from-burger-king/')
    assert len(content.whereItIsLinkedLinks.all()) > 0


@pytest.mark.standalone
@with_delete
def when_crowdtangle_attach_entities_to_content_gives_no_result(app):
    content = crowdtangle_test('https://nexusnewsfeed.com/article/geopolitics/as-riots-continue-more-evidence-that-covid-19-narrative-was-fake-news')
    assert len(content.whereItIsLinkedLinks.all()) == 0

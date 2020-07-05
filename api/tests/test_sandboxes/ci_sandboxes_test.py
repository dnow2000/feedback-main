import pytest

from sandboxes.create_sandbox import create_sandbox
from tests.test_sandboxes import assert_created_counts
from utils.logger import deactivate_logger


@pytest.mark.standalone
def when_ci_sandbox_created_all_the_ci_objects(app):
    deactivate_logger('info')
    create_sandbox('ci')
    assert_created_counts(
        Article=6,
        ArticleTag=5,
        AuthorArticle=0,
        AuthorContent=0,
        Evaluation=11,
        Publication=0,
        Review=3,
        ReviewerPublication=0,
        ReviewTag=3,
        Role=36,
        Scope=41,
        Content=6,
        ContentTag=5,
        User=24,
        UserSession=0,
        UserTag=2,
        Verdict=1,
        VerdictTag=1,
        VerdictReviewer=1,
    )

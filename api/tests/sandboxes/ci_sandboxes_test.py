import pytest

from sandboxes.scripts.create_sandbox import create_sandbox
from tests.utils.count import assert_created_counts
from utils.logger import deactivate_logger

@pytest.mark.standalone
def when_ci_sandbox_created_all_the_ci_objects(app):
    deactivate_logger('info')
    create_sandbox('ci')
    assert_created_counts(
        Article=6,
        ArticleTag=5,
        Evaluation=11,
        Publication=0,
        Review=3,
        ReviewTag=3,
        Role=24,
        Scope=43,
        User=18,
        UserArticle=0,
        UserPublication=0,
        UserSession=0,
        UserTag=2,
        Verdict=1,
        VerdictTag=1,
        VerdictUser=1,
    )

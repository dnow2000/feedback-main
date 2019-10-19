import pytest

from sandboxes.scripts.creators.ci import create_sandbox
from tests.utils.clean import with_clean_all_database
from tests.utils.count import assert_created_counts,\
                              get_saved_counts_by_model_name
from utils.logger import deactivate_logger

@pytest.mark.standalone
@with_clean_all_database
def test_ci_sandbox_created_all_the_ci_objects():
    saved_counts_by_model_name = get_saved_counts_by_model_name()
    deactivate_logger('info')
    create_sandbox()
    assert_created_counts(
        saved_counts_by_model_name,
        Article=6,
        ArticleTag=0,
        Evaluation=10,
        Publication=0,
        Review=3,
        ReviewTag=0,
        Role=24,
        Scope=0,
        User=18,
        UserArticle=0,
        UserPublication=0,
        UserSession=0,
        UserTag=0,
        Verdict=1,
        VerdictTag=0,
        VerdictUser=0,
    )

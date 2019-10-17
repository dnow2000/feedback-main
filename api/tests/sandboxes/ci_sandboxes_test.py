import pytest

from sandboxes.scripts.creators.ci import create_sandbox
from tests.utils.clean import with_clean_all_database
from tests.utils.count import assert_created_counts,\
                              get_saved_counts_by_model_name
from utils.logger import deactivate_logger

@pytest.mark.standalone
@with_clean_all_database
def test_ci_sandbox_created_all_the_ci_objects(app):
    saved_counts_by_model_name = get_saved_counts_by_model_name(app)
    deactivate_logger('info')
    create_sandbox()
    assert_created_counts(
        app,
        saved_counts_by_model_name,
        Article=6,
        Evaluation=10,
        Review=3,
        Role=24,
        User=18,
        Verdict=1
    )

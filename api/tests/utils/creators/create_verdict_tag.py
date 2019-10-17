from models.verdict_tag import VerdictTag

def create_verdict_tag(
        verdict=None,
        tag=None
):
    verdict_tag = VerdictTag()
    verdict_tag.verdict = verdict
    verdict_tag.tag = tag
    return verdict_tag

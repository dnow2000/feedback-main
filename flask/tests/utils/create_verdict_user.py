from models.verdict_user import VerdictUser

def create_verdict_user(
        verdict=None,
        user=None
):
    verdict_user = VerdictUser()
    verdict_user.verdict = verdict
    verdict_user.user = user
    return verdict_user

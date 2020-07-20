from models.appearance import Appearance


def keep_appearances_from_verdict(query, verdict):
    appearance_ids = [ap.id for ap in verdict.claim.quotedFromAppearances]
    return query.filter(Appearance.id._in(appearance_ids))

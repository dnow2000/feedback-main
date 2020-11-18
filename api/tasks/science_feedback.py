from celery import chain

from repository.science_feedback.airtable import create_or_modify_sf_organization_and_media, \
                                                 entity_rows_from_table, \
                                                 NAME_TO_AIRTABLE, \
                                                 SCIENCE_FEEDBACK_AIRTABLE_BASE_ID
from repository.science_feedback.wordpress import claim_tags_from_verdict
from tasks import celery_app
from utils.airtable import update_airtable_rows


def chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


@celery_app.task
def sync_to_airtable(rows):
    records = [{
        'fields': {'Synced time input': row['Synced time input']},
        'id': row['airtableId']
    } for row in rows]
    result = update_airtable_rows(SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
                                  NAME_TO_AIRTABLE[name],
                                  {'records': records})
    if result.status_code != 200:
        return { 'code': result.status_code, 'error': result.content }
    return result.json


@celery_app.task
def sync_with_rows(formula, max_records=None):
    result = {}
    for name in NAME_TO_AIRTABLE:
        rows = entity_rows_from_table(name,
                                      formula=formula,
                                      max_records=max_records)
        failed_rows = []
        succeeded_rows = []
        for row in rows:
            if row.get('entity'):
                succeeded_rows.append(row)
            else:
                failed_rows.append(row)
        result[name] = {
            'fails': len(failed_rows),
            'success': len(succeeded_rows)
        }
        chain(*[
            sync_to_airtable.si(chunked_rows)
            for chunked_rows in chunks(failed_rows, 5)
        ]).delay()
        entities = [row['entity'] for row in succeeded_rows]
        ApiHandler.save(*entities)
    return result


@celery_app.task
def sync_with_claim_review(verdict_id=None):
    verdict = ApiHandler.model_from_name('Verdict') \
                        .query.get(verdict_id)
    if verdict.scienceFeedbackUrl:
        tags = claim_tags_from_verdict(verdict)
        ApiHandler.save(verdict)
        return [tag.label for tag in tags]
    return { 'scienceFeedbackIdentifier': 'Does not exist so no need to sync with claim review.' }

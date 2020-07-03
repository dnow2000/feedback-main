import os
import requests
import json

from domain.crossref import get_publication_from_doi, \
                            is_publication_valid_for


ORCID_TOKEN = os.environ.get('ORCID_TOKEN')


def reorganize_publication_data(orcid_record):

    publication_list = list()

    raw_publication_list = orcid_record['activities-summary']['works']['group']

    for publication_index in range(len(raw_publication_list)):

        # We keep only the person's works that are "journal-article", and not "conference-paper" or "other"...
        if raw_publication_list[publication_index]['work-summary'][0]['type'] == 'journal-article':

            # There can have duplicate versions for the same article from different sources
            # (Crossref, ResearchID, the person itself) so we first need to decide on which duplicate to select.
            # If there is only one information source, we take this:
            duplicate_chosen = 0
            # If there are multiple sources, we take first the Crossref or else the ResearchID:
            if raw_publication_list[publication_index]['work-summary'][0]['type'] == 'journal-article':
                if len(raw_publication_list[publication_index]['work-summary']) > 1:
                    for duplicate_id in range(len(raw_publication_list[publication_index]['work-summary'])):
                        if raw_publication_list[publication_index]['work-summary'][duplicate_id]['source']:
                            if raw_publication_list[publication_index]['work-summary'][duplicate_id]['source']['source-name']['value'] == 'ResearcherID':
                                duplicate_chosen = duplicate_id
                    for duplicate_id in range(len(raw_publication_list[publication_index]['work-summary'])):
                        if raw_publication_list[publication_index]['work-summary'][duplicate_id]['source']:
                            if raw_publication_list[publication_index]['work-summary'][duplicate_id]['source']['source-name']['value'] == 'Crossref':
                                duplicate_chosen = duplicate_id


            # We gather these informations about the research articles:
            # 1/ the DOI and its URL
            doi = str()
            url = str()
            # In the ORCid API, this value can be equal to None, but there also can be several external ids:
            external_ids = raw_publication_list[publication_index]['external-ids']['external-id']
            if external_ids:
                for external_id in range(len(external_ids)):
                    if external_ids[external_id]['external-id-type'] == "doi":
                        doi = external_ids[external_id]['external-id-value']
                        url = "http://dx.doi.org/" + doi

            # 2/ the article's title
            title = str()
            title = raw_publication_list[publication_index]['work-summary'][duplicate_chosen]['title']['title']['value']

            # 3/ the journal's name
            journal_name = str()
            if raw_publication_list[publication_index]['work-summary'][duplicate_chosen]['journal-title']:
                journal_name = raw_publication_list[publication_index]['work-summary'][duplicate_chosen]['journal-title']['value']

            # 4/ the publication date
            publication_year = str()
            if raw_publication_list[publication_index]['work-summary'][duplicate_chosen]['publication-date']:
                publication_year = int(raw_publication_list[publication_index]['work-summary'][duplicate_chosen]['publication-date']['year']['value'])

            publication_list.append({'doi':              doi,
                                'title':            title,
                                'journal_name':     journal_name,
                                'publication_year': publication_year,
                                'author_list':      [],
                                'url':              url,
                                'is_valid':         False})

    return(publication_list)


def reorganize_person_datum(orcid_record):
    return {
        'first_name': orcid_record['person']['name']['given-names']['value'],
        'last_name': orcid_record['person']['name']['family-name']['value']
    }


def get_publications_from_orcid_id(orcid_id):
    url_orcid = 'https://pub.orcid.org/v3.0/{}/record'.format(orcid_id)
    headers={
        'Accept': 'application/json',
        'Authorization': 'OAuth {}'.format(ORCID_TOKEN)
    }
    response = requests.get(url_orcid, headers=headers)

    if response.status_code != 200:
        return []

    orcid_record = json.loads(response.content.decode('utf-8'))

    publications = reorganize_publication_data(orcid_record)
    person = reorganize_person_datum(orcid_record)

    for publication in publications:
        if publication['doi']:
            publication_from_doi = get_publication_from_doi(publication['doi'])
            if publication_from_doi:
                publication.update(publication_from_doi)
        publication['is_valid'] = is_publication_valid_for(person, publication)

    return publications

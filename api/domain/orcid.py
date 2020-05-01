import requests
import json

from domain.crossref import get_article_from_doi


def reorganize_articles_data(orcid_record):

    article_list = list()

    raw_article_list = orcid_record['activities-summary']['works']['group']

    for article_index in range(len(raw_article_list)):

        # We keep only the person's works that are "journal-article", and not "conference-paper" or "other"...
        if raw_article_list[article_index]['work-summary'][0]['type'] == 'journal-article':

            # There can have duplicate versions for the same article from different sources 
            # (Crossref, ResearchID, the person itself) so we first need to decide on which duplicate to select.
            # If there is only one information source, we take this:
            duplicate_chosen = 0
            # If there are multiple sources, we take first the Crossref or else the ResearchID:
            if raw_article_list[article_index]['work-summary'][0]['type'] == 'journal-article':
                if len(raw_article_list[article_index]['work-summary']) > 1:
                    for duplicate_id in range(len(raw_article_list[article_index]['work-summary'])):
                        if raw_article_list[article_index]['work-summary'][duplicate_id]['source']:
                            if raw_article_list[article_index]['work-summary'][duplicate_id]['source']['source-name']['value'] == 'ResearcherID':
                                duplicate_chosen = duplicate_id
                    for duplicate_id in range(len(raw_article_list[article_index]['work-summary'])):
                        if raw_article_list[article_index]['work-summary'][duplicate_id]['source']:
                            if raw_article_list[article_index]['work-summary'][duplicate_id]['source']['source-name']['value'] == 'Crossref':
                                duplicate_chosen = duplicate_id
                

            # We gather these informations about the research articles:
            # 1/ the DOI and its URL
            doi = str()
            url = str()
            # In the ORCid API, this value can be equal to None, but there also can be several external ids:
            external_ids = raw_article_list[article_index]['external-ids']['external-id']
            if external_ids:
                for external_id in range(len(external_ids)):
                    if external_ids[external_id]['external-id-type'] == "doi":
                        doi = external_ids[external_id]['external-id-value']
                        url = "http://dx.doi.org/" + doi                           

            # 2/ the article's title
            title = str()
            title = raw_article_list[article_index]['work-summary'][duplicate_chosen]['title']['title']['value']

            # 3/ the journal's name
            journal_name = str()
            if raw_article_list[article_index]['work-summary'][duplicate_chosen]['journal-title']:
                journal_name = raw_article_list[article_index]['work-summary'][duplicate_chosen]['journal-title']['value']

            # 4/ the publication date
            publication_year = str()
            if raw_article_list[article_index]['work-summary'][duplicate_chosen]['publication-date']:
                publication_year = int(raw_article_list[article_index]['work-summary'][duplicate_chosen]['publication-date']['year']['value'])

            article_list.append({'doi':              doi, 
                                'title':            title,
                                'journal_name':     journal_name,
                                'publication_year': publication_year,
                                'url':              url,
                                'is_valid':         False})

    return(article_list)


def reorganize_person_data(orcid_record):
    first_name = orcid_record['person']['name']['given-names']['value']
    last_name = orcid_record['person']['name']['family-name']['value']
    return(first_name, last_name)


def get_articles_from_orcid_id(orcid_id):

    articles = {"articles": list()}

    url_orcid = 'https://pub.orcid.org/v3.0/{}/record'.format(orcid_id)
    headers={"Accept": "application/json",
            "Authorization": "OAuth 7d33792c-ca06-4905-84b1-b061e498731c"}
    response = requests.get(url_orcid, headers=headers)

    if response.status_code == 200:

        orcid_record = json.loads(response.content.decode('utf-8'))

        articles["articles"] = reorganize_articles_data(orcid_record)
        first_name, last_name = reorganize_person_data(orcid_record)

        for article_index in range(len(articles['articles'])):

            articles['articles'][article_index] = get_article_from_doi(articles['articles'][article_index]['doi'],
                                                        articles['articles'][article_index], first_name, last_name)

    return(articles)
    
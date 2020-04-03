import requests
import json


def request_api(url, headers=None):

    try:
        data = requests.get(url, headers=headers, timeout=5)
        
        data.raise_for_status() # because HTTP errors are not raised by default
        data.encoding = 'UTF-8'
        data = data.json()

        connection_check = True
        
    except requests.HTTPError as e:
        if e.response.status_code == 404:
            print("ERROR: This ORCid or DOI does not exist ({}).".format(url))
        else :
            print("ERROR: Checking internet connection failed, status code {0}.".format(
            e.response.status_code))
        connection_check = False

    except requests.ConnectionError:
        print("ERROR: No internet connection available.")
        connection_check = False

    return(data, connection_check)


def reorganize_article_data_from_orcid_api(record):

    raw_article_list = record['activities-summary']['works']['group']

    article_list = list()

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
                        url = external_ids[external_id]['external-id-url']['value']

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
                publication_year = raw_article_list[article_index]['work-summary'][duplicate_chosen]['publication-date']['year']['value']

            article_list.append({'doi':              doi, 
                                 'title':            title,
                                 'journal_name':     journal_name,
                                 'publication_year': publication_year,
                                 'url':              url})

    return article_list


def reorganize_person_data_from_orcid_api(record, article_list):

    orcid_data = {'first_name': record['person']['name']['given-names']['value'],
                  'last_name':  record['person']['name']['family-name']['value'],
                  'articles':   article_list} 

    return orcid_data


def record_from_orcid_id(orcid_id):

    content = dict()

    url_orcid = 'https://pub.orcid.org/v3.0/{}/record'.format(str(orcid_id))
    orcid_record, connection_check = request_api(url = url_orcid, 
                                                 headers={"Accept": "application/json"})

    if connection_check:

        article_list = reorganize_article_data_from_orcid_api(orcid_record)
        orcid_data = reorganize_person_data_from_orcid_api(orcid_record, article_list)

        for article_index in range(len(orcid_data['articles'])):
            content.update({'publication' + str(article_index + 1) : \
                orcid_data['articles'][article_index]['url']})

    return content
import requests
import json
import time


def reorganize_article_data(crossref_record):

    raw_article = crossref_record['message']

    title = str()
    if raw_article['title']:
        title = raw_article['title'][0]

    journal_name = str()
    if raw_article['container-title']:
        journal_name = raw_article['container-title'][0]

    publication_year = str()
    if raw_article['issued']:
        publication_year = raw_article['issued']['date-parts'][0][0]

    author_list = list()
    if raw_article['author']:
        for author_index in range(len(raw_article['author'])):
            # First test that 'given' and 'family' are both valid keys for this author dictionary:
            if all(x in raw_article['author'][author_index] for x in ['given', 'family']):
                author_list.append(raw_article['author'][author_index]['given'] + ' ' + 
                                   raw_article['author'][author_index]['family'])

    url = str()
    if raw_article['URL']:
        url = raw_article['URL']

    article = {
        'title':            title,
        'journal_name':     journal_name,
        'publication_year': publication_year,
        'author_list':      author_list,
        'url':              url,
        'is_valid':         False
        }

    return(article)


def find_if_date_is_valid(publication_year):
    today_year = int(time.strftime("%Y,%m,%d,%H,%M,%S").split(',')[0])
    is_date_valid = (publication_year >= today_year - 5)
    return(is_date_valid)


def find_author_in_list_and_where(author_list, first_name, last_name):

    first_name = first_name.strip().split()[0]
    last_name = last_name.strip().split()[-1]

    for index, author in enumerate(author_list):
        if (first_name == author.strip().split()[0]) & (last_name == author.strip().split()[-1]):
            return(True, index + 1)

    return(False, 0)


def find_author_good_position(author_position, length_list):
    if (author_position == 1) | (length_list == 2):
        return True
    return False


def get_article_from_doi(doi, article, first_name, last_name):

    is_doi_valid = is_date_valid = is_author_in_list = is_author_good_position = False

    if doi:
        url_crosseref = 'https://api.crossref.org/works/{}'.format(doi)
        response = requests.get(url_crosseref)

        if response.status_code == 200:
            is_doi_valid = True

            crossref_record = json.loads(response.content.decode('utf-8'))
            article = reorganize_article_data(crossref_record)

            is_date_valid = find_if_date_is_valid(article['publication_year'])
            is_author_in_list, author_position = find_author_in_list_and_where(article['author_list'],
                                                    first_name, last_name)
            if is_author_in_list:
                is_author_good_position = find_author_good_position(author_position, 
                                            len(article['author_list']))


    if is_doi_valid and is_date_valid and is_author_in_list and is_author_good_position:
        article['is_valid'] = True

    return(article)

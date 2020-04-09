def article_dict_from(row):
    return {
        'title': row['Claim checked (or Headline if no main claim)'],
        'url': row['Archive link']
    }


def claim_dict_from(row):
    return {
        'text': row['Claim checked (or Headline if no main claim)']
    }


def review_dict_from(row):
    pass


def user_dict_from(row):
    pass

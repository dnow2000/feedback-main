def article_dict_from(row):
    print(row)
    return {
        'title': row['Claim checked (or Headline if no main claim)'],
        'url': row['Archive link']
    }


def claim_dict_from(row):
    return {
        'text': row['Claim checked (or Headline if no main claim)']
    }


def reviewer_dict_from(row):
    return {
        'airtableId': row['airtableId'],
        'email': row['Email'],
        'firstName': row['First name'],
        'lastName': row['Last name']
    }

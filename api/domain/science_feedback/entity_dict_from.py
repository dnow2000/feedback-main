def article_dict_from(row):
    #print(row)
    return {
        'scienceFeedbackId': row['airtableId'],
        'title': row['Claim checked (or Headline if no main claim)'],
        'url': row['Archive link']
    }


def claim_dict_from(row):
    return {
        'scienceFeedbackId': row['airtableId'],
        'text': row['Claim checked (or Headline if no main claim)']
    }


def review_dict_from(row):
    print(row)
    return {
        'scienceFeedbackId': row['airtableId'],
    }


def reviewer_dict_from(row):
    return {
        'email': row['Email'],
        'firstName': row['First name'],
        'lastName': row['Last name'],
        'scienceFeedbackId': row['airtableId']
    }

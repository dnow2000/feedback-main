from models.detail import Detail

def create_detail(issue, info, label):
  detail = Detail()

  detail.issue = issue
  detail.info = info
  detail.label = label

  return detail

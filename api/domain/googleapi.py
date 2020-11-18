import requests
import os
from pprint import pprint

DATA_GOOGLE_API_KEY = os.environ['DATAGOOGLEAPIKEY']
GOOGLE_API = 'https://factchecktools.googleapis.com/'

def get_claims_title(query):
  url = '{}/v1alpha1/claims:search?key={}&query={}'.format(GOOGLE_API,DATA_GOOGLE_API_KEY,query)
  response = requests.get(url)
  pprint(response.json()['claims'])

get_claims(argv[0])

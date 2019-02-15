""" screenshotmachine """
import os
import requests

SCREEN_SHOT_MACHINE_KEY = os.environ.get('SCREEN_SHOT_MACHINE_KEY', '')
SCREEN_SHOT_MACHINE_URL = 'http://api.screenshotmachine.com/?key=' + SCREEN_SHOT_MACHINE_KEY

def capture(url):
    url = SCREEN_SHOT_MACHINE_URL + '&url=' + url
    result = requests.get(url)
    return result.content

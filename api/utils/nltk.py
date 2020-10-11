import os
from pathlib import Path


NLTK_PATH = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / 'nltk.txt'
with open(NLTK_PATH, 'r') as nltk_file:
    packages = nltk_file.read()
    if '\n' in packages:
        packages = packages[:packages.rfind('\n')].split('\n')


def import_nltk():
    import nltk
    if not packages:
        return
    for package in packages:
        for (path, file_names, folder_names) in os.walk('/root/nltk_data'):
            if package in file_names:
                lib = path.replace('/root/nltk_data/', '').split('/')[0]
                try:
                    nltk.data.find('{}/{}'.format(lib, package))
                except LookupError:
                    nltk.download(name)
                break

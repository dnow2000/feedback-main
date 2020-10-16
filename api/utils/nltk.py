import os
from pathlib import Path


NLTK_PATH = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / 'nltk.txt'
with open(NLTK_PATH, 'r') as nltk_file:
    package_ids = nltk_file.read()
    if '\n' in package_ids:
        package_ids = package_ids[:package_ids.rfind('\n')].split('\n')


def import_nltk():
    import nltk
    if not package_ids:
        return
    try:
        packages = list(nltk.downloader.Downloader().packages())
        for package_id in package_ids:
            for package in packages:
                if package.id == package_id:
                    try:
                        nltk.data.find('{}/{}'.format(package.subdir, package_id))
                    except LookupError:
                        nltk.download(package_id)
                    break
    except Exception:
        pass

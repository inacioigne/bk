from src.schemas.settings import Settings
from pysolr import Solr

settings = Settings()
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)
# solr = Solr('http://192.168.128.4:8983/solr/authority', always_commit=True, timeout=10)

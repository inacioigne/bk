from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate
from pysolr import Solr

settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk')
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)


def UpdateFusekiWork(authoritys, id, bibframe):

    uri = f"{settings.base_url}/works/{id}"
    for authority in authoritys:
        sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            INSERT DATA {{
             GRAPH <{authority.term.value}> {{
             <{authority.term.value}> bf:{bibframe} <{uri}> .
             }} }} """
        response = fuseki.run_sparql(sparql)


def UpdateSolrWork(authoritys, id_work, title, bibframe):

    uri = f"{settings.base_url}/works/{id_work}"
    docs = list()
    for authority in authoritys:
        id = authority.term.value.split("/")[-1]
        id = f'authority#{id}'
        doc = {
            "id": id,
            f"{bibframe}": {
                "add": {
                    "id": f'{id}/work/work#{id}',
                    "label": title,
                    "uri": uri
                }
            }
        }
        docs.append(doc)
    responseSolr =  solr.add(docs, commit=True)

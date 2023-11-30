from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate
from pysolr import Solr

settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk')
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)


def UpdateFusekiContribution(request):

    uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'
    for contribution in request.contribution:
        sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            INSERT DATA {{
             GRAPH <{contribution.agent}> {{
             <{contribution.agent}> bf:contributionOf <{uri}> .
             }} }} """
        response = fuseki.run_sparql(sparql)


def UpdateSolrContribution(request):
    uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'
    docs = list()
    for contribution in request.contribution:
        id = contribution.agent.split("/")[-1]
        doc = {
            "id": id,
            "contributionOf": {
                "add": {
                    "id": f'{id}/work/{request.identifiersLocal}',
                    "label": request.title.mainTitle,
                    "uri": uri
                }
            }
        }
        docs.append(doc)
    responseSolr =  solr.add(docs, commit=True)

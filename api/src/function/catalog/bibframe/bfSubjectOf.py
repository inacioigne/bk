from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate
from pysolr import Solr

settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk')
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)


def UpdateFusekiSubject(request):

    uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'
    for subject in request.subject:
        sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            INSERT DATA {{
             GRAPH <{subject.uri}> {{
             <{subject.uri}> bf:subjectOf <{uri}> .
             }} }} """
        response = fuseki.run_sparql(sparql)


def UpdateSolrSubject(request):
    uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'
    docs = list()
    for subject in request.subject:
        id = subject.uri.split("/")[-1]
        doc = {
            "id": id,
            "subjectOf": {
                "add": {
                    "id": f'{id}/work/{request.identifiersLocal}',
                    "label": request.title.mainTitle,
                    "uri": uri
                }
            }
        }
        docs.append(doc)
    responseSolr =  solr.add(docs, commit=True)
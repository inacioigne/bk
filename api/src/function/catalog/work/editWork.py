from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.catalog.work.graphWork import MakeGraphWork
from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate


settings = Settings()
fuseki = FusekiUpdate(settings.fuseki , 'bk') 

def EditWork(request):
    # Delete graph 
    word_id = request.adminMetadata.identifiedBy
    uri = f"{settings.base_url}/works/{word_id}"
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropWork = fuseki.run_sparql(sparqlDropItem)
    graph = MakeGraphWork(request)
    sparql = MakeCreateSparql(graph, word_id, "works")
    response = fuseki.run_sparql(sparql) 
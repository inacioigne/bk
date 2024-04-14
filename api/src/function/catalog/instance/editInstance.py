from src.function.catalog.instance.graphInstance import MakeGraphInstance
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.catalog.work.graphWork import MakeGraphWork
from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate


settings = Settings()
fuseki = FusekiUpdate(settings.fuseki , 'bk') 

def EditInstance(request):
    # Delete graph 
    instance_id = request.adminMetadata.identifiedBy
    uri = f"{settings.base_url}/instances/{instance_id}"
    print(uri)
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropWork = fuseki.run_sparql(sparqlDropItem)
    graph = MakeGraphInstance(request)
    sparql = MakeCreateSparql(graph, instance_id, "instances")
    response = fuseki.run_sparql(sparql) 
    
    return response
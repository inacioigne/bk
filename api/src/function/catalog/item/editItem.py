from src.function.catalog.item.graphItem import MakeGraphItem
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate
from datetime import datetime

settings = Settings()
fuseki = FusekiUpdate(settings.fuseki , 'bk') 

def EditItem(request):
    now = datetime.now()
    request.adminMetadata.changeDate = now
    # Delete graph 
    item_id = request.adminMetadata.identifiedBy
    uri = f"{settings.base_url}/items/{item_id}"
    print(uri)
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropWork = fuseki.run_sparql(sparqlDropItem)
    instance_id = request.itemOf.split("#")[2]
    graph = MakeGraphItem(request, instance_id)
    print(graph)
    sparql = MakeCreateSparql(graph, item_id, "items")
    response = fuseki.run_sparql(sparql) 
    
    return response
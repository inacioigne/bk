from src.function.catalog.item.graphItem import MakeGraphItem
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate
from datetime import datetime
from pysolr import Solr

settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk')
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)


def EditItem(request):
    now = datetime.now()
    request.adminMetadata.changeDate = now
    # Delete graph
    item_id = request.adminMetadata.identifiedBy
    uri = f"{settings.base_url}/items/{item_id}"
    # print(uri)
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropWork = fuseki.run_sparql(sparqlDropItem)
    instance_id = request.itemOf.split("#")[2]
    graph = MakeGraphItem(request, instance_id)
    # print(graph)
    sparql = MakeCreateSparql(graph, item_id, "items")
    response = fuseki.run_sparql(sparql)
    # Solr
    doc = {
        "id": request.adminMetadata.identifiedBy,
        "_root_": request.instanceOf,
        "collection": {"set": request.collection},
        "shelf":  {"set": request.shelf},
        "changeDate": {"set": now.strftime("%Y-%m-%dT%H:%M:%SZ")}
    }
    resSolr = solr.add([doc], commit=True)

    return {
        "resJena": response.convert(),
        "resSolr": resSolr
        }

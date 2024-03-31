from src.schemas.settings import Settings
from pysolr import Solr
from pyfuseki import FusekiUpdate

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)
fuseki = FusekiUpdate(settings.fuseki , 'bk') 

def DeleteItem(item, itemOf, instanceOf):
    item_id = item.split("#")[1]
    uri = f"{settings.base_url}/items/{item_id}"
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropItem = fuseki.run_sparql(sparqlDropItem)
    instance = f'https://bibliokeia.com/instances/{itemOf}'
    sparqlHasItem = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            DELETE DATA
            {{ GRAPH <{instance}> 
            {{ <{instance}>  bf:hasItem  <{uri}> }} }} ;"""
    resHasItem = fuseki.run_sparql(sparqlHasItem)
    d = {
      "id": f"instance#{itemOf}",
      "_root_": instanceOf,
      "hasItem": { "remove": { "id": item } }
    } 
    resSolr = solr.add([d], commit='True')
    return {
        'resDropItem': resDropItem.convert(),
        'resHasItem': resHasItem.convert(),
        'resSolr': resSolr
        }
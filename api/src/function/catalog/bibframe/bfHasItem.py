from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate

settings = Settings()

fuseki = FusekiUpdate(settings.fuseki, 'bk') 

def HasItem(item, instance):

    item_uri = f'https://bibliokeia.com/catalog/item/{item.barcode}'
    instance_uri = f'https://bibliokeia.com/catalog/instance/{instance}'
    sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{instance_uri}> {{ 
                    <{instance_uri}>  bf:hasItem <{item_uri}> }} }} ; """
    responseJena = fuseki.run_sparql(sparql)
    
    return responseJena.convert()
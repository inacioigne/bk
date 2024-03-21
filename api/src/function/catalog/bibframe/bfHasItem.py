from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate

settings = Settings()

fuseki = FusekiUpdate(settings.fuseki, 'bk') 

def HasItem(instance, item_id):

    item_uri = f'{settings.base_url}/items/{item_id}'
    instance_uri = f'{settings.base_url}/instances/{instance}'
    sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{instance_uri}> {{ 
                    <{instance_uri}>  bf:hasItem <{item_uri}> }} }} ; """
    responseJena = fuseki.run_sparql(sparql)
    
    return responseJena.convert()
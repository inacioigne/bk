from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate

settings = Settings()

fuseki = FusekiUpdate(settings.fuseki, 'bk') 

def HasInstance(request, instance_id):

    uri = f'https://bibliokeia.com/catalog/instance/{instance_id}'
    sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{request.instanceOf.uri}> {{ 
                    <{request.instanceOf.uri}>  bf:hasInstance <{uri}> }} }} ; """
    responseJena = fuseki.run_sparql(sparql)
    
    return responseJena.convert()
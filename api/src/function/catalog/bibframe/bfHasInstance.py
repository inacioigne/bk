from src.schemas.settings import Settings
from pyfuseki import FusekiUpdate

settings = Settings()

fuseki = FusekiUpdate(settings.fuseki, 'bk') 

def HasInstance(request):

    uri = f'https://bibliokeia.com/catalog/instances/{request.identifiersLocal}'
    sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                INSERT DATA
                {{ GRAPH <{request.instanceOf.uri}> {{ 
                    <{request.instanceOf.uri}>  bf:hasInstance <{uri}> }} }} ; """
    responseJena = fuseki.run_sparql(sparql)
    
    return responseJena.convert()
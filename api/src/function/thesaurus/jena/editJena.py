from datetime import datetime 
from pyfuseki import FusekiUpdate

# Bibliokeia Functions
from src.schemas.settings import Settings
from src.function.thesaurus.jena.makeGraph.makeGraphName import MakeGraphName

settings = Settings()
authorityUpdate = FusekiUpdate(settings.fuseki, 'bk') 

def EditJena(request):
    authority = f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    request.adminMetadata.changeDate = datetime.now()
    request.adminMetadata.status.label = 'Editado'
    request.adminMetadata.status.value = 'e'
    graph = MakeGraphName(request, request.identifiersLocal)
    deleteGraph = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    deleteJena = authorityUpdate.run_sparql(deleteGraph)
    postJena = authorityUpdate.run_sparql(graph)

    return {'deleteGraph': deleteJena.convert()['message'],
                 'postGraph': postJena.convert()['message']},
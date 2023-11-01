from pysolr import Solr
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings

settings = Settings()
authorityUpdate = FusekiUpdate(settings.fuseki, 'bk') 
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

def UpdateDeleteUri(request, metadata):
    # fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities') 
    # solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            DELETE DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    response = authorityUpdate.run_sparql(uri)

    # Update solr
    uriID= request.uri.split("/")[-1]
    auID = request.authority.split("/")[-1]
    responseSolr = solr.delete(q=f"id:{uriID}/{request.type}#{auID}",  commit=True)
    
    return {
        'updateJena': response.convert()['message'],
        'updateSolr': responseSolr
        }
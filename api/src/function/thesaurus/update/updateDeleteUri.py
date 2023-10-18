from pysolr import Solr
from pyfuseki import FusekiUpdate

def UpdateDeleteUri(request, metadata):
    fuseki_update = FusekiUpdate('http://localhost:3030', 'authorities')
    solr = Solr('http://localhost:8983/solr/authorities/', timeout=10)
    uri = f"""PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            DELETE DATA 
            {{ GRAPH  <{request.uri}>
            {{
            <{request.uri}> madsrdf:{metadata} <{request.authority}> 
            }} }}"""
    response = fuseki_update.run_sparql(uri)

    # Update solr
    uriID= request.uri.split("/")[-1]
    auID = request.authority.split("/")[-1]
    responseSolr = solr.delete(q=f"id:{uriID}/{request.type}#{auID}",  commit=True)
    
    return {
        'updateJena': response.convert()['message'],
        'updateSolr': responseSolr
        }
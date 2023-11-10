from pyfuseki import FusekiQuery
from src.schemas.settings import Settings

settings = Settings()

query = FusekiQuery(settings.fuseki, 'bk') 

def GraphExistLoc(identifiersLccn):
    
    q = """PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
            PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
            SELECT * 
            WHERE {{ GRAPH ?g {{ 
                ?s identifiers:lccn  "{}" .
                ?s mads:authoritativeLabel ?label}} }}"""

    res = query.run_sparql(q.format(identifiersLccn))
    bindings = res.convert()['results']['bindings']
    if len(bindings) > 0:
        uri = bindings[0]['g']['value']
        id = uri.split("/")[-1]
        label = bindings[0]['label']['value']
        return {'exist': True, 'id': id, "uri": uri, "label": label, 'base': "bk"}
    else:
        return {'exist': False}
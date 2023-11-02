from pyfuseki import FusekiQuery
from src.schemas.settings import Settings

settings = Settings()

query = FusekiQuery(settings.fuseki, 'bk') 

def GraphExistLoc(identifiersLccn):
    
#     ask = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
# ASK {{ graph ?g {{ ?s identifiers:lccn "{identifiersLccn}" }} }}"""

#     res = query.run_sparql(ask)
#     exist = res.convert()['boolean'] 
    q = """PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
            SELECT * 
            WHERE {{ GRAPH ?g {{ ?s identifiers:lccn  "{}" }} }}"""

    res = query.run_sparql(q.format(identifiersLccn))
    bindings = res.convert()['results']['bindings']
    if len(bindings) > 0:
        value = bindings[0]['g']['value']
        id = value.split("/")[-1]
        return {'exist': True, 'id': id}
    else:
        return {'exist': False}
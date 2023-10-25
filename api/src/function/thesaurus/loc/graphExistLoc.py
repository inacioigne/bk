from pyfuseki import FusekiQuery
from src.schemas.settings import Settings

settings = Settings()

query = FusekiQuery(settings.fuseki, 'bk') 

def GraphExistLoc(identifiersLccn):
    
    ask = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
ASK {{ graph ?g {{ ?s identifiers:lccn "{identifiersLccn}" }} }}"""

    res = query.run_sparql(ask)
    exist = res.convert()['boolean'] 
    
    return exist 
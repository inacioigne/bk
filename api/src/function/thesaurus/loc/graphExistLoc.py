from pyfuseki import FusekiQuery
from src.schemas.settings import Settings

settings = Settings()

authorityQuery = FusekiQuery(f'{settings.url}:3030', 'authority')

def GraphExistLoc(identifiersLccn):
    
    ask = f"""PREFIX identifiers: <http://id.loc.gov/vocabulary/identifiers/>
                ASK {{ graph ?g {{ ?s identifiers:lccn "{identifiersLccn}" }} }}"""

    res = authorityQuery.run_sparql(ask)
    exist = res.convert()['boolean']
    
    return exist
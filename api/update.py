import json
from src.function.thesaurus.solr.updateSolr import UpdateSolr
from src.schemas.thesaurus.mads import SchemaMads 
from pyfuseki import FusekiUpdate
from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()

update = FusekiUpdate(settings.fuseki, 'bk') 
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

with open("test.json") as file:
    authority = json.load(file)
    file.close()

request = SchemaMads(**authority) 
loc_uri = f'http://id.loc.gov/authorities/{request.isMemberOfMADSCollection}/{request.identifiersLccn}'
bk_uri =  f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
# bk_uri =  f'https://bibliokeia.com/authority/{request.type}/TESTE'


if request.hasBroaderAuthority:
        for i in request.hasBroaderAuthority:
            if i.base == 'bk':
                id = i.uri.split("/")[-1]
                res = solr.search(q=f"id:{id}", fl="*,[child]")
                [doc] = res.docs
                hasNarrowerAuthority = doc.get('hasNarrowerAuthority')
                if hasNarrowerAuthority:
                     pass
                else:
                     obj = {
                            'id': f'{id}/hasNarrowerAuthority#{request.identifiersLocal}',
                            'label': request.authoritativeLabel,
                            'uri': bk_uri,
                            'base': 'bk' }
                     hna = {
                                "id": id,
                                "hasNarrowerAuthorityLabels": {"set": [request.authoritativeLabel]}, 
                                "hasNarrowerAuthority": { "set": [obj] }
                            }
                     print(hna)
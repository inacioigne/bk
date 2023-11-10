import json
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
if request.hasNarrowerAuthority:
    for i in request.hasNarrowerAuthority:
        if i.base == "bk":
            id = i.uri.split("/")[-1]
            res = solr.search(q=f"id:{id}", fl="*,[child]")
            [doc] = res.docs
            hasBroaderAuthority = doc['hasBroaderAuthority']
            isDict = isinstance(hasBroaderAuthority, dict)
            if isDict:
                if hasBroaderAuthority['uri'] == loc_uri:
                    obj = {
                            'id': f'{id}/hasBroaderAuthority#{request.identifiersLocal}',
                            'label': request.authoritativeLabel,
                            'uri': bk_uri,
                            'base': 'bk'
                        }
                    doc = {
                            "id": id,
                            "hasReciprocalAuthority": { "set": [obj] }
                        }
                    print(hasBroaderAuthority)



def UpdateJena(request):
    # hasReciprocalAuthority
    loc_uri = f'http://id.loc.gov/authorities/{request.isMemberOfMADSCollection}/{request.identifiersLccn}'
    bk_uri =  f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    if request.hasReciprocalAuthority:
        for i in request.hasReciprocalAuthority:
            if i.base == "bk":
                sparql = f"""PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
                            WITH <{i.uri}>
                            DELETE {{ <{i.uri}> mads:hasReciprocalAuthority <{loc_uri}> }}
                            INSERT {{ <{i.uri}> mads:hasReciprocalAuthority <{bk_uri}> }}
                            WHERE {{ <{i.uri}> mads:hasReciprocalAuthority <{loc_uri}> }}"""
                res = update.run_sparql(sparql)
            
    # hasNarrowerAuthority
    if request.hasNarrowerAuthority:
        for i in request.hasNarrowerAuthority:
            if i.base == "bk":
                sparql = f"""PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
                                WITH <{i.uri}>
                                DELETE {{ <{i.uri}> mads:hasBroaderAuthority <{loc_uri}> }}
                                INSERT {{ <{i.uri}> mads:hasBroaderAuthority <{bk_uri}> }}
                                WHERE {{ <{i.uri}> mads:hasBroaderAuthority <{loc_uri}> }}"""
                res = update.run_sparql(sparql)
          

request.hasReciprocalAuthority
def UpdateSolr(request):

    loc_uri = f'http://id.loc.gov/authorities/{request.isMemberOfMADSCollection}/{request.identifiersLccn}'
    bk_uri =  f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    if request.hasReciprocalAuthority:
        for i in request.hasReciprocalAuthority:
            if i.base == 'bk':
                id = i.uri.split("/")[-1]
                res = solr.search(q=f"id:{id}", fl="*,[child]")
                [doc] = res.docs
                hasReciprocalAuthority = doc['hasReciprocalAuthority']
                isDict = isinstance(hasReciprocalAuthority, dict)
                if isDict:
                    if hasReciprocalAuthority['uri'] == loc_uri:
                        obj = {
                            'id': f'{id}/hasReciprocalAuthority#{request.identifiersLocal}',
                            'label': request.authoritativeLabel,
                            'uri': bk_uri,
                            'base': 'bk'
                        }
                
                        doc = {
                            "id": id,
                            "hasReciprocalAuthority": { "set": [obj] }
                        }
                        res = solr.add([doc], commit=True)

                    print(res)


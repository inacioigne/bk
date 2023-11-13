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
docs = list()

    # hasReciprocalAuthority
# if request.hasReciprocalAuthority:
#     for i in request.hasReciprocalAuthority:
#             if i.base == 'bk':
#                 id = i.uri.split("/")[-1]
#                 res = solr.search(q=f"id:{id}", fl="*,[child]")
#                 [doc] = res.docs
#                 hasReciprocalAuthority = doc['hasReciprocalAuthority']
#                 isDict = isinstance(hasReciprocalAuthority, dict)
#                 if isDict:
#                     if hasReciprocalAuthority['uri'] == loc_uri:
#                         obj = {
#                             'id': f'{id}/hasReciprocalAuthority#{request.identifiersLocal}',
#                             'label': request.authoritativeLabel,
#                             'uri': bk_uri,
#                             'base': 'bk'
#                         }          
#                         hra = {
#                             "id": id,
#                             "hasReciprocalAuthority": { "set": [obj] }
#                         }
#                         docs.append(hra)
#                         # res = solr.add([doc], commit=True)
#     # hasNarrowerAuthority
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
                    hba = {
                                "id": id,
                                "hasBroaderAuthority": { "set": [obj] }
                            }
                    docs.append(hba)
            else:
                hbaList = list()
                isHba = False
                for i in hasBroaderAuthority:
                    if i['uri'] == loc_uri:
                        isHba = True
                        obj = {
                                'id': f'{id}/hasBroaderAuthority#{request.identifiersLocal}',
                                'label': request.authoritativeLabel,
                                'uri': bk_uri,
                                'base': 'bk'
                            }
                        hbaList.append(obj)
                    else:
                        hbaList.append(i)
                    if isHba:
                        hba = {
                                "id": id,
                                "hasBroaderAuthority": { "set": hbaList }
                            }
                        print("HBA:", hba)
                        docs.append(hba)
if len(docs) > 0:
    # res = solr.add(docs, commit=True)
    pass
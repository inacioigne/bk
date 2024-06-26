from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

def UpdateSolr(request):
    docs = list()

    loc_uri = f'http://id.loc.gov/authorities/{request.isMemberOfMADSCollection}/{request.identifiersLccn}'
    bk_uri =  f'https://bibliokeia.com/authorities/{request.adminMetadata.identifiedBy}'
    # hasReciprocalAuthority
    if request.hasReciprocalAuthority:
        for i in request.hasReciprocalAuthority:
            if i.authority.base == 'bk':
                id = i.authority.value.split("/")[-1]
                res = solr.search(q=f"id:authority#{id}", fl="*,[child]")
                [doc] = res.docs
                hasReciprocalAuthority = doc.get('hasReciprocalAuthority')
                if hasReciprocalAuthority:
                    isDict = isinstance(hasReciprocalAuthority, dict)
                    if isDict:
                        if hasReciprocalAuthority['uri'] == loc_uri:
                            obj = {
                                'id': f'{id}/hasReciprocalAuthority#{request.identifiersLocal}',
                                'label': request.authoritativeLabel,
                                'uri': bk_uri,
                                'base': 'bk'
                            }          
                            hra = {
                                "id": id,
                                "hasReciprocalAuthority": { "set": [obj] },
                                "hasReciprocalAuthorityLabels": {"set": [request.authoritativeLabel]}
                            }
                            docs.append(hra)
                    else:
                        hraList = list()
                        labels = list()
                        isHra = False
                        for i in hasReciprocalAuthority:
                            if i['uri'] == loc_uri:
                                isHra = True
                                obj = {
                                    'id': f'{id}/hasReciprocalAuthority#{request.identifiersLocal}',
                                    'label': request.authoritativeLabel,
                                    'uri': bk_uri,
                                    'base': 'bk'
                                }
                                labels.append(request.authoritativeLabel)
                                hraList.append(obj)
                            else:
                                hraList.append(i)
                                labels.append(i['label'][0])
                        if isHra:
                                hba = {
                                    "id": id,
                                    "hasReciprocalAuthorityLabels": {"set": labels}, 
                                    "hasReciprocalAuthority": { "set": hraList }
                                }
                                docs.append(hba)
                else:
                    obj = {
                            'id': f'{id}/hasReciprocalAuthority#{request.identifiersLocal}',
                            'label': request.authoritativeLabel,
                            'uri': bk_uri,
                            'base': 'bk' }
                    hra = {
                            "id": id,
                            "hasReciprocalAuthorityLabels": {"set": [request.authoritativeLabel]}, 
                            "hasReciprocalAuthority": { "set": [obj] } }
                    docs.append(hra)
                    
    # hasNarrowerAuthority
    if request.hasNarrowerAuthority:
        for i in request.hasNarrowerAuthority:
            if i.authority.base == "bk":
                id = i.authority.value.split("/")[-1]
                res = solr.search(q=f"id:authority#{id}", fl="*,[child]")
                [doc] = res.docs
                hasBroaderAuthority = doc.get('hasBroaderAuthority')
                if hasBroaderAuthority:
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
                        labels = list()
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
                                labels.append(request.authoritativeLabel)
                                hbaList.append(obj)
                            else:
                                hbaList.append(i)
                                labels.append(i['label'][0])
                        if isHba:
                                hba = {
                                    "id": id,
                                    "hasBroaderAuthorityLabels": {"set": labels}, 
                                    "hasBroaderAuthority": { "set": hbaList }
                                }
                                docs.append(hba)
                else:
                    obj = {
                            'id': f'{id}/hasBroaderAuthority#{request.identifiersLocal}',
                            'label': request.authoritativeLabel,
                            'uri': bk_uri,
                            'base': 'bk' }
                    hba = {
                            "id": id,
                            "hasBroaderAuthorityLabels": {"set": [request.authoritativeLabel]}, 
                            "hasBroaderAuthority": { "set": [obj] } }
                    docs.append(hba)

    # hasBroaderAuthority
    if request.hasBroaderAuthority:
        for i in request.hasBroaderAuthority:
            if i.authority.base == 'bk':
                id = i.authority.uri.split("/")[-1]
                # print('ID:', id)
                res = solr.search(q=f"id:authority#{id}", fl="*,[child]")
                [doc] = res.docs
                hasNarrowerAuthority = doc.get('hasNarrowerAuthority')
                if hasNarrowerAuthority:
                    isDict = isinstance(hasNarrowerAuthority, dict)
                    if isDict:
                        if hasNarrowerAuthority['uri'] == loc_uri:
                            obj = {
                                'id': f'{id}/hasNarrowerAuthority#{request.identifiersLocal}',
                                'label': request.authoritativeLabel,
                                'uri': bk_uri,
                                'base': 'bk'
                            }
                            hba = {
                                "id": id,
                                "hasNarrowerAuthority": { "set": [obj] },
                                "hasNarrowerAuthorityLabels": {"set": [request.authoritativeLabel]}
                            }
                    else:
                        hnaList = list()
                        labels = list()
                        isHna = False
                        for i in hasNarrowerAuthority:
                            if i['uri'] == loc_uri:
                                isHna = True
                                obj = {
                                    'id': f'{id}/hasNarrowerAuthority#{request.identifiersLocal}',
                                    'label': request.authoritativeLabel,
                                    'uri': bk_uri,
                                    'base': 'bk'
                                }
                                labels.append(request.authoritativeLabel)
                                hnaList.append(obj)
                            else:
                                hnaList.append(i)
                                labels.append(i['label'][0])
                        if isHna:
                            hna = {
                                "id": id,
                                "hasNarrowerAuthorityLabels": {"set": labels}, 
                                "hasNarrowerAuthority": { "set": hnaList }
                            }
                            docs.append(hna)
                else:
                    obj = {
                            'id': f'{id}/hasNarrowerAuthority#{request.identifiersLocal}',
                            'label': request.authoritativeLabel,
                            'uri': bk_uri,
                            'base': 'bk' }
                    hna = {
                            "id": id,
                            "hasNarrowerAuthorityLabels": {"set": [request.authoritativeLabel]}, 
                            "hasNarrowerAuthority": { "set": [obj] } }
                    docs.append(hna)



    if len(docs) > 0:
        res = solr.add(docs, commit=True)


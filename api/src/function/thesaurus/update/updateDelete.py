from src.schemas.thesaurus.deleteAuthority import UriDelete
from src.function.thesaurus.update.updateDeleteUri import UpdateDeleteUri

def UpdateDelete(doc, response, uri):
    if doc.get('hasBroaderAuthority'):
        if type(doc.get('hasBroaderAuthority')) == list:
            for i in doc.get('hasBroaderAuthority'):
                request = {'authority': uri, 
                        'uri': i['uri'], 
                        'type': 'hasNarrowerAuthority' }
                request = UriDelete(**request)
                resposneUpdate = UpdateDeleteUri(request, "hasNarrowerAuthority")
                response.update(resposneUpdate)
        else:
            # [delUri] = doc.get('hasBroaderAuthority')['uri']
            delUri = doc.get('hasBroaderAuthority')['uri']
            request = {'authority': uri, 
                        'uri': delUri, 
                        'type': 'hasNarrowerAuthority' }
            request = UriDelete(**request)
            resposneUpdate = UpdateDeleteUri(request, "hasNarrowerAuthority")
            response.update(resposneUpdate)

    if doc.get('hasNarrowerAuthority'):
        if type(doc.get('hasNarrowerAuthority')) == list:
            for i in doc.get('hasNarrowerAuthority'):
                request = {'authority': uri, 
                        'uri': i['uri'], 
                        'type': 'hasBroaderAuthority' }
                request = UriDelete(**request)
                resposneUpdate = UpdateDeleteUri(request, "hasBroaderAuthority")
                response.update(resposneUpdate)
        else:
            # [delUri] = doc.get('hasNarrowerAuthority')['uri']
            delUri = doc.get('hasNarrowerAuthority')['uri']
            request = {'authority': uri, 
                        'uri':delUri, 
                        'type': 'hasBroaderAuthority' }
            request = UriDelete(**request)
            resposneUpdate = UpdateDeleteUri(request, "hasBroaderAuthority")
            response.update(resposneUpdate)

    if doc.get('hasReciprocalAuthority'):
        if type(doc.get('hasReciprocalAuthority')) == list:
            for i in doc.get('hasReciprocalAuthority'):
                request = {'authority': uri, 
                        'uri': i['uri'], 
                        'type': 'hasReciprocalAuthority' }
                request = UriDelete(**request)
                resposneUpdate = UpdateDeleteUri(request, "hasReciprocalAuthority")
                response.update(resposneUpdate)
        else:
            # [delUri] = doc.get('hasReciprocalAuthority')['uri']
            delUri = doc.get('hasReciprocalAuthority')['uri']
            request = {'authority': uri, 
                        'uri': delUri, 
                        'type': 'hasReciprocalAuthority' }
            request = UriDelete(**request)
            resposneUpdate = UpdateDeleteUri(request, "hasReciprocalAuthority")
            response.update(resposneUpdate)

    return response
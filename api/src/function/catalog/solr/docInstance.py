from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)


def DocInstance(request):

    work_id = f'work#{request.instanceOf.uri.split("/")[-1]}'
    instance_id = f'instance#{request.identifiersLocal}'

    doc = {
        "id": instance_id,
        "type": request.type,
        "mainTitle": request.title.mainTitle,
        "subtitle": request.title.subtitle if request.title.subtitle != "" else None,
        "carrier": request.carrier.label,
        "dimensions": request.dimensions,
        "extent": request.extent.label if request.extent else None,
        "issuance": request.issuance.label,
        "media": request.media.label,
        "publicationAgent": request.publication.agent,
        "publicationDate": request.publication.date,
        "publicationPlace": request.publication.place,      
        "serie": request.seriesStatement,
        "instanceOf": {'id': f'{instance_id}/instanceOf/{work_id}', 'uri': request.instanceOf.uri, 'label': request.instanceOf.label} 
        }
 

    
    work = {
        "id": work_id,
        "hasInstance": {"add": doc }
    }
    # print("hasInstance", work)

    response = solr.add([work], commit=True)
    return response

def DeleteInstanceSolr(id):

    r = solr.search(q=f"id:{id}", fl="*,[child]")
    [doc] = r.docs
    instanceOf = doc['instanceOf']['id']
    work = instanceOf.split("/")[-1]
    hasInstance = f"{work}/hasInstance/{id}" 
    doc = {
    "id": work,
    "hasInstance": { "remove": { "id": hasInstance} } }
    
    solr.delete(id=id, commit=True)
    solr.add([doc], commit=True)
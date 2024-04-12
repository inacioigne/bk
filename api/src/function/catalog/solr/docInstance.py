from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)


def DocInstance(request):

    work_id = f'work#{request.instanceOf.value.split("/")[-1]}'
    instance_id = f'instance#{request.adminMetadata.identifiedBy}'
    provisionActivity = request.provisionActivity[0]
    instanceOf = {
    'id': f'{instance_id}/instanceOf/{work_id}', 
    'uri': request.instanceOf.value, 
    'label': request.instanceOf.label
    } 
    # print("DATE:", request.adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%S"))

    doc = {
        "id": instance_id,
        "creationDate": request.adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%SZ"), 
        # request.adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%S"),
        "type": [i.value for i in request.resourceType],
        "mainTitle": request.title.mainTitle,
        "subtitle": request.title.subtitle if request.title.subtitle != "" else None,
        "carrier": request.physicalDetails.carrier.label,
        "extent": request.physicalDetails.extent,
        "issuance": request.physicalDetails.issuance.label,
        "media": request.physicalDetails.media.label,
        "publicationAgent": provisionActivity.agent,
        "publicationDate": provisionActivity.date,
        "publicationPlace": provisionActivity.place,      
        # "serie": request.seriesStatement,
        "image": request.image.cover,
        "instanceOf": instanceOf
        }

    work = {
        "id": work_id,
        "hasInstance": {"add": doc }
    }
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
from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)


def DocInstance(request):

    workID = request.instanceOf.uri.split("/")[-1]
    # uri = f'https://bibliokeia.com/catalog/works/{request.identifiersLocal}'

    doc = {
        "id": request.identifiersLocal,
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
        "instanceOf": {'id': f'{request.identifiersLocal}/instanceOf/{workID}', 'uri': request.instanceOf.uri, 'label': request.instanceOf.label} 
        }
    
    work = {
        "id": workID,
        "hasInstance": {"add": doc }
    }
    # print("hasInstance", work)

    response = solr.add([doc, work], commit=True)
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
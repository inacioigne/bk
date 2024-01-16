from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)

def DocItem(item, instance):

    # workID = request.instanceOf.uri.split("/")[-1]

    doc = {
        "id": item.barcode,
        "type": "item",
        "cdd": item.cdd,
        "cutter": item.cutter,
        "year": item.year,
        "collection": item.collection,
        "shelf": item.shelf,
        "barcode": item.barcode,
        "itemOf": {'id': f'{item.barcode}/itemOf/{instance}' #, 'uri': request.instanceOf.uri, 'label': request.instanceOf.label
                   } 
        }
    
    i = {
        "id": instance,
        "hasItem": {"add": doc }
    }

    response = solr.add([doc, i], commit=True)
    return response
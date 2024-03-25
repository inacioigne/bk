from pysolr import Solr
from src.schemas.settings import Settings
from src.db.init_db import session
from src.db.models import DbItem

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)

def DocItem(item, instance, work):

    item_id = f'item#{item.adminMetadata.identifiedBy}'


    doc = {
        "id": item_id,
        "type": "item",
        "cdd": item.cdd,
        "cutter": item.cutter,
        "year": item.year,
        "collection": item.collection,
        "shelf": item.shelf,
        "barcode": item.barcode,
        "itemOf": {'id': f'{item_id}/itemOf/{instance}' 
                   } 
        }
    
    item_doc = {
        "id": instance,
        "_root_": work,
        "hasItem": {"add": doc }
    }

    response = solr.add([item_doc], commit=True)
    return response
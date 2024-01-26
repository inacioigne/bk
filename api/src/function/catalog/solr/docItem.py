from pysolr import Solr
from src.schemas.settings import Settings
from src.db.init_db import session
from src.db.models import DbItem

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)

def DocItem(item, instance, work, item_id):

    instance_id = f'instance#{instance}'
    word_id = f'work#{work}'
    # db_item = session.query(DbItem).order_by(DbItem.id.desc()).first() 
    # if db_item:
    #     item_id = db_item.id + 1
    # else:
    #     item_id = 1
    # item_id = f'item#{item_id}'


    doc = {
        "id": item_id,
        "type": "item",
        "cdd": item.cdd,
        "cutter": item.cutter,
        "year": item.year,
        "collection": item.collection,
        "shelf": item.shelf,
        "barcode": item.barcode,
        "itemOf": {'id': f'{item_id}/itemOf/{instance_id}' #, 'uri': request.instanceOf.uri, 'label': request.instanceOf.label
                   } 
        }
    
    item_doc = {
        "id": instance_id,
        "_root_": word_id,
        "hasItem": {"add": doc }
    }
    # print('ITEM:', item_doc)

    response = solr.add([item_doc], commit=True)
    return response
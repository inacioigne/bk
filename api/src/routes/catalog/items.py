from fastapi import APIRouter
from src.function.catalog.item.editItem import EditItem
from src.function.catalog.item.deleteItem import DeleteItem
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.catalog.bibframe.bfHasItem import HasItem
from src.function.catalog.solr.docItem import DocItem
from src.function.catalog.item.graphItem import MakeGraphItem
from src.schemas.catalog.items import Item, ItemEdit, Items_Delete, Items_Schema
from src.db.models import DbItem
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings
from datetime import datetime

settings = Settings()

router = APIRouter()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_items(request: Items_Schema):
    for item in request.items:
        now = datetime.now()
        item.adminMetadata.creationDate = now  
        instance_id = request.itemOf.split("#")[1]
        
        i = DbItem(barcode=item.barcode, instance_id=instance_id)
        session.add(i) 
        session.commit()
        item.adminMetadata.identifiedBy = i.id

        graph = MakeGraphItem(item, instance_id)
        sparql = MakeCreateSparql(graph, i.id, "items")
        response = fuseki.run_sparql(sparql) 
        # print("HasItem", instance_id)
        hasItem = HasItem(instance_id, i.id)
        responseSolr = DocItem(item, request.itemOf, request.instanceOf)

    return {
        "id": i.id,
        "createItem": response.convert(),
        "hasItem": hasItem,
        "solr": responseSolr
        } 

@router.delete("/delete", status_code=201)
async def delete_items(request: Items_Delete):
    for item in request.items:
        response = DeleteItem(item, request.itemOf, request.instanceOf)        

    return response

@router.put("/edit", status_code=201)
async def edit_items(request: ItemEdit):

    response = EditItem(request)
        

    return response
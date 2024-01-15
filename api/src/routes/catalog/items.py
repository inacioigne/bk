from fastapi import APIRouter
from src.function.catalog.item.graphItem import MakeGraphItem
from src.schemas.catalog.items import Items_Schema
from src.db.models import DbItem
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings

settings = Settings()

router = APIRouter()
fuseki = FusekiUpdate(settings.fuseki, 'bk') 

@router.post("/create", status_code=201)
async def create_items(request: Items_Schema):
    for item in request.items:
        uri = f'https://bibliokeia.com/catalog/items/{item.barcode}'
        
        i = DbItem(barcode=item.barcode, instance_id=request.itemOf)
        session.add(i) 
        session.commit()

        graph = MakeGraphItem(item, request.itemOf)
        response = fuseki.run_sparql(graph) 
        print("ITEM:", response)

    return request.model_dump()

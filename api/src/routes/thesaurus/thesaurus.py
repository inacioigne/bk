# Dependences
from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from datetime import datetime 

# Bibliokeia Functions
from src.schemas.settings import Settings
from src.db.init_db import session
from src.db.models import Authority
from src.function.thesaurus.loc.graphExistLoc import GraphExistLoc
from src.schemas.thesaurus.deleteAuthority import SchemaDeleteAuthority
from src.function.thesaurus.makeGraph.makeGraphName import MakeGraphName
from src.function.thesaurus.solr.makeDoc import MakeDoc
from src.function.thesaurus.nextId import NextId
from src.function.thesaurus.solr.deleteAuthority import DeleteAuthoritySolr
from src.function.thesaurus.update.updateDelete import UpdateDelete
from src.schemas.thesaurus.mads import SchemaMads 


settings = Settings()
authorityUpdate = FusekiUpdate(f'{settings.url}:3030', 'authority')
solr = Solr(f'{settings.url}:8983/solr/authority/', timeout=10)

router = APIRouter() 

# Post Authority
@router.post("/create", status_code=201) 
async def post_authority(request: SchemaMads):
    item_id = NextId()
    request.identifiersLocal = str(item_id)

    uri = f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    if request.identifiersLccn:
        # print("LCCN: ", request.identifiersLccn)
        loc = GraphExistLoc(request.identifiersLccn)
        if loc:
            raise HTTPException(status_code=409, detail="Esse registro já existe")


    # MariaDB
    a = Authority(id=request.identifiersLocal, type=request.type, uri=uri)
    session.add(a) 
    session.commit()
    
    # Jena
    graph = MakeGraphName(request, request.identifiersLocal)
    
    response = authorityUpdate.run_sparql(graph)

    # Solr
    doc = MakeDoc(request, request.identifiersLocal)
    
    responseSolr = solr.add([doc], commit=True)

    return {
        "id": request.identifiersLocal,
         "jena": response.convert()['message'],
        "solr": responseSolr
        } 

# Delete Autority
@router.delete("/delete", status_code=200) 
async def delete_authority(request: SchemaDeleteAuthority ):
    # Jena
    authority = f'https://bibliokeia.com/authority/{request.type.value}/{request.id}'
    d = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    responseJena = authorityUpdate.run_sparql(d)
    
    # Solr
    r = solr.search(q=f'id:{request.id}', **{'fl': '*,[child]'})
    [doc] = r.docs
    responseSolr = DeleteAuthoritySolr(doc) 
    response = {'jena': responseJena.convert()['message'], 'solr': responseSolr}
    response = UpdateDelete(doc, response, authority)

    return response

# Edit Autority
@router.put("/edit", status_code=200) 
async def edit_authority(request: SchemaMads):
    authority = f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    request.adminMetadata.changeDate = datetime.now()
    request.adminMetadata.status.label = 'Editado'
    request.adminMetadata.status.value = 'e'
    graph = MakeGraphName(request, request.identifiersLocal)
    deleteGraph = f"""DELETE {{ graph <{authority}> {{ ?s ?p ?o }} }}
            WHERE {{
            graph <{authority}> {{ ?s ?p ?o. }}
            }}"""
    deleteJena = authorityUpdate.run_sparql(deleteGraph)
    postJena = authorityUpdate.run_sparql(graph)

    # # Solr
    doc = MakeDoc(request, request.identifiersLocal)
    responseSolr = solr.add([doc], commit=True)

    return {
        'jena': {'deleteGraph': deleteJena.convert()['message'],
                 'postGraph': postJena.convert()['message']},
        'solr': responseSolr 
            }

@router.get("/next_id")
async def next_id():

    register = NextId() 

    return register
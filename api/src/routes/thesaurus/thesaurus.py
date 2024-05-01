# Dependences
from fastapi import APIRouter, HTTPException
from pyfuseki import FusekiUpdate
from pysolr import Solr
from datetime import datetime
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.function.thesaurus.jena.makeGraphAuthority import MakeGraphAuthority
from src.function.thesaurus.jena.editJena import EditJena 

# Bibliokeia Functions
from src.schemas.settings import Settings
from src.db.init_db import session
from src.db.models import DbAuthority
from src.function.thesaurus.loc.graphExistLoc import GraphExistLoc
from src.schemas.thesaurus.deleteAuthority import SchemaDeleteAuthority
from src.function.thesaurus.jena.makeGraph.makeGraphName import MakeGraphName
from src.function.thesaurus.solr.makeDoc import MakeDoc
from src.function.thesaurus.nextId import NextId
from src.function.thesaurus.solr.deleteAuthority import DeleteAuthoritySolr
from src.function.thesaurus.update.updateDelete import UpdateDelete
from src.schemas.thesaurus.mads import SchemaMads 
from src.function.thesaurus.jena.updateJena import UpdateJena
from src.function.thesaurus.solr.updateSolr import UpdateSolr
from src.function.thesaurus.jena.editJena import EditJena 


settings = Settings()
authorityUpdate = FusekiUpdate(settings.fuseki, 'bk') 
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

router = APIRouter() 

# Post Authority
@router.post("/create", status_code=201) 
async def post_authority(request: SchemaMads):

    # if request.identifiersLccn:
    #     loc = GraphExistLoc(request.identifiersLccn)
    #     if loc["exist"]:
    #         raise HTTPException(status_code=409, detail="Esse registro já existe")

    # MariaDB
    authorityType = request.resource[1] 
    a = DbAuthority(type=authorityType.type.label) 
    session.add(a) 
    session.commit()

    now = datetime.now()
    request.adminMetadata.creationDate = now
    request.adminMetadata.identifiedBy = a.id
    request.identifiersLocal = a.id
    
    # # Jena
    graph = MakeGraphAuthority(request) 
    sparql = MakeCreateSparql(graph, a.id, "authorities")
    response = authorityUpdate.run_sparql(sparql)   
    # UpdateJena(request) 

    # # Solr
    doc = MakeDoc(request)
    # responseSolr = solr.add([doc], commit=True)
    # UpdateSolr(request)

    return {
        "id": request.identifiersLocal,
         "jena": response.convert()['message'],
        # "solr": responseSolr
        } 
    # return request.model_dump()

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
    response = EditJena(request)
    UpdateJena(request) 

    # # Solr
    doc = MakeDoc(request, request.identifiersLocal)
    responseSolr = solr.add([doc], commit=True)
    UpdateSolr(request)

    return {
        'jena': response,
        'solr': responseSolr 
            }

@router.get("/next_id")
async def next_id():

    register = NextId() 

    return register
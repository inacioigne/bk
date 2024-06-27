from fastapi import APIRouter, HTTPException
from src.function.catalog.work.editWork import EditWork
from src.function.catalog.work.deleteWork import DeleteWork
from src.function.catalog.markeCreateSparql import MakeCreateSparql
from src.schemas.catalog.work import BfWork, BfWorkEdit
from src.db.models import DbWork
from src.db.init_db import session
from pyfuseki import FusekiUpdate
from sqlalchemy import exc
from src.function.catalog.work.graphWork import MakeGraphWork
from src.schemas.settings import Settings
from src.function.catalog.solr.work import DocWork
from src.function.catalog.bibframe.bfContributionOf import UpdateFusekiWork, UpdateSolrWork
from pysolr import Solr
from datetime import datetime

router = APIRouter()
settings = Settings()
fuseki = FusekiUpdate(settings.fuseki, 'bk')
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

@router.post("/create", status_code=201)
async def create_work(request: BfWork):
    # MariaDB
    # try:
    #     w = DbWork(title=request.title.mainTitle)
    #     session.add(w)
    #     session.commit()
    # except exc.IntegrityError as e:
    #     session.rollback()
    #     raise HTTPException(status_code=409, detail="Esse registro já existe")
    # finally:
    #     session.close()
    # [title] = request.title
    w = DbWork(title=request.title.mainTitle)
    session.add(w)
    session.commit()

    now = datetime.now()
    request.adminMetadata.creationDate = now
    request.adminMetadata.identifiedBy = w.id

    # Jena
    graph = MakeGraphWork(request)
    sparql = MakeCreateSparql(graph, w.id, "works")
    response = fuseki.run_sparql(sparql)

    # Solr
    responseSolr = DocWork(request)

    if request.contribution:
        UpdateFusekiWork(request.contribution,
                         request.adminMetadata.identifiedBy, 'contributionOf')
        UpdateSolrWork(request.contribution, request.adminMetadata.identifiedBy,
                       request.title.mainTitle, 'contributionOf')

    if request.subject:
        UpdateFusekiWork(
            request.subject, request.adminMetadata.identifiedBy, 'subjectOf')
        UpdateSolrWork(request.subject, request.adminMetadata.identifiedBy,
                       request.title.mainTitle, 'subjectOf')

    return {
        "id": w.id,
        "jena": response.convert()['message'],
        "solr": responseSolr
    }


@router.delete("/delete/{work_id}", status_code=201)
async def delete_work(work_id: str):
    response = DeleteWork(work_id)
    return response


@router.put("/edit/{work_id}", status_code=201)
async def edit_work(request: BfWorkEdit, work_id: str):
    request.adminMetadata.identifiedBy = work_id
    now = datetime.now()
    request.adminMetadata.changeDate = now
    EditWork(request)
    # Solr
    responseSolr = DocWork(request)
    if request.contribution:
        UpdateFusekiWork(request.contribution,
                         request.adminMetadata.identifiedBy, 'contributionOf')
        UpdateSolrWork(request.contribution, request.adminMetadata.identifiedBy,
                       request.title.mainTitle, 'contributionOf')

    if request.subject:
        UpdateFusekiWork(
            request.subject, request.adminMetadata.identifiedBy, 'subjectOf')
        UpdateSolrWork(request.subject, request.adminMetadata.identifiedBy,
                       request.title.mainTitle, 'subjectOf')

    # Update Delete authority
    if request.authorityExclude:
        uri_work = f"{settings.base_url}/works/{work_id}"
        docs = list()
        for i in request.authorityExclude:
            sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                    DELETE DATA
                    {{ GRAPH <{i.value}>
                    {{ <{i.value}>  bf:{i.metadata}  <{uri_work}> }} }} ;"""
            fuseki.run_sparql(sparql)
            id = i.value.split("/")[-1]
            doc = {
                "id": f"authority#{id}",
                f"{i.metadata}": {"remove": {"id": f"authority#{id}/work/work#{work_id}"}}
            }
            docs.append(doc)
        resSolr = solr.add(docs, commit=True)

    return {
        "id": work_id,
        #  "jena": response.convert()['message'],
        "solr": responseSolr
    }

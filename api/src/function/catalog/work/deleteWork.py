from src.schemas.settings import Settings
from pysolr import Solr
from pyfuseki import FusekiUpdate
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import DbAuthority, DbWork

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)
fuseki = FusekiUpdate(settings.fuseki , 'bk') 

engine = create_engine(
     f"mariadb+mariadbconnector://{settings.db_user}:{settings.db_pass}@{settings.mariadb}:3306/bk")
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

def is_dict(value):
    return type(value) == dict

def DeleteWork(work_id):
    
    # Delete graph 
    uri = f"{settings.base_url}/works/{work_id}"
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropWork = fuseki.run_sparql(sparqlDropItem)
    
    # Update Solr
    results = solr.search(q=f"id:work#{work_id}", fl="*,[child]")
    [doc] = results.docs
    doc_child = list(filter(is_dict, doc.values()))
    ids = [doc['id'] for doc in doc_child]
    ids.insert(0, f'work#{work_id}')
    resSolr = solr.delete(id=ids)

    # Update authority
    for child in doc_child:
        metadata = child['id'].split("/")[1]
        sparql = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
                DELETE DATA
                {{ GRAPH <{child['uri']}> 
                {{ <{child['uri']}>  bf:{metadata}Of  <{uri}> }} }} ;"""
        fuseki.run_sparql(sparql)

    # Delete DB
    dbWork = session.query(DbWork).filter_by(id=work_id).first()
    session.delete(dbWork)
    session.commit()
    session.close()
    
    return {
        'resDropWork': resDropWork.convert(),
        'resSolr': resSolr
        }
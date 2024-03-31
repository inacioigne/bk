from src.schemas.settings import Settings
from pysolr import Solr
from pyfuseki import FusekiUpdate
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import DbInstance

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)
fuseki = FusekiUpdate(settings.fuseki , 'bk') 

engine = create_engine(
     f"mariadb+mariadbconnector://{settings.db_user}:{settings.db_pass}@{settings.mariadb}:3306/bk")
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

def DeleteInstance(request):
    
    # Delete graph instance
    instance_id = request.instance.split("#")[1]
    uri = f"{settings.base_url}/instances/{instance_id}"
    sparqlDropItem = f"DROP GRAPH <{uri}>"
    resDropItem = fuseki.run_sparql(sparqlDropItem)
    # Update Work
    work_id = request.instanceOf.split("/")[-1].split("#")[1]
    work = f'{settings.base_url}/works/{work_id}'
    sparqlHasItem = f"""PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            DELETE DATA
            {{ GRAPH <{work}> 
            {{ <{work}>  bf:hasInstance  <{uri}> }} }} ;"""
    resHasItem = fuseki.run_sparql(sparqlHasItem)
    # Update Solr
    d = {
      "id": f"work#{work_id}",
    #   "_root_": instanceOf,
      "hasInstance": { "remove": { "id": f"instance#{instance_id}" } }
    } 
    resSolr = solr.add([d], commit='True')
    # Delete DB
    dbInstance = session.query(DbInstance).filter_by(id=instance_id).first()
    session.delete(dbInstance)
    session.commit()
    session.close()
    
    return {
        'resDropItem': resDropItem.convert(),
        'resHasItem': resHasItem.convert(),
        'resSolr': resSolr
        }
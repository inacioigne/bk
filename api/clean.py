from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import DbAuthority, DbWork, DbInstance
from pyfuseki import FusekiUpdate, FusekiQuery
from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()

engine = create_engine(
     f"mariadb+mariadbconnector://{settings.db_user}:{settings.db_pass}@{settings.mariadb}:3306/bk")

session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

session.query(DbAuthority).delete()
session.query(DbWork).delete()
session.query(DbInstance).delete()
session.commit()

fuseki = FusekiUpdate(settings.fuseki, 'bk')  


d = """DELETE { graph ?g { ?s ?p ?o } } 
        WHERE {
        graph ?g {?s ?p ?o.}
        }"""

response = fuseki.run_sparql(d)
response.convert()

solrAuthority = Solr(f'{settings.solr}/solr/authority/', timeout=10)
solrAuthority.delete(q="*:*",  commit=True)

solrCatalog = Solr(f'{settings.solr}/solr/catalog/', timeout=10)
solrCatalog.delete(q="*:*",  commit=True)
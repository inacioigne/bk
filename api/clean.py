from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import Authority
from pyfuseki import FusekiUpdate, FusekiQuery
from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()

engine = create_engine(
     f"mariadb+mariadbconnector://admin:bkpass@{settings.mariadb}:3306/bk")

session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

session.query(Authority).delete()
session.commit()

fuseki = FusekiUpdate(settings.fuseki, 'bk') 
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

d = """DELETE { graph ?g { ?s ?p ?o } } 
        WHERE {
        graph ?g {?s ?p ?o.}
        }"""

response = fuseki.run_sparql(d)
response.convert()

solr.delete(q="*:*",  commit=True)
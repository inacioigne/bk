from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import Authority
from pyfuseki import FusekiUpdate, FusekiQuery
from pysolr import Solr

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

session.query(Authority).delete()
session.commit()

fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)

d = """DELETE { graph ?g { ?s ?p ?o } } 
        WHERE {
        graph ?g {?s ?p ?o.}
        }"""

response = fuseki.run_sparql(d)
response.convert()

solr.delete(q="*:*",  commit=True)
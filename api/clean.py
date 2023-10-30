from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import Authority
from pyfuseki import FusekiUpdate, FusekiQuery
from pysolr import Solr
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
from src.schemas.settings import Settings

settings = Settings()

engine = create_engine(
     f"mariadb+mariadbconnector://admin:bkpass@{settings.mariadb}:3306/bk")

=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======

engine = create_engine(
    "mariadb+mariadbconnector://root:8486@localhost:3306/bk")
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

session.query(Authority).delete()
session.commit()

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
fuseki = FusekiUpdate(settings.fuseki, 'bk') 
solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
fuseki = FusekiUpdate("http://localhost:3030", 'bk') 
solr = Solr(f'http://localhost:8983/solr/authority/', timeout=10)
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1

d = """DELETE { graph ?g { ?s ?p ?o } } 
        WHERE {
        graph ?g {?s ?p ?o.}
        }"""

response = fuseki.run_sparql(d)
response.convert()

solr.delete(q="*:*",  commit=True)
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    url: str = "http://localhost"
<<<<<<< HEAD
<<<<<<< HEAD
    # fuseki: str = "http://localhost:3030" 
    # mariadb: str = "localhost"
    # solr: str = "http://localhost:8983"
    # mariadb: str = "192.168.128.2"
    # solr: str = "http://192.168.128.4:8983"
    # fuseki: str = "http://192.168.128.3:3030" 
    mariadb: str = "mariadb"
    solr: str = "http://solr:8983"
    fuseki: str = "http://fuseki:3030" 
=======
=======
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
    fuseki: str = "http://localhost:3030" 
    mariadb: str = "localhost"
    solr: str = "http://localhost:8983"
    # mariadb: str = "192.168.128.2"
    # solr: str = "http://192.168.128.3:8983"
<<<<<<< HEAD
    # fuseki: str = "http://192.168.128.4:3030" 
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
    # fuseki: str = "http://192.168.128.4:3030" 
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1

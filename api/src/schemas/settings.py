from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    url: str = "http://localhost"
    fuseki: str = "http://localhost:3030" 
    mariadb: str = "localhost"
    db_user: str = "root"
    db_pass: str = "8486"
    solr: str = "http://localhost:8983"
    # mariadb: str = "mariadb"
    # solr: str = "http://solr:8983"
    # fuseki: str = "http://fuseki:3030" 
   
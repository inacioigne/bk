from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    url: str = "http://localhost"
    # fuseki: str = "http://localhost:3030" 
    # mariadb: str = "localhost"
    # solr: str = "http://localhost:8983"
    mariadb: str = "192.168.128.2"
    solr: str = "http://192.168.128.4:8983"
    fuseki: str = "http://192.168.128.3:3030" 
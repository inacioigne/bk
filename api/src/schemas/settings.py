from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    url: str = "http://localhost"
    fuseki: str = "http://192.168.128.4:3030" 
    mariadb: str = "192.168.128.2"
    solr: str = "http://192.168.128.3:8983"
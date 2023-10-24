from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    url: str = "http://localhost"
    fuseki: str = "http://172.24.0.2:3030" 
    mariadb: str = "172.24.0.3"
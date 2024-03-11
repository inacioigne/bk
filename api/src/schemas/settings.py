from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "BiblioKeia"
    base_url: str = "https://bibliokeia.com"
    fuseki: str = "http://localhost:3030" 
    mariadb: str = "localhost"
    db_user: str = "root"
    db_pass: str = "8486"
    solr: str = "http://localhost:8983"
    organization: str = "Instituto Nacional de Pesquisas da Amazônia"
    organization_loc_uri: str = 'http://id.loc.gov/vocabulary/organizations/brmninpa'


   
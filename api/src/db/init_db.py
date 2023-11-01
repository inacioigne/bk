from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import *
from src.schemas.settings import Settings

settings = Settings()

engine = create_engine(
    f"mariadb+mariadbconnector://root:8486@{settings.mariadb}:3306/bk")
# engine = create_engine(
#      f"mariadb+mariadbconnector://admin:bkpass@{settings.mariadb}:3306/bk")

session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

def initializeDatabase():
    Base.metadata.create_all(bind=engine)
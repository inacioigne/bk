from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from src.db.models import *

engine = create_engine(
    "mariadb+mariadbconnector://admin:bkpass@172.18.0.2:3306/bk")

session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

def initializeDatabase():
    Base.metadata.create_all(bind=engine)
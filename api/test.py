
from sqlalchemy import Column, Integer, String, Date, DATETIME, ForeignKey, true
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta
from sqlalchemy.dialects.mysql import JSON
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
# from src.db.models import *

engine = create_engine(
    "mariadb+mariadbconnector://admin:bkpass@172.18.0.2:3306/bk")

session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine))

class Base(DeclarativeBase):
    pass

class Authority(Base):
    __tablename__ = 'authority'
    id = Column(Integer, primary_key=True)
    type = Column(String(20))
    uri = Column(String(200))

Base.metadata.create_all(bind=engine)
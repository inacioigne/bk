from src.db.init_db import session
from src.db.models import DbWork

def WorkNextId():

    work = session.query(DbWork).order_by(DbWork.id.desc()).first()   
    if  work:
        id = work.id + 1 
        return id
    else:
        return 1
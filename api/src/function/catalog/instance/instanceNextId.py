from src.db.init_db import session
from src.db.models import DbInstance

def InstanceNextId():

    work = session.query(DbInstance).order_by(DbInstance.id.desc()).first()   
    if  work:
        id = work.id + 1 
        return id
    else:
        return 1
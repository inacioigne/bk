from src.db.init_db import session
from src.db.models import DbAuthority

def NextId():

    authority = session.query(DbAuthority).order_by(DbAuthority.id.desc()).first()   
    if  authority:
        id = authority.id + 1 
        return id
    else:
        return 1
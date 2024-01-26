from src.db.init_db import session
from src.db.models import DbItem
from datetime import date

def ItemNextId():

    item = session.query(DbItem).order_by(DbItem.id.desc()).first()   
    if  item:
        id = item.id + 1 
        register = item.barcode 
        year, number = register.split("-")
        current_year = str(date.today().year)[2:]
        if str(date.today().year)[2:] == year:
            number = int(number) + 1
            return {'id': id, 'barcode': f'{year}-{number}'}
        else:
            return {'id': id, 'barcode': f'{current_year}-{1}'}
    else:
        return {'id': 1, 'barcode': f'{current_year}-{1}'}
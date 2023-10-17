from src.db.init_db import initializeDatabase
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from src.routes.users import login
from src.routes.users import users
# from src.routes.cataloguing import images, generateId, work, instances, items, hub, general
# from src.routes.translate import translate
from src.routes.thesaurus import mads
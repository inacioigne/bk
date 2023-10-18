# Dependences
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Bibliokeia Functions
from src.db.init_db import initializeDatabase
from src.routes.users import login
from src.routes.users import users
from src.routes import thesaurus
# from src.routes.cataloguing import images, generateId, work, instances, items, hub, general
# from src.routes.translate import translate

initializeDatabase()





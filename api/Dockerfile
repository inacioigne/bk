FROM python:3.12-slim

RUN apt-get update \
 && apt-get install -qq libmariadb-dev gcc

COPY requirements.txt ./

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt
    
# CMD ["python3", "main.py"]
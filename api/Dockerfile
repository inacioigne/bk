FROM python:3.12-slim

RUN <<EOF
apt-get update
apt-get install libmariadb-dev
apt-get -y install gcc
EOF

# COPY requirements.txt ./

# RUN --mount=type=cache,target=/root/.cache/pip \
#     pip install -r requirements.txt
    
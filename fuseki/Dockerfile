FROM openjdk:19-slim AS base

WORKDIR /fuseki

COPY apache-jena-fuseki-4.9.0.tar.gz /fuseki/

RUN tar xzf /fuseki/apache-jena-fuseki-4.9.0.tar.gz -C /fuseki

RUN apt-get update \
 && apt-get install -qq jq pwgen ruby

CMD [ "/fuseki/apache-jena-fuseki-4.9.0/fuseki-server", "--loc=/fuseki/database", "--update", "/bk" ]
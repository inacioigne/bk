## ---- Stage: Download and build java.
FROM eclipse-temurin:17 AS base

WORKDIR /fuseki

COPY apache-jena-fuseki-4.9.0.tar.gz /fuseki/

RUN apt update
RUN apt install ruby

RUN tar xzf /fuseki/apache-jena-fuseki-4.9.0.tar.gz -C /fuseki

CMD [ "/fuseki/apache-jena-fuseki-4.9.0/fuseki-server" ]
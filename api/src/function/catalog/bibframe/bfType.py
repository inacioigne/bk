from rdflib import URIRef
from rdflib.namespace import RDF, RDFS

def BfType(g, resource, resourceType):
    for i in resourceType:
        bfType = URIRef(f"http://id.loc.gov/ontologies/bibframe/{i.value}")
        g.add((resource, RDF.type, bfType))
    return g
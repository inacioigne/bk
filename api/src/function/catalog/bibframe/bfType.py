from rdflib import URIRef
from rdflib.namespace import RDF, RDFS

def BfType(g, resource, resourceType):
    for i in resourceType:
        bfType = URIRef(i.type.value)
        g.add((resource, RDF.type, bfType))
    return g
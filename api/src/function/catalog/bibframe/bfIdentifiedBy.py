from rdflib import BNode, Literal
from rdflib.namespace import RDF, RDFS

def BfIdentifiedBy(g, resource, identifiedBy, BF):
    if identifiedBy.isbn:
        bnIsbn = BNode()
        g.add((resource, BF.identifiedBy, bnIsbn))
        g.add((bnIsbn, RDF.type, BF.Isbn))
        g.add((bnIsbn, RDF.value, Literal(identifiedBy.isbn)))
    return g
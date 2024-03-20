from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def BfResponsibilityStatement(g, resource, responsibilityStatement, BF):

    g.add((resource, BF.responsibilityStatement, Literal(responsibilityStatement.value)))

    return g
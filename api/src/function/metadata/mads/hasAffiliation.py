from rdflib import URIRef, Namespace, Graph, Literal, BNode
from rdflib.namespace import RDF

def HasAffiliation(g, resource, hasAffiliation, MDASRDF):
    for i in hasAffiliation:
        bNaffiliation = BNode()
        g.add((resource, MDASRDF.hasAffiliation, bNaffiliation))
        g.add((bNaffiliation, RDF.type, MDASRDF.Affiliation))
        uri = URIRef(i.uri)
        g.add((uri, RDF.type, MDASRDF.Organization))
        g.add((uri, MDASRDF.authoritativeLabel, Literal(i.label)))
        g.add((bNaffiliation, MDASRDF.organization, uri))

    return g

from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def HasReciprocal(g, resource, hasReciprocal, MDASRDF):
    for i in hasReciprocal:
        authority = URIRef(i.authority.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, RDF.type, MDASRDF.Topic))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.authority.label)))
        g.add((resource, MDASRDF.hasReciprocalAuthority, authority))
    return g
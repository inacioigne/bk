from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def Occupation(g, resource, occupation, MDASRDF):
    for i in occupation:
        authority = URIRef(i.authority.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.authority.label)))
        g.add((resource, MDASRDF.occupation, authority))
    return g
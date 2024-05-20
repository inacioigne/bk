from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def HasCloseExternalAuthority(g, resource, hasCloseExternalAuthority, MDASRDF):
    for i in hasCloseExternalAuthority:
        authority = URIRef(i.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.label)))
        g.add((resource, MDASRDF.hasCloseExternalAuthority, authority))
    return g


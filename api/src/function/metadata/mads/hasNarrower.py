from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def HasNarrower(g, resource, hasNarrower, MDASRDF):
    for i in hasNarrower:
        authority = URIRef(i.authority.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, RDF.type, MDASRDF.Topic))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.authority.label)))
        g.add((resource, MDASRDF.hasNarrowerAuthority, authority))
    return g
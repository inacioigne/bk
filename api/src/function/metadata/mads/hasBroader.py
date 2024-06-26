from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def HasBroader(g, resource, hasBroader, MDASRDF):
    for i in hasBroader:
        authority = URIRef(i.authority.value)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, RDF.type, MDASRDF.Topic))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.authority.label)))
        g.add((resource, MDASRDF.hasBroaderAuthority, authority))
    return g
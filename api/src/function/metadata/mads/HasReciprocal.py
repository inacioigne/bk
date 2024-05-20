from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def HasReciprocal(g, resource, hasReciprocal, MDASRDF):
    for i in hasReciprocal:
        authority = URIRef(i.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, RDF.type, MDASRDF.Topic))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.label, lang=i.elementLang.value)))
        g.add((resource, MDASRDF.hasReciprocalAuthority, authority))
    return g
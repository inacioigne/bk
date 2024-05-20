from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def HasNarrower(g, resource, hasNarrower, MDASRDF):
    for i in hasNarrower:
        authority = URIRef(i.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, RDF.type, MDASRDF.Topic))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.label, lang=i.elementLang.value)))
        g.add((resource, MDASRDF.hasNarrowerAuthority, authority))
    return g
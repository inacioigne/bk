from rdflib import URIRef, Literal
from rdflib.namespace import RDF

def FieldOfActivity(g, resource, fieldOfActivity, MDASRDF):
    for i in fieldOfActivity:
        authority = URIRef(i.authority.uri)
        g.add((authority, RDF.type, MDASRDF.Authority))
        g.add((authority, MDASRDF.authoritativeLabel, Literal(i.authority.label)))
        g.add((resource, MDASRDF.fieldOfActivity, authority))
    return g
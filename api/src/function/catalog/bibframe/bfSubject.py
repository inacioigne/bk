from rdflib import URIRef, Literal
from rdflib.namespace import RDF, RDFS

def BFSubject(g, subject, resource, BF):
    for i in subject:
        subject = URIRef(i.authority.value)
        g.add((subject, RDF.type, BF.Topic))
        g.add((subject, RDFS.label, Literal(i.authority.label, lang=i.lang.value)))
        g.add((resource, BF.subject, subject))

    return g
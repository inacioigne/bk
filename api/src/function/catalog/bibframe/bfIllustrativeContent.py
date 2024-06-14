from rdflib import URIRef, Literal
from rdflib.namespace import RDF, RDFS

def BfllustrativeContent(g, resource, illustrativeContent, BF):

        for i in illustrativeContent:
                uri = URIRef(i.millus.value)
                g.add((resource, BF.illustrativeContent, uri))
                g.add((uri, RDF.type, BF.Illustration ))
                g.add((uri, RDFS.label, Literal(i.millus.label)))
        
        return g
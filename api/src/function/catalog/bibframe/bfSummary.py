from rdflib import BNode, URIRef, Literal
from rdflib.namespace import RDF, RDFS

def BFSummary(g, summary, resource, BF):
    bNsummary = BNode()
    g.add((resource, BF.summary, bNsummary))
    g.add((bNsummary, RDF.type, BF.Summary))
    g.add((bNsummary, RDFS.label, Literal(summary.value)))       

    return g
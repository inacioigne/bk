from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def BfClassification(g, resource, classification, BF):
    cdd = BNode()
    g.add((resource, BF.classification, cdd))
    g.add((cdd, RDF.type, BF.ClassificationDdc))
    g.add((cdd, BF.classificationPortion, Literal(classification.cdd)))
    cutter = BNode()
    g.add((resource, BF.classification, cutter))
    g.add((cutter, RDF.type, BF.Classification))
    g.add((cutter, BF.classificationPortion, Literal(classification.cutter)))
    return g
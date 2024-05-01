from rdflib import URIRef, Namespace, Graph, Literal, BNode
from rdflib.namespace import RDF

def insertList(g, prevBN, item, MDASRDF):
    bN = BNode()
    g.add((prevBN, RDF.rest, bN))
    bNelement = BNode()
    g.add((bN, RDF.first, bNelement))
    g.add((bNelement, RDF.type, URIRef(item.elementType.value)))
    g.add((bNelement, MDASRDF.elementValue, Literal(item.elementValue)))
    return bN

def ElementList(g, bNvariant, elementList, MDASRDF):
    first = elementList[0]
    midlle = elementList[1:-1] 
    last = elementList[-1]
    prevBN = BNode()
    g.add((bNvariant, MDASRDF.elementList, prevBN))
    bNelement = BNode()
    g.add((prevBN, RDF.first, bNelement))
    g.add((bNelement, RDF.type, URIRef(first.elementType.value)))
    g.add((bNelement, MDASRDF.elementValue, Literal(first.elementValue)))           
    for item in midlle:
        prevBN = insertList(g, prevBN, item, MDASRDF)

    bNlast = BNode()
    g.add((prevBN, RDF.rest, bNlast))
    bNelement = BNode()
    g.add((bNelement, RDF.type, URIRef(last.elementType.value)))
    g.add((bNelement, MDASRDF.elementValue, Literal(last.elementValue)))   
    g.add((bNlast, RDF.first, bNelement))
    g.add((bNlast, RDF.rest, RDF.nil))
    return g

def HasVariant(g, resource, hasVariant, MDASRDF):
    for variant in hasVariant:
        bNvariant = BNode()
        g.add((resource, MDASRDF.hasVariant, bNvariant))
        g.add((bNvariant, RDF.type, URIRef(variant.typeVariant.value)))
        g.add((bNvariant, RDF.type, MDASRDF.Variant))
        ElementList(g, bNvariant, variant.elementList, MDASRDF)
    return g
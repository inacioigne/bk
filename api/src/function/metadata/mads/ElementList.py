from rdflib import URIRef, Namespace, Graph, Literal, BNode
from rdflib.namespace import RDF

def MadsrdfElementList(g, resource, elementList, MDASRDF):

    bNelementList = BNode()
    g.add((resource, MDASRDF.elementList, bNelementList)) 
    if len(elementList) == 1:
        [element] = elementList
        bNElment = BNode()
        g.add((bNElment, RDF.type, URIRef(element.elementType.value))) 
        g.add((bNElment, MDASRDF.elementValue, Literal(element.elementValue))) 
        g.add((bNelementList, RDF.first, bNElment)) 
        g.add((bNelementList, RDF.rest, RDF.nil)) 
    else:
        for element in elementList:
            if elementList.index(element) == 0:
                bNElment = BNode()
                g.add((bNElment, RDF.type, URIRef(element.elementType.value))) 
                g.add((bNElment, MDASRDF.elementValue, Literal(element.elementValue))) 
                g.add((bNelementList, RDF.first, bNElment)) 
                # g.add((bNelementList, RDF.first, bNElment))
            else:
                listItem = BNode()
                bNElment = BNode()
                g.add((bNElment, RDF.type, URIRef(element.elementType.value))) 
                g.add((bNElment, MDASRDF.elementValue, Literal(element.elementValue))) 
                g.add((listItem, RDF.first, bNElment)) 

        g.add((bNelementList, RDF.rest, listItem)) 
        g.add((listItem, RDF.rest, RDF.nil)) 
    return g
from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF

def BfInstanceOf(g, resource, request, BF):

    instanceOf = URIRef(request.instanceOf.value)
    g.add((instanceOf, RDF.type, BF.Work))
    title = BNode()
    g.add((instanceOf, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.title.mainTitle)))
    g.add((resource, BF.instanceOf, instanceOf))

    return g
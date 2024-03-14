from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def BfTitle(g, request, resource, BF):
    title = BNode()
    g.add((resource, BF.title, title))
    g.add((title, RDF.type, BF.Title))
    g.add((title, BF.mainTitle, Literal(request.title.mainTitle)))
    if request.title.subtitle:
        g.add((title, BF.subtitle, Literal(request.title.subtitle)))
    if request.variantTitle:
        for i in request.variantTitle:
            variantTitle = BNode()
            g.add((resource, BF.title, variantTitle))
            g.add((variantTitle, RDF.type, BF.VariantTitle))
            g.add((variantTitle, BF.mainTitle, Literal(i.mainTitle)))
            if i.subtitle:
                g.add((variantTitle, BF.subtitle, Literal(i.subtitle)))

    return g
from rdflib import URIRef, Literal
from rdflib.namespace import RDF, RDFS

def BfGenreForm(g, resource, genreForm, BF):
    for i in genreForm:
        uri = URIRef(i.value)
        g.add((uri, RDF.type, BF.GenreForm ))
        g.add((uri, RDFS.label, Literal(i.label)))
        g.add((resource, BF.genreForm, uri))
    return g
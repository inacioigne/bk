from rdflib import URIRef, Literal
from rdflib.namespace import RDF, RDFS

def BFLanguage(g, language, resource, BF):
    for i in language:
        language = URIRef(f"http://id.loc.gov/vocabulary/languages/{i.lang.value}")
        g.add((language, RDF.type, BF.Language))
        g.add((language, RDFS.label, Literal(i.lang.label)))
        g.add((resource, BF.language, language ))
    return g  
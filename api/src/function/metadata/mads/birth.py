from rdflib import Literal, BNode
from rdflib.namespace import RDF, RDFS

def Birth(g, resource, birth, MDASRDF):
    birthDate = birth.year
    if birth.month:
        birthDate = f'{birthDate}-{birth.month.value}'
    if birth.day:
        birthDate = f'{birthDate}-{birth.day}'
    g.add((resource, MDASRDF.birthDate, Literal(birthDate)))
    if birth.place:
        bN = BNode()
        g.add((resource, MDASRDF.birthPlace, bN))
        g.add((bN, RDF.type, MDASRDF.Geographic))
        g.add((bN, RDFS.label, Literal(birth.place)))
    return g
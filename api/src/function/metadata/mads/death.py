from rdflib import Literal, BNode
from rdflib.namespace import RDF, RDFS

def Death(g, resource, death, MDASRDF):
    deathDate = death.year
    if death.month:
        deathDate = f'{deathDate}-{death.month.value}'
    if death.day:
        deathDate = f'{deathDate}-{death.day}'
    g.add((resource, MDASRDF.deathDate, Literal(deathDate)))
    if death.place:
        bN = BNode()
        g.add((resource, MDASRDF.deathPlace, bN))
        g.add((bN, RDF.type, MDASRDF.Geographic))
        g.add((bN, RDFS.label, Literal(death.place)))
    return g
from rdflib import BNode, Literal
from rdflib.namespace import RDF, RDFS

def BfNote(g, resource, notes, BF):
    for note in notes:
        bnNote = BNode()
        g.add((resource, BF.note, bnNote))
        g.add((bnNote, RDF.type, BF.Note))
        g.add((bnNote, RDFS.label, Literal(note.value)))
    return g
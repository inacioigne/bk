from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS

def BFContribution(g, contribution, resource, BF):
    for i in contribution:
        contribution = BNode()
        g.add((resource, BF.contribution, contribution))
        g.add((contribution, RDF.type, BF.Contribution))
        agent = URIRef(i.authority.value)
        g.add((agent, RDF.type, BF.Agent))
        g.add((agent, RDF.type, BF.Person))
        g.add((agent, RDFS.label, Literal(i.authority.label)))
        g.add((contribution, BF.agent, agent))
        role = URIRef(i.role.value)
        g.add((role, RDF.type, BF.Role))
        g.add((role, RDFS.label, Literal(i.role.label)))
        g.add((contribution, BF.role, role))

    return g
from rdflib import BNode, Literal
from rdflib.namespace import RDF, RDFS

def BfProvisionActivity(g, resource, provisionActivity, BF):
    
    for i in provisionActivity:
        bnProvisionActivity = BNode()
        g.add((bnProvisionActivity, RDF.type, BF.ProvisionActivity))
        g.add((bnProvisionActivity, RDF.type, BF.Publication))
        # Editor
        bnAgent = BNode()
        g.add((bnProvisionActivity, BF.agent, bnAgent))
        g.add((bnAgent, RDF.type, BF.Agent))
        g.add((bnAgent, RDFS.label, Literal(i.agent)))
        # Date
        g.add((bnProvisionActivity, BF.date, Literal(i.date)))
        # Place
        bnPlace = BNode()
        g.add((bnProvisionActivity, BF.place, bnPlace))
        g.add((bnPlace, RDF.type, BF.Place))
        g.add((bnPlace, RDFS.label, Literal(i.place)))
        g.add((resource, BF.provisionActivity, bnProvisionActivity))
    
    return g
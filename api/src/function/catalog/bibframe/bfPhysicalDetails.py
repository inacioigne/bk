from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS


def BfPhysicalDetails(g, resource, physicalDetails, BF):
    
    carrier = URIRef(physicalDetails.carrier.value)
    g.add((carrier, RDF.type, BF.Carrier))
    g.add((carrier, RDFS.label, Literal(physicalDetails.carrier.label)))
    g.add((resource, BF.carrier, carrier))

    extent = BNode()
    g.add((resource, BF.extent, extent))
    g.add((extent, RDF.type, BF.Extent))
    g.add((extent, RDFS.label, Literal(physicalDetails.extent)))

    media = URIRef(physicalDetails.media.value)
    g.add((media, RDF.type, BF.Media))
    g.add((media, RDFS.label, Literal(physicalDetails.media.label)))
    g.add((resource, BF.media, media))
    
    return g
from rdflib import URIRef, BNode, Literal, Namespace, Graph
from src.function.catalog.bibframe.bfAdminMetadata import BfAdminMetadata
from rdflib.namespace import RDF, RDFS, DCTERMS
from src.schemas.settings import Settings

settings = Settings()

def MakeGraphItem(item, instance):
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    identifier = f"{settings.base_url}/items/{item.adminMetadata.identifiedBy}"
    resource = URIRef(identifier)

    g = Graph(identifier=identifier)
    g.bind('bf', BF)
    g.add((resource, RDF.type, BF.Item))
    g = BfAdminMetadata(g, item.adminMetadata, resource, BF) 
    assigner_uri = URIRef(settings.organization_loc_uri)
    g.add((resource, BF.heldBy, assigner_uri))
    itemOf = URIRef(f"{settings.base_url}/instances/{instance}")
    g.add((resource, BF.itemOf, itemOf))
    # CDD
    shelfMark =  BNode()
    g.add((resource, BF.shelfMark, shelfMark))
    g.add((shelfMark, RDF.type, BF.ShelfMarkDdc))
    g.add((shelfMark, RDFS.label, Literal(item.cdd)))
    # Cutter
    bCutter = BNode()
    g.add((resource, BF.shelfMark, bCutter))
    g.add((bCutter, RDF.type, BF.Classification))
    g.add((bCutter, BF.classificationPortion, Literal(item.cutter)))
    # Barcode
    bNBarcode = BNode()
    g.add((resource, BF.identifiedBy, bNBarcode))
    g.add((bNBarcode, RDF.type, BF.Barcode))
    g.add((bNBarcode, RDF.value, Literal(item.barcode)))
    # shelf
    bNsublocation = BNode()
    g.add((resource, BF.sublocation, bNsublocation))
    g.add((bNsublocation, RDF.type, BF.Sublocation))
    g.add((bNsublocation, RDFS.label, Literal(item.shelf)))
    g.add((resource, DCTERMS.isPartOf, URIRef(f"{settings.base_url}/items")))

    graph = g.serialize(format='ttl')

    return graph
from rdflib import URIRef, Namespace, Graph
from src.function.catalog.bibframe.bfResponsibilityStatement import BfResponsibilityStatement
from src.function.catalog.bibframe.bfInstanceOf import BfInstanceOf
from src.function.catalog.bibframe.bfProvisionActivity import BfProvisionActivity
from src.function.catalog.bibframe.bfNote import BfNote
from src.function.catalog.bibframe.bfAdminMetadata import BfAdminMetadata
from src.function.catalog.bibframe.bfPhysicalDetails import BfPhysicalDetails
from src.function.catalog.bibframe.bfTitle import BfTitle
from src.function.catalog.bibframe.bfType import BfType
from rdflib.namespace import RDF, RDFS, DCTERMS

def MakeGraphInstance(request):

    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    identifier = f"https://bibliokeia/works/{request.adminMetadata.identifiedBy}"
    resource = URIRef(identifier)

    g = Graph(identifier=identifier)
    g.bind('bf', BF)
    
    # resourceType
    g = BfType(g, resource, request.resourceType)
    # AdminMetadata
    g = BfAdminMetadata(g, request.adminMetadata, resource, BF) 
    # Title
    g = BfTitle(g, request, resource, BF)  
    
    # PhysicalDetails
    g = BfPhysicalDetails(g, resource, request.physicalDetails, BF)
    if request.note:
        g = BfNote(g, resource, request.note, BF)
    g = BfProvisionActivity(g, resource, request.provisionActivity, BF)
    g = BfResponsibilityStatement(g, resource, request.responsibilityStatement, BF)
    g = BfInstanceOf(g, resource, request, BF)
    g.add((resource, DCTERMS.isPartOf, URIRef("http://bibliokeia/resources/instances")))

 
    graph = g.serialize(format='ttl')
    # g.serialize(destination="instance_test.ttl", format='ttl')

    return graph
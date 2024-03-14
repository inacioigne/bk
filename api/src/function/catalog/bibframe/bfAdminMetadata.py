from datetime import datetime
from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from src.schemas.settings import Settings
from rdflib.namespace import XSD

settings = Settings()

def BfAdminMetadata(g, request, resource, BF):
    now = datetime.now()  

    adminMetadata = BNode()
    g.add((resource, BF.adminMetadata, adminMetadata))
    g.add((adminMetadata, RDF.type, BF.AdminMetadata ))
    # assigner
    assigner_uri = URIRef(settings.organization_loc_uri)
    g.add((assigner_uri, RDF.type, BF.Organization))
    g.add((assigner_uri, RDFS.label, Literal(settings.organization)))
    g.add((adminMetadata, BF.assigner, assigner_uri ))
    # creationDate
    formatted_date = now.strftime("%Y-%m-%d")
    g.add((adminMetadata, BF.creationDate, Literal(formatted_date, datatype=XSD.date) ))
    # descriptionConventions
    descriptionConventions = URIRef(request.adminMetadata.descriptionConventions.value)
    g.add((descriptionConventions, RDF.type, BF.DescriptionConventions ))
    g.add((descriptionConventions, RDFS.label, Literal(request.adminMetadata.descriptionConventions.label) ))
    g.add((adminMetadata, BF.descriptionConventions, descriptionConventions ))
    # generationProcess
    formatted_dateTime = now.strftime("%Y-%m-%dT%H:%M:%S")
    generationProcess = BNode() 
    g.add((adminMetadata, BF.generationProcess, generationProcess))
    g.add((generationProcess, RDF.type, BF.GenerationProcess))
    g.add((generationProcess, RDFS.label, Literal(settings.app_name) ))
    g.add((generationProcess, BF.generationDate, Literal(formatted_dateTime, datatype=XSD.dateTime) ))
    # identifiedBy
    identifiedBy =  BNode() 
    g.add((adminMetadata, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, assigner_uri))
    g.add((identifiedBy, RDF.value, Literal(request.adminMetadata.identifiedBy)))
    # status
    status = URIRef(request.adminMetadata.status.value)
    g.add((status, RDF.type, BF.Status))
    g.add((status, RDFS.label, Literal(request.adminMetadata.status.label)))
    g.add((adminMetadata, BF.status, status))

    return g
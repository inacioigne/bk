from datetime import datetime
from rdflib import URIRef, BNode, Literal
from rdflib.namespace import RDF, RDFS
from src.schemas.settings import Settings
from rdflib.namespace import XSD

settings = Settings()

def BfAdminMetadata(g, adminMetadata, resource, BF):
    # now = datetime.now()  

    bNadminMetadata = BNode()
    g.add((resource, BF.adminMetadata, bNadminMetadata))
    g.add((bNadminMetadata, RDF.type, BF.AdminMetadata ))
    # assigner
    assigner_uri = URIRef(settings.organization_loc_uri)
    g.add((assigner_uri, RDF.type, BF.Organization))
    g.add((assigner_uri, RDFS.label, Literal(settings.organization)))
    g.add((bNadminMetadata, BF.assigner, assigner_uri ))
    # creationDate
    # formatted_date = now.strftime("%Y-%m-%d")
    g.add((bNadminMetadata, BF.creationDate, Literal(adminMetadata.creationDate.strftime("%Y-%m-%d"), datatype=XSD.date) ))
    # descriptionConventions
    descriptionConventions = URIRef(adminMetadata.descriptionConventions.value)
    g.add((descriptionConventions, RDF.type, BF.DescriptionConventions ))
    g.add((descriptionConventions, RDFS.label, Literal(adminMetadata.descriptionConventions.label) ))
    g.add((bNadminMetadata, BF.descriptionConventions, descriptionConventions ))
    # generationProcess
    # formatted_dateTime = now.strftime("%Y-%m-%dT%H:%M:%S")
    generationProcess = BNode() 
    g.add((bNadminMetadata, BF.generationProcess, generationProcess))
    g.add((generationProcess, RDF.type, BF.GenerationProcess))
    g.add((generationProcess, RDFS.label, Literal(settings.app_name) ))
    g.add((generationProcess, BF.generationDate, Literal(adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%S"), datatype=XSD.dateTime) ))
    # identifiedBy
    identifiedBy =  BNode() 
    g.add((bNadminMetadata, BF.identifiedBy, identifiedBy))
    g.add((identifiedBy, RDF.type, BF.Local))
    g.add((identifiedBy, BF.assigner, assigner_uri))
    g.add((identifiedBy, RDF.value, Literal(adminMetadata.identifiedBy)))
    # status
    status = URIRef(adminMetadata.status.value)
    g.add((status, RDF.type, BF.Status))
    g.add((status, RDFS.label, Literal(adminMetadata.status.label)))
    g.add((bNadminMetadata, BF.status, status))

    return g
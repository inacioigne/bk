from rdflib import URIRef, Namespace, Graph
from src.function.catalog.bibframe.bfSummary import BFSummary
from src.function.catalog.bibframe.bfGenreForm import BfGenreForm
from src.function.catalog.bibframe.bfSubject import BFSubject
from src.function.catalog.bibframe.bfContribution import BFContribution
from src.function.catalog.bibframe.bfLanguage import BFLanguage
from src.function.catalog.bibframe.bfTitle import BfTitle
from src.function.catalog.bibframe.bfClassification import BfClassification
from src.function.catalog.bibframe.bfAdminMetadata import BfAdminMetadata
from src.function.catalog.bibframe.bfType import BfType
from src.schemas.settings import Settings

from src.schemas.settings import Settings

settings = Settings()

def MakeGraphWork(request):

    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    identifier = f"{settings.base_url}/works/{request.adminMetadata.identifiedBy}"
    resource = URIRef(identifier)

    g = Graph(identifier=identifier)
    g.bind('bf', BF)
    
    # resourceType
    g = BfType(g, resource, request.resource)
    # AdminMetadata
    g = BfAdminMetadata(g, request.adminMetadata, resource, BF) 
    # BfClassification
    g = BfClassification(g, resource, request.classification, BF)
    # Title
    g = BfTitle(g, request, resource, BF)
    # Language
    g = BFLanguage(g, request.language, resource, BF)
    # Contribution
    if request.contribution:
        g = BFContribution(g, request.contribution, resource, BF)
    # Subject
    if request.subject:
        g = BFSubject(g, request.subject, resource, BF) 
    if request.summary:
        g = BFSummary(g, request.summary, resource, BF)

    # GenreForm
    # if request.genreForm and request.genreForm.valeu != "":
    #     g = BfGenreForm(g, resource, request.genreForm, BF)    
 
    graph = g.serialize(format='ttl')

    return graph


   
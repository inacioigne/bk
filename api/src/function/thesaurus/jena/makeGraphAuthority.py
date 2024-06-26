from rdflib import URIRef, Namespace, Graph, Literal, BNode
from src.function.metadata.mads.occupation import Occupation
from src.function.metadata.mads.fieldOfActivity import FieldOfActivity
from src.function.metadata.mads.HasReciprocal import HasReciprocal
from src.function.metadata.mads.hasNarrower import HasNarrower
from src.function.metadata.mads.hasBroader import HasBroader
from src.function.metadata.mads.hasAffiliation import HasAffiliation
from src.function.metadata.mads.hasCloseExternalAuthority import HasCloseExternalAuthority
from src.function.metadata.mads.death import Death
from src.function.metadata.mads.birth import Birth
from src.function.metadata.mads.hasVariant import HasVariant
from src.function.metadata.mads.ElementList import MadsrdfElementList
from src.function.catalog.bibframe.bfAdminMetadata import BfAdminMetadata
from src.function.catalog.bibframe.bfType import BfType
from src.schemas.settings import Settings
settings = Settings()

def MakeGraphAuthority(request):

    MDASRDF = Namespace("http://www.loc.gov/mads/rdf/v1#")
    BF = Namespace("http://id.loc.gov/ontologies/bibframe/")
    IDENTIFIERS = Namespace("http://id.loc.gov/vocabulary/identifiers/")
    identifier = f"{settings.base_url}/authorities/{request.adminMetadata.identifiedBy}"
    resource = URIRef(identifier)

    g = Graph(identifier=identifier)
    g.bind('madsrdf', MDASRDF)
    g.bind('identifiers', IDENTIFIERS)
    g.bind('bf', BF)
    
    # resourceType
    g = BfType(g, resource, request.resource)
    if request.identifiersLccn:
        g.add((resource, IDENTIFIERS.lccn, Literal(request.identifiersLccn)))
    # AdminMetadata
    g = BfAdminMetadata(g, request.adminMetadata, resource, BF)
    g.add((resource, MDASRDF.authoritativeLabel, Literal(request.authoritativeLabel.value)))
    g = MadsrdfElementList(g, resource, request.elementList, MDASRDF)
    if request.fullerName: 
        g.add((resource, MDASRDF.fullerName, Literal(request.fullerName.value)))
    # HasVariant    
    if request.hasVariant:
        g = HasVariant(g, resource, request.hasVariant, MDASRDF)

    # HasAffiliation
    if request.hasAffiliation:
        g = HasAffiliation(g, resource, request.hasAffiliation, MDASRDF)

    # isMemberOfMADSCollection
    for i in request.isMemberOfMADSCollection:
        collection = f'{settings.base_url}/authorities/{i.collection.value}'
        g.add((resource, MDASRDF.isMemberOfMADSCollection, URIRef(collection)))
    # birth
    if request.birth:
        g = Birth(g, resource, request.birth, MDASRDF)
    # death
    if request.death:
        g = Death(g, resource, request.death, MDASRDF)
    # HasCloseExternalAuthority
    if request.hasCloseExternalAuthority:
        g = HasCloseExternalAuthority(g, resource, request.hasCloseExternalAuthority, MDASRDF)
    # hasBroaderAuthority
    if request.hasBroaderAuthority:
        g = HasBroader(g, resource, request.hasBroaderAuthority, MDASRDF)
    # hasBroaderAuthority
    if request.hasNarrowerAuthority:
        g = HasNarrower(g, resource, request.hasNarrowerAuthority, MDASRDF)
    if request.hasReciprocalAuthority:
        g = HasReciprocal(g, resource, request.hasNarrowerAuthority, MDASRDF)
    # fieldOfActivity    
    if request.fieldOfActivity:
        g = FieldOfActivity(g, resource, request.fieldOfActivity, MDASRDF)
    if request.occupation:
        g = Occupation(g, resource, request.occupation, MDASRDF)

    graph = g.serialize(format='ttl')

    return graph
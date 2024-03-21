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

# from src.function.catalog.bibframe.makeUri import MakeUri

# prefix = """
#     PREFIX bki: <https://bibliokeia.com/catalog/item/> 
#     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
#     PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
#     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
#     PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
#     PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
#     PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
#     PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>
#     PREFIX contentTypes: <http://id.loc.gov/vocabulary/contentTypes/>
#     PREFIX relators: <http://id.loc.gov/vocabulary/relators/>
#     PREFIX genreForms: <http://id.loc.gov/authorities/genreForms/>
#     PREFIX dcterms: <http://purl.org/dc/terms/>
  
#     """

# def MakeLiteral(value):
#     v = f"""bf:extent [ a <{value.type}> ;
#                     rdfs:label "{value.label}" ] ;"""
#     return v

# def MakeGraphItem(item, instance, item_id):
#     graph = f"""{prefix}    
#     INSERT DATA {{
#         GRAPH bki:{item_id}
#         {{
#                 bki:{item_id} a bf:Item;
#                 bf:adminMetadata [ a bf:AdminMetadata ;
#                 bf:assigner <{item.adminMetadata.assigner}> ;    
#                 bf:creationDate "{item.adminMetadata.creationDate}"^^xsd:date ;    
#                 bf:descriptionConventions <{item.adminMetadata.descriptionConventions}> ;
#                 bf:descriptionLanguage <{item.adminMetadata.descriptionLanguage}> ;
#                  bf:generationProcess [ a bf:GenerationProcess ;
#                     rdfs:label "{item.adminMetadata.generationProcess}" ;
#                     bf:generationDate "{item.adminMetadata.generationDate}"^^xsd:dateTime ] ;
#                 bf:identifiedBy [ a bf:Local ;
#                     bf:assigner <{item.adminMetadata.assigner}> ;
#                     rdf:value "{item.barcode}" ] ;
#                 bf:status "{item.adminMetadata.status.value}" ] ;   
#                 bf:heldBy <{item.adminMetadata.assigner}> ;  
#                 bf:itemOf <https://bibliokeia.com/catalog/instances/{str(instance)}> ;  
#                 bf:shelfMark [ a bf:ShelfMarkDdc ;
#                         rdfs:label "{item.cdd}" ;
#                         bf:assigner <{item.adminMetadata.assigner}> ] ;
#                 dcterms:isPartOf <https://bibliokeia.com/catalog/items/> .
#         }} }}
#         """
#     return graph  
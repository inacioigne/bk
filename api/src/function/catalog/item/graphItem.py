from src.function.catalog.bibframe.makeUri import MakeUri

prefix = """
    PREFIX bki: <https://bibliokeia.com/catalog/item/> 
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
    PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
    PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>
    PREFIX contentTypes: <http://id.loc.gov/vocabulary/contentTypes/>
    PREFIX relators: <http://id.loc.gov/vocabulary/relators/>
    PREFIX genreForms: <http://id.loc.gov/authorities/genreForms/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
  
    """

def MakeLiteral(value):
    v = f"""bf:extent [ a <{value.type}> ;
                    rdfs:label "{value.label}" ] ;"""
    return v

def MakeGraphItem(item, instance, item_id):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH bki:{item_id}
        {{
                bki:{item_id} a bf:Item;
                bf:adminMetadata [ a bf:AdminMetadata ;
                bf:assigner <{item.adminMetadata.assigner}> ;    
                bf:creationDate "{item.adminMetadata.creationDate}"^^xsd:date ;    
                bf:descriptionConventions <{item.adminMetadata.descriptionConventions}> ;
                bf:descriptionLanguage <{item.adminMetadata.descriptionLanguage}> ;
                 bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{item.adminMetadata.generationProcess}" ;
                    bf:generationDate "{item.adminMetadata.generationDate}"^^xsd:dateTime ] ;
                bf:identifiedBy [ a bf:Local ;
                    bf:assigner <{item.adminMetadata.assigner}> ;
                    rdf:value "{item.barcode}" ] ;
                bf:status "{item.adminMetadata.status.value}" ] ;   
                bf:heldBy <{item.adminMetadata.assigner}> ;  
                bf:itemOf <https://bibliokeia.com/catalog/instances/{str(instance)}> ;  
                bf:shelfMark [ a bf:ShelfMarkDdc ;
                        rdfs:label "{item.cdd}" ;
                        bf:assigner <{item.adminMetadata.assigner}> ] ;
                dcterms:isPartOf <https://bibliokeia.com/catalog/items/> .
        }} }}
        """
    return graph  
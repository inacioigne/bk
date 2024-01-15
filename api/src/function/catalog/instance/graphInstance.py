from src.function.catalog.bibframe.makeUri import MakeUri


prefix = """
PREFIX bki: <https://bibliokeia.com/catalog/instance/> 
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
    PREFIX msupplcont: <http://id.loc.gov/vocabulary/msupplcont/>
    PREFIX millus: <http://id.loc.gov/vocabulary/millus/>    
    """

def MakeLiteral(value):
    v = f"""bf:extent [ a <{value.type}> ;
                    rdfs:label "{value.label}" ] ;"""
    return v

def MakeGraphInstance(request):
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH bki:{request.identifiersLocal}
        {{
                bki:{request.identifiersLocal} a bf:Instance, 
                    bf:{request.type};
                bf:adminMetadata [ a bf:AdminMetadata ;
                bf:assigner <{request.adminMetadata.assigner}> ;    
                bf:creationDate "{request.adminMetadata.creationDate}"^^xsd:date ;    
                bf:descriptionConventions <{request.adminMetadata.descriptionConventions}> ;
                bf:descriptionLanguage <{request.adminMetadata.descriptionLanguage}> ;
                 bf:generationProcess [ a bf:GenerationProcess ;
                    rdfs:label "{request.adminMetadata.generationProcess}" ;
                    bf:generationDate "{request.adminMetadata.generationDate}"^^xsd:dateTime ] ;
                bf:identifiedBy [ a bf:Local ;
                    bf:assigner <{request.adminMetadata.assigner}> ;
                    rdf:value "{request.identifiersLocal}" ] ;
                bf:status "{request.adminMetadata.status.value}" ] ;            
                bf:title [ a bf:Title ;
                bf:mainTitle "{request.title.mainTitle}" 
                { f'; bf:subtitle "{request.title.subtitle}" ' if request.title.subtitle else ''} ] ;
                { f'bf:carrier <{request.carrier.uri}> ;' if request.carrier else "" }
                { f'bf:issuance <{request.issuance.uri}> ;'}
                { f'bf:media <{request.media.uri}> ;'}
                { MakeUri("copyrightDate", request.copyrightDate) if request.copyrightDate else "" }
                { f'bf:dimensions "{request.dimensions}" ; ' if request.dimensions else ""  }
                { MakeLiteral(request.extent) if request.extent else "" }
                 bf:instanceOf <{request.instanceOf.uri}> ; 
        }} }}
        """
    return graph  
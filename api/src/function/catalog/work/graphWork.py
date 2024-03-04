from src.function.catalog.bibframe.bfTitle import MakeTitle
from src.function.catalog.bibframe.bfLanguage import MakeLanguage
from src.function.catalog.bibframe.bfClassification import MakeClassification
from src.function.catalog.bibframe.bfContribution import MakeContribution
from src.function.catalog.bibframe.bfSubject import MakeSubject
from src.function.catalog.bibframe.bfGenreForm import MakeGenreForm
from src.function.catalog.bibframe.bfSummary import  MakeSummary
from src.function.catalog.bibframe.makeUri import MakeUri

from src.schemas.settings import Settings

settings = Settings()



prefix = """PREFIX bkw: <https://bibliokeia.com/catalog/work/> 
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX bf: <http://id.loc.gov/ontologies/bibframe/>
            PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
            PREFIX bflc: <http://id.loc.gov/ontologies/bflc/> 
            PREFIX menclvl: <http://id.loc.gov/vocabulary/menclvl/>
            PREFIX mstatus: <http://id.loc.gov/vocabulary/mstatus/>
            PREFIX contentTypes: <http://id.loc.gov/vocabulary/contentTypes/>
            PREFIX relators: <http://id.loc.gov/vocabulary/relators/>
            PREFIX genreForms: <http://id.loc.gov/authorities/genreForms/>
            PREFIX msupplcont: <http://id.loc.gov/vocabulary/msupplcont/>
            PREFIX millus: <http://id.loc.gov/vocabulary/millus/>    
            PREFIX dcterms: <http://purl.org/dc/terms/>    
    """

def MakeGraphWork(request, word_id): 
    [work] = request.work
    graph = f"""{prefix}    
    INSERT DATA {{
        GRAPH bkw:{word_id}
        {{
                bkw:{word_id} a bf:{work.type},
                    bf:Work ;
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
                    rdf:value "{word_id}" ] ;
                bf:status [ a bf:Status ;
                    rdfs:label "{request.adminMetadata.status.label}" ;
                    bf:code "{request.adminMetadata.status.value}" ] ] ;
                { MakeClassification(work.cdd) }                
                bf:content <{work.content}>  ; 
                { MakeLanguage(request.language) }
                { MakeTitle(request.title) }
                { MakeContribution(request.contribution) if request.contribution  else "" }  
                { MakeSubject(request.subject) if request.subject  else "" }
                { MakeGenreForm(request.genreForm)if request.genreForm  else "" }         
                { f'bf:note [ a bf:Note ; rdfs:label "{request.note}" ] ; ' if request.note else '' }
                { MakeSummary(request.summary) if request.summary else "" }
                { f'bf:tableOfContents [ a bf:tableOfContents ; rdfs:label "{request.tableOfContents}" ] ; ' if request.tableOfContents else '' }
                { MakeUri("supplementaryContent", request.supplementaryContent) if request.supplementaryContent else "" }
                { MakeUri("illustrativeContent", request.illustrativeContent) if request.illustrativeContent else "" }
                { MakeUri("intendedAudience", request.intendedAudience) if request.intendedAudience else "" }
                { MakeUri("geographicCoverage", request.geographicCoverage) if request.geographicCoverage else "" }
                dcterms:isPartOf <{settings.base_url}/catalog/work> .
        }} }}
        """
    return graph
from pyfuseki import FusekiUpdate
from src.schemas.settings import Settings

settings = Settings()
update = FusekiUpdate(settings.fuseki, 'bk') 

def UpdateJena(request):
    
    # hasReciprocalAuthority
    loc_uri = f'http://id.loc.gov/authorities/{request.isMemberOfMADSCollection}/{request.identifiersLccn}'
    bk_uri =  f'https://bibliokeia.com/authority/{request.type}/{request.identifiersLocal}'
    if request.hasReciprocalAuthority:
        for i in request.hasReciprocalAuthority:
            if i.base == "bk":
                sparql = f"""PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
                            WITH <{i.uri}>
                            DELETE {{ <{i.uri}> mads:hasReciprocalAuthority <{loc_uri}> }}
                            INSERT {{ <{i.uri}> mads:hasReciprocalAuthority <{bk_uri}> }}
                            WHERE {{ <{i.uri}> mads:hasReciprocalAuthority <{loc_uri}> }}"""
                res = update.run_sparql(sparql)
    
    # hasNarrowerAuthority
    if request.hasNarrowerAuthority:
        for i in request.hasNarrowerAuthority:
            if i.base == "bk":
                sparql = f"""PREFIX mads: <http://www.loc.gov/mads/rdf/v1#>
                                WITH <{i.uri}>
                                DELETE {{ <{i.uri}> mads:hasBroaderAuthority <{loc_uri}> }}
                                INSERT {{ <{i.uri}> mads:hasBroaderAuthority <{bk_uri}> }}
                                WHERE {{ <{i.uri}> mads:hasBroaderAuthority <{loc_uri}> }}"""
                res = update.run_sparql(sparql)
from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()

solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)

def DeleteAuthoritySolr(doc): 
    id = doc['id']
    ids = [id]

    nMeta = [
        "id", "identifiersLccn","type", "creationDate", "authority", "affiliation", "occupation", "isMemberOfMADSCollection", 
        "note", "variant", "imagem", "fullerName", "birthDate", "birthPlace","deathDate",  "_version_", 
        "label", "changeDate", "deathPlace", "birthDayDate", "birthMonthDate", "birthYearDate", "deathDayDate",
        "deathMonthDate", "deathYearDate", "occupationLabels", "hasBroaderAuthorityLabels", "hasNarrowerAuthorityLabels", 
          "hasReciprocalAuthorityLabels", "lang", "uri"  ]

    for k, v in doc.items():
        if k not in nMeta:
            if type(v) == list:
                for i in v:
                    ids.append(i['id']) 
            else:
                ids.append(v['id']) 
    responseSolr = solr.delete(id=ids, commit=True)

    return responseSolr


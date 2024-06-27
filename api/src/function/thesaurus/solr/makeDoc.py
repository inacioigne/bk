from src.function.thesaurus.solr.hasAffiliationDoc import HasAffiliationDoc
from src.function.thesaurus.solr.hasVariantDoc import HasVariantDoc
from src.function.thesaurus.solr.birthDoc import BirthDoc
from src.function.thesaurus.solr.deathDoc import DeathDoc
from src.schemas.settings import Settings
settings = Settings()

def MakeDoc(request):
    authority = request.elementList[0].elementValue
    authority = authority.removesuffix(',')
    isMemberOfMADSCollection = [i.collection.value for i in request.isMemberOfMADSCollection]

    doc = { 
            'id': f'authority#{request.adminMetadata.identifiedBy}',
            'uri': f'{settings.base_url}/authorities/{request.adminMetadata.identifiedBy}',
            'type': [i.type.label for i in request.resource],
            "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
            # "label": request.authoritativeLabel.value,
            "authority": authority,
            "isMemberOfMADSCollection": isMemberOfMADSCollection
        }
    # Lang
    element = request.elementList[0]
    lang = element.elementLang
    if lang:
        doc['lang'] = lang.label

    if request.identifiersLccn:
        doc['identifiersLccn'] = request.identifiersLccn
        
    if request.imagem:
        doc['imagem'] = request.imagem

    if request.adminMetadata.changeDate:
        doc['changeDate'] = request.adminMetadata.changeDate.strftime("%Y-%m-%dT%H:%M:%S")
    
    if request.fullerName:
        doc['fullerName'] = request.fullerName.value
    
    metadados = ['birthDayDate', 'birthMonthDate','birthYearDate', 'birthDate', 'birthPlace', 'deathDate', 'deathPlace',
                 'deathDayDate', 'deathMonthDate', 'deathYearDate']
    for metadado in metadados:
        value = request.model_dump().get(metadado)
        if value:
            doc[metadado] = value

    if request.birth:
        doc = BirthDoc(doc, request.birth)

    if request.death:
        doc = DeathDoc(doc, request.death)
    
    # hasAffiliation  
    if request.hasAffiliation:
        affiliations = HasAffiliationDoc(request.hasAffiliation, request.adminMetadata.identifiedBy)
        doc['hasAffiliation'] = affiliations

    # hasVariant
    if request.hasVariant:
        doc = HasVariantDoc(request.hasVariant, doc)

    # hasCloseExternalAuthority
    if request.hasCloseExternalAuthority:
        uris = list()
        for i in request.hasCloseExternalAuthority:
            uri = {
                    'id': f"authority#{request.identifiersLocal}/hasCloseExternalAuthority#{i.uri.split('/')[-1]}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base }
            uris.append(uri)
        doc['hasCloseExternalAuthority'] = uris

    # Broader
    if request.hasBroaderAuthority:
        listMads = list()
        for i in request.hasBroaderAuthority:
            if i.authority.value:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/hasBroaderAuthority#{i.authority.value.split('/')[-1]}",
                    'label': i.authority.label,
                    'uri': i.authority.value,
                    'base': i.authority.base }
            else:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/hasBroaderAuthority#{i.authority.label}",
                    'label': i.authority.label,
                    'base': i.authority.base }

            listMads.append(uri)
        doc['hasBroaderAuthority'] = listMads
        doc['hasBroaderAuthorityLabels']  = [i['label'] for i in listMads]

    # hasNarrowerAuthority
    if request.hasNarrowerAuthority:
        listMads = list()
        for i in request.hasNarrowerAuthority:
            if i.authority.value:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/hasNarrowerAuthority#{i.authority.value.split('/')[-1]}",
                    'label': i.authority.label,
                    'uri': i.authority.value,
                    'base': i.authority.base }
            else:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/hasNarrowerAuthority#{i.authority.label}",
                    'label': i.authority.label,
                    'base': i.authority.base }

            listMads.append(uri)
        doc['hasNarrowerAuthority'] = listMads
        doc['hasNarrowerAuthorityLabels']  = [i['label'] for i in listMads]

    # hasReciprocalAuthority
    if request.hasReciprocalAuthority:
        listMads = list()
        for i in request.hasReciprocalAuthority:
            if i.authority.value:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/hasReciprocalAuthority#{i.authority.value.split('/')[-1]}",
                    'label': i.authority.label,
                    'uri': i.authority.value,
                    'base': i.authority.base }
            else:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/hasReciprocalAuthority#{i.authority.label}",
                    'label': i.authority.label,
                    'base': i.authority.base }

            listMads.append(uri)
        doc['hasReciprocalAuthority'] = listMads
        doc['hasReciprocalAuthorityLabels']  = [i['label'] for i in listMads]
        
    # Occupation
    if request.occupation:
        occupations = list()
        for i in request.occupation:
            if i.authority.value:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/occupation#{i.authority.value.split('/')[-1]}",
                    'label': i.authority.label,
                    'uri': i.authority.value,
                    'base': i.authority.base }
            else:
                uri = {
                    'id': f"authority#{request.identifiersLocal}/occupation#{i.authority.label}",
                    'label': i.authority.label,
                    'base': i.authority.base }

            occupations.append(uri)
        doc['occupation'] = occupations
        doc['occupationLabels']  = [i['label'] for i in occupations]

    # fieldOfActivity
    if request.fieldOfActivity:
        fields = list()
        for i in request.fieldOfActivity:
            uri = {
                    'id': f"authority#{request.identifiersLocal}/fieldOfActivity#{i.authority.value.split('/')[-1]}",
                    'uri': i.authority.value, 
                    'label': i.authority.label, 
                    'base': i.authority.base }
            fields.append(uri)
        doc['fieldOfActivity'] = fields

    # identifiesRWO
    if request.identifiesRWO:
        fields = list()
        for i in request.identifiesRWO:
            identifier = i.uri.split("/")[-1]
            uri = {
                    'id': f"authority#{request.identifiersLocal}/identifiesRWO#{identifier}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base}
            fields.append(uri)
        doc['identifiesRWO'] = fields

    return doc
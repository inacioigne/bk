def MakeDoc(request, id):
    authority = request.elementList[0].elementValue.value
    authority = authority.removesuffix(',')
    isMemberOfMADSCollection = request.isMemberOfMADSCollection.split("/")[-1]

    doc = { 
            'id': id,
            'type': request.type,
            "creationDate": request.adminMetadata.creationDate.strftime('%Y-%m-%d'), 
            "label": request.authoritativeLabel,
            "authority": authority,
            "isMemberOfMADSCollection": isMemberOfMADSCollection
        }
    if request.identifiersLccn:
        doc['identifiersLccn'] = request.identifiersLccn
        
    if request.imagem:
        doc['imagem'] = request.imagem

    if request.adminMetadata.changeDate:
        doc['changeDate'] = request.adminMetadata.changeDate.strftime("%Y-%m-%dT%H:%M:%S")
    
    if request.fullerName:
        doc['fullerName'] = request.fullerName
    
    metadados = ['birthDayDate', 'birthMonthDate','birthYearDate', 'birthDate', 'birthPlace', 'deathDate', 'deathPlace',
                 'deathDayDate', 'deathMonthDate', 'deathYearDate']
    for metadado in metadados:
        value = request.model_dump().get(metadado)
        if value:
            doc[metadado] = value

    if request.birthDayDate and request.birthMonthDate and request.birthYearDate:
        date = f"{request.birthDayDate}-{request.birthMonthDate}-{request.birthYearDate}"
        doc['birthDate'] = date
    elif request.birthMonthDate and request.birthYearDate:
        date = f"{request.birthMonthDate}-{request.birthYearDate}"
        doc['birthDate'] = date 
    elif request.birthYearDate:
        doc['birthDate'] = request.birthYearDate 

    if request.deathDayDate and request.deathMonthDate and request.deathYearDate:
        date = f"{request.deathDayDate}-{request.deathMonthDate}-{request.deathYearDate}"
        doc['deathDate'] = date
    elif request.deathMonthDate and request.deathYearDate:
        date = f"{request.deathMonthDate}-{request.deathDayDate}"
        doc['deathDate'] = date 
    elif request.deathYearDate:
        doc['deathDate'] = request.deathYearDate 
    
    # hasAffiliation  
    if request.hasAffiliation:
        affiliations = list()
        for i in request.hasAffiliation:
            if i.organization.uri:
                a = {
                'id': f"{id}/hasAffiliation#{i.organization.uri.split('/')[-1]}",
                'organization': {
                    "label": i.organization.label,
                    'uri': i.organization.uri,
                    "base": i.organization.base
                    },                
                'affiliationStart': i.affiliationStart }
            else:
                a = {
                'id': f"{id}/hasAffiliation#{i.organization.label}",
                'organization': {
                    "label": i.organization.label,
                    # 'uri': i.organization.uri,
                    "base": i.organization.base
                    },                
                'affiliationStart': i.affiliationStart }

            if i.affiliationEnd:
                a['affiliationEnd'] = i.affiliationEnd
            affiliations.append(a)
        doc['hasAffiliation'] = affiliations
        doc['affiliation']  = [i['organization'] for i in affiliations]

    # hasVariant
    if request.hasVariant:
        variants = list()
        hasVariants = list()
        for i in request.hasVariant:
            print(i) 
            label = [j.elementValue.value for j in i.elementList]
            variantLabel = " ".join(label)
            variants.append(variantLabel)
            hasVariant = i.model_dump()
            hasVariant['variantLabel'] = variantLabel
            hasVariants.append(hasVariant)
        doc['variant'] = variants
        doc['hasVariant'] = hasVariants

    # hasCloseExternalAuthority
    if request.hasCloseExternalAuthority:
        uris = list()
        for i in request.hasCloseExternalAuthority:
            uri = {
                    'id': f"{id}/hasCloseExternalAuthority#{i.uri.split('/')[-1]}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base }
            uris.append(uri)
        doc['hasCloseExternalAuthority'] = uris

    # Broader
    if request.hasBroaderAuthority:
        listMads = list()
        for i in request.hasBroaderAuthority:
            if i.uri:
                uri = {
                    'id': f"{id}/hasBroaderAuthority#{i.uri.split('/')[-1]}",
                    'label': i.label,
                    'uri': i.uri,
                    'base': i.base }
            else:
                uri = {
                    'id': f"{id}/hasBroaderAuthority#{i.label}",
                    'label': i.label,
                    'base': i.base }

            listMads.append(uri)
        doc['hasBroaderAuthority'] = listMads
        doc['hasBroaderAuthorityLabels']  = [i['label'] for i in listMads]

    # hasNarrowerAuthority
    if request.hasNarrowerAuthority:
        listMads = list()
        for i in request.hasNarrowerAuthority:
            if i.uri:
                uri = {
                    'id': f"{id}/hasNarrowerAuthority#{i.uri.split('/')[-1]}",
                    'label': i.label,
                    'uri': i.uri,
                    'base': i.base }
            else:
                uri = {
                    'id': f"{id}/hasNarrowerAuthority#{i.label}",
                    'label': i.label,
                    'base': i.base }

            listMads.append(uri)
        doc['hasNarrowerAuthority'] = listMads
        doc['hasNarrowerAuthorityLabels']  = [i['label'] for i in listMads]

    # hasReciprocalAuthority
    if request.hasReciprocalAuthority:
        listMads = list()
        for i in request.hasReciprocalAuthority:
            if i.uri:
                uri = {
                    'id': f"{id}/hasReciprocalAuthority#{i.uri.split('/')[-1]}",
                    'label': i.label,
                    'uri': i.uri,
                    'base': i.base }
            else:
                uri = {
                    'id': f"{id}/hasReciprocalAuthority#{i.label}",
                    'label': i.label,
                    'base': i.base }

            listMads.append(uri)
        doc['hasReciprocalAuthority'] = listMads
        doc['hasReciprocalAuthorityLabels']  = [i['label'] for i in listMads]
        
    # Occupation
    if request.occupation:
        occupations = list()
        for i in request.occupation:
            if i.uri:
                uri = {
                    'id': f"{id}/occupation#{i.uri.split('/')[-1]}",
                    'label': i.label,
                    'uri': i.uri,
                    'base': i.base }
            else:
                uri = {
                    'id': f"{id}/occupation#{i.label}",
                    'label': i.label,
                    'base': i.base }

            occupations.append(uri)
        doc['occupation'] = occupations
        doc['occupationLabels']  = [i['label'] for i in occupations]

    # fieldOfActivity
    if request.fieldOfActivity:
        fields = list()
        for i in request.fieldOfActivity:
            uri = {
                    'id': f"{id}/fieldOfActivity#{i.uri.split('/')[-1]}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base }
            fields.append(uri)
        doc['fieldOfActivity'] = fields

    # identifiesRWO
    if request.identifiesRWO:
        fields = list()
        for i in request.identifiesRWO:
            identifier = i.uri.split("/")[-1]
            uri = {
                    'id': f"{id}/identifiesRWO#{identifier}",
                    'uri': i.uri, 
                    'label': i.label, 
                    'base': i.base}
            fields.append(uri)
        doc['identifiesRWO'] = fields

    return doc

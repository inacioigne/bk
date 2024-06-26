from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)


def DocWork(request):

    work_id = f'work#{request.adminMetadata.identifiedBy}'
    # print("DATE:", request.adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%S"))

    doc = {
        "id": work_id,
        "creationDate": request.adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%S"),
        "changeDate": request.adminMetadata.changeDate.strftime("%Y-%m-%dT%H:%M:%S") if request.adminMetadata.changeDate else None,
        "type": [i.type.value for i in request.resource],
        "mainTitle": request.title.mainTitle,
        # "variantTitle": request.
        'language': [i.lang.label for i in request.language],
        "subtitle": request.title.subtitle,
        "cdd": request.classification.cdd,
        "cutter": request.classification.cutter,
        "note": request.note,
        "summary": request.summary.value if request.summary else None,
        "tableOfContents": request.tableOfContents,
        # "supplementaryContent": [i.label for i in request.supplementaryContent] if request.supplementaryContent else None,
        # "illustrativeContent": [i.label for i in request.illustrativeContent] if request.illustrativeContent else None,
        # "intendedAudience": [i.label for i in request.intendedAudience] if request.intendedAudience else None,
        # "geographicCoverage": [i.label for i in request.geographicCoverage] if request.geographicCoverage else None,
        "isPartOf": "Work"

    }
    # contribution
    if request.contribution:
        contributions = list()
        for i in request.contribution:
            c = {"id": f"{work_id}/contribution/authority#{i.authority.value.split('/')[-1]}",
                 "uri": i.authority.value,
                 "contribution_label": i.authority.label,
                 "role": i.role.value,
                 "roleLabel": i.role.label}
            contributions.append(c)
        doc['contribution'] = contributions

    # subject
    if request.subject:
        subjects = list()
        for i in request.subject:
            s = {"id": f"{work_id}/subject/authority#{i.authority.value.split('/')[-1]}",
                 "type": i.type.value,
                 "uri": i.authority.value,
                 "subject_label": i.authority.label,
                 "lang": i.lang.label
                 }
            subjects.append(s)
        doc['subject'] = subjects

    # if request.genreForm:
    #     pass

    responseSolr = solr.add([doc], commit=True)

    return responseSolr

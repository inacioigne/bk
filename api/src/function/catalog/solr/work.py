from pysolr import Solr
from src.schemas.settings import Settings

settings = Settings()
solr = Solr(f'{settings.solr}/solr/catalog/', timeout=10)


def DocWork(request, work_id):

    work_id = f'work#{work_id}'

    doc = {
        "id": work_id,
        "creationDate": request.adminMetadata.creationDate.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "type": request.type,
        # "content": [i.label for i in request.content],
        "content": request.content.label,
        "mainTitle": request.title.mainTitle,
        'language': [i.label for i in request.language],
        "subtitle": request.title.subtitle,
        "cdd": request.classification.classificationPortion if request.classification else None,
        "note": request.note,
        "summary": request.summary,
        "tableOfContents": request.tableOfContents,
        "supplementaryContent": [i.label for i in request.supplementaryContent] if request.supplementaryContent else None,
        "illustrativeContent": [i.label for i in request.illustrativeContent] if request.illustrativeContent else None,
        "intendedAudience": [i.label for i in request.intendedAudience] if request.intendedAudience else None,
        "geographicCoverage": [i.label for i in request.geographicCoverage] if request.geographicCoverage else None,
        "isPartOf": "Work"

    }
    # contribution
    if request.contribution:
        contributions = list()
        for i in request.contribution:
            c = {"id": f"{work_id}/contribution/{i.agent.split('/')[-1]}",
                 "agent": i.agent,
                 "label": i.label,
                 "role": i.role,
                 "roleLabel": i.roleLabel}
            contributions.append(c)
        doc['contribution'] = contributions

    # subject
    if request.subject:
        subjects = list()
        for i in request.subject:
            s = {"id": f"{work_id}/subject/{i.uri.split('/')[-1]}",
                 "type": i.type,
                 "uri": i.uri,
                 "label": i.label}
            subjects.append(s)
        doc['subject'] = subjects

    if request.genreForm:
        pass

    # print("DOC:", doc)

    responseSolr = solr.add([doc], commit=True)

    return responseSolr

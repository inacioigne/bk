def HasAffiliationDoc(hasAffiliation, identifiedBy):
    affiliations = list()
    for i in hasAffiliation:
        obj  = {'id': f"authority#{identifiedBy}/hasAffiliation#{i.uri.split('/')[-1]}"}
        affiliation = obj | i.model_dump()
        affiliations.append(affiliation)
    return affiliations
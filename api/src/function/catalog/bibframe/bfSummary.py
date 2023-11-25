def MakeSummary(summary):

    s = f""" bf:summary [ a bf:Summary ;
            rdfs:label "{summary.replace('"','' )}" ] ;
    """
    return s
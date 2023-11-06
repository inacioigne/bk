def ListUri(uris, madsrdf):

    listMads = list()
    for i in uris:
        if i.uri:
            element = f'<{i.uri}>'
            listMads.append(element)
        else:
            element = f"""[ a madsrdf:{madsrdf} ;
            rdfs:label "{i.label}" ]"""
            listMads.append(element)
    elements = ", ".join(listMads)
    mads = f"madsrdf:{madsrdf} {elements} ;"

    return mads
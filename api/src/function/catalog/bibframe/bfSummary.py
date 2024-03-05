def MakeSummary(notes):
    
    note = notes[0]
    if note.summary != "":
        s = f""" bf:summary [ a bf:Summary ;
            rdfs:label "{note.summary.replace('"','' )}" ] ;
                """
        return s
    else:
        return ""
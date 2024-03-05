def MakeTableOfContents(notes): 
        
    note = notes[0]
    if note.tableOfContents != "":     
        t = f'bf:tableOfContents [ a bf:tableOfContents ; rdfs:label "{note.tableOfContents}" ] ; ' 
        return t
    else:
        return ""
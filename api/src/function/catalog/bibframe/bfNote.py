def MakeNote(notes): 

        note = notes[0]
        if note.note != "":
                n = f'bf:note [ a bf:Note ; rdfs:label "{note.note}" ] ; '
                return n
        else:
                return ""
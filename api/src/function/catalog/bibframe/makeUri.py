def clean_list(elements):
    return elements.uri != ""

def MakeUri(metadada, elements):

       elements = list(filter(clean_list, elements))
       if len(elements) > 0:
             sparql = f'bf:{metadada} { ", ".join([f"<{i.uri}>" for i in elements ])} ;'
             return sparql
       else:
             return ""
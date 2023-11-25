def MakeUri(metadada, elements):
       
       sparql = f'bf:{metadada} { ", ".join([f"<{i.uri}>" for i in elements ])} ;'

       return sparql
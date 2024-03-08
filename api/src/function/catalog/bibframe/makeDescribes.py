def MakeDescribes(describes):
       
       for describe in describes:
              
       
       sparql = f'bf:{metadada} { ", ".join([f"<{i.uri}>" for i in elements ])} ;'

       return sparql
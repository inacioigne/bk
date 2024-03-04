def MakeLanguage(language):
    
    l = f"bf:language { ", ".join([f'<http://id.loc.gov/vocabulary/languages/{i.lang}>' for i in language]) } ;"
  
    return l
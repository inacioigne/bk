def MakeTitle(title):
    title = title[0]
    
    t = f""" bf:title [ a bf:Title ;
                bf:mainTitle "{title.mainTitle}" 
                { f'; bf:subtitle "{title.subtitle}" ' if title.subtitle else ''} ] ;""" 
    return t
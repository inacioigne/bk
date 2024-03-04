def MakeClassification(classification):
    c = f"""bf:classification 
            [ a bf:ClassificationDdc ;
                bf:classificationPortion "{classification}" ;
                ] ;"""
    return c
def MakeClassification(classification):
    c = f"""bf:classification 
            [ a bf:ClassificationDdc ;
                bf:classificationPortion "{classification.classificationPortion}" ;
                { f'bf:itemPortion "{classification.itemPortion}" ;' if classification.itemPortion else ''}
                bf:edition "full" ;
                ] ;"""
    return c
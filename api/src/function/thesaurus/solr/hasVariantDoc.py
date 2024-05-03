def HasVariantDoc(hasVariant, doc):
    variants = list()
    hasVariants = list()
    for i in hasVariant:
        label = [j.elementValue for j in i.elementList]
        variantLabel = " ".join(label)
        variants.append(variantLabel)
        hasVariant = i.model_dump()
        hasVariant['variantLabel'] = variantLabel
        hasVariants.append(hasVariant)
    doc['variant'] = variants
    doc['hasVariant'] = hasVariants
    return doc
def BirthDoc(doc, birth):
    birthDate = birth.year
    if birth.month:
        birthDate = f'{birthDate}-{birth.month.value}'
    if birth.day:
        birthDate = f'{birthDate}-{birth.day}'
    doc['birthDate'] = birthDate
    if birth.place:
        doc['birthPlace'] = birth.place
    return doc
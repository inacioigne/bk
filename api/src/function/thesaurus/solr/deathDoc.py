def DeathDoc(doc, death):
    deathDate = death.year
    if death.month:
        deathDate = f'{deathDate}-{death.month.value}'
    if death.day:
        deathDate = f'{deathDate}-{death.day}'
    doc['deathDate'] = deathDate
    if death.place:
        doc['deathPlace'] = death.place
    return doc
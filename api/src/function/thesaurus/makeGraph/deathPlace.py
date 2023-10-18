def DeathPlace(deathPlace):
    place = f"""madsrdf:deathPlace [ a madsrdf:Geographic ;
                rdfs:label "{deathPlace}" ] ;"""
    return place 
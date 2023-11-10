def DeathDate(request):

    if request.deathDayDate and request.deathMonthDate and request.deathYearDate:
        date = f"{request.deathYearDate}-{request.deathMonthDate}-{request.deathDayDate}"
        deathDate = f"""madsrdf:deathDate "{date}" ;"""
        return deathDate 
    elif request.deathMonthDate and request.deathYearDate:
        date = f"{request.deathMonthDate}-{request.deathYearDate}"
        deathDate = f"""madsrdf:deathDate "{date}" ;"""
        return deathDate 
    elif request.deathYearDate:
        deathDate = f"""madsrdf:deathDate "{request.deathYearDate}" ;"""
        return deathDate 
    else:
        return ""
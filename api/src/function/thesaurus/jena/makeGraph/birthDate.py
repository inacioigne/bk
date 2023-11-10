def BirthDate(request):

    if request.birthDayDate and request.birthMonthDate and request.birthYearDate:
        date = f"{request.birthYearDate}-{request.birthMonthDate}-{request.birthDayDate}"
        birthDate = f"""madsrdf:birthDate "{date}" ;"""
        return birthDate 
    elif request.birthMonthDate and request.birthYearDate:
        date = f"{request.birthMonthDate}-{request.birthYearDate}"
        birthDate = f"""madsrdf:birthDate "{date}" ;"""
        return birthDate 
    elif request.birthYearDate:
        birthDate = f"""madsrdf:birthDate "{request.birthYearDate}" ;"""
        return birthDate 
    else:
        return ""
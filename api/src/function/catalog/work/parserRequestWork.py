def FilterElement(element):
    return element.uri != ""

def ParserRequestWork(request):
    subject = list(filter(FilterElement, request.subject))
    if len(subject) > 0:
        request.subject = subject
    else:
        request.subject = None

    return request


import httpx

headers = {
    'Content-type': 'application/json',
}
url = 'http://localhost:8983/solr/authority/schema'

json_data = {
    'replace-field': {
        'name': 'identifiersLccn',
        'type': 'string',
    },
}

response = httpx.post(url, headers=headers, json=json_data, timeout=600)
print(response.json())
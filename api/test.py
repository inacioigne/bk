# from src.schemas.settings import Settings
# from pysolr import Solr

# settings = Settings()
# solr = Solr(f'{settings.solr}/solr/authority/', timeout=10)
# solr = Solr('http://192.168.128.4:8983/solr/authority', always_commit=True, timeout=10)

from src.schemas.thesaurus.mads import SchemaMads 

a = {
    "type": "PersonalName",
    "identifiersLocal": "1",
    "identifiersLccn": "n80002329",
    "adminMetadata": {
        "status": {
            "label": "novo",
            "value": "n"
        }
    },
    "authoritativeLabel": "Machado de Assis, 1839",
    "elementList": [
        {
            "type": "FullNameElement",
            "elementValue": {
                "value": "Machado de Assis",
                "lang": ""
            }
        }
    ],
    "fullerName": "Joaquim Maria Machado",
    "birthPlace": "Rio de Janeiro (Brazil)",
    "birthDayDate": "21",
    "birthMonthDate": "06",
    "birthYearDate": "1839",
    "deathDayDate": "29",
    "deathMonthDate": "09",
    "deathYearDate": "1908",
    "hasVariant": [
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Assis, Joaquim Maria Machado de,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Assis, Machado de,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "De Assis, Joaquim Maria Machado,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "De Assis, Machado,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Machado de Assis, Joaquim Maria,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Machado de Assis, Joaquín María,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Mashado de Assiz, Zhoakin,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        },
        {
            "type": "PersonalName",
            "elementList": [
                {
                    "type": "FullNameElement",
                    "elementValue": {
                        "value": "Semana"
                    }
                },
                {
                    "type": "TermsOfAddressNameElement",
                    "elementValue": {
                        "value": "Dr.,"
                    }
                },
                {
                    "type": "DateNameElement",
                    "elementValue": {
                        "value": "1839-1908"
                    }
                }
            ]
        }
    ],
    "hasAffiliation": [
        {
            "organization": {
                "label": "Academia Brasileira de Letras",
                "uri": "http://id.loc.gov/authorities/names/n82059239"
            },
            "affiliationStart": "1897",
            "affiliationEnd": "1908"
        }
    ],
    "hasCloseExternalAuthority": [
        {
            "uri": "http://www.wikidata.org/entity/Q311145",
            "label": "Machado de Assis",
            "base": "www.wikidata.org"
        },
        {
            "uri": "http://id.worldcat.org/fast/48407",
            "label": "Machado de Assis, 1839-1908",
            "base": "id.worldcat.org"
        }
    ],
    "identifiesRWO": [
        {
            "uri": "http://id.loc.gov/rwo/agents/n80002329",
            "label": "http://id.loc.gov/rwo/agents/n80002329",
            "base": "id.loc.gov"
        },
        {
            "uri": "http://isni.org/isni/0000000121441225",
            "label": "http://isni.org/isni/0000000121441225",
            "base": "isni.org"
        },
        {
            "uri": "http://viaf.org/viaf/95151633",
            "label": "http://viaf.org/viaf/95151633",
            "base": "viaf.org"
        },
        {
            "uri": "http://www.wikidata.org/entity/Q311145",
            "label": "http://www.wikidata.org/entity/Q311145",
            "base": "www.wikidata.org"
        }
    ],
    "occupation": [
        {
            "uri": "http://id.loc.gov/authorities/subjects/sh85092863",
            "label": "Novelists",
            "base": "loc"
        },
        {
            "uri": "http://id.loc.gov/authorities/subjects/sh85103733",
            "label": "Poets",
            "base": "loc"
        },
        {
            "uri": "http://id.loc.gov/authorities/subjects/sh85039342",
            "label": "Dramatists",
            "base": "loc"
        },
        {
            "uri": "http://id.loc.gov/authorities/subjects/sh85034154",
            "label": "Critics",
            "base": "loc"
        },
        {
            "uri": "http://id.loc.gov/authorities/subjects/sh85108733",
            "label": "Public officers",
            "base": "loc"
        },
        {
            "uri": "",
            "label": "(lcsh) Bureaucrats",
            "base": "loc"
        }
    ]
}

request = SchemaMads(**a)
for i in request.hasVariant:
    v = i.model_dump()
    
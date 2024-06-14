// "use client"
import {
    Container,
    Box
} from "@mui/material";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";

// BiblioKeia Components
import FormMadsNames from "@/components/madsrdf/formMadsNames";
import BreadcrumbsBK from "@/components/nav/breadcrumbs";


const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    },
    {
        link: "/admin/authority",
        label: "Autoridades",
        icon: <BsPersonPlus fontSize="small" />,
    },
    {
        link: "/admin/authority/create",
        label: "Novo",
        icon: <BsPersonPlus fontSize="small" />,
    },
];

const defaultValues = {
    "resource": [
        {
            "type": {
                "value": "http://www.loc.gov/mads/rdf/v1#Authority",
                "label": "Authority"
            }
        },
        {
            "type": {
                "value": "http://www.loc.gov/mads/rdf/v1#PersonalName",
                "label": "PersonalName"
            }
        }
    ],
    "adminMetadata": {
        "status": {
            "value": "http://id.loc.gov/vocabulary/mstatus/n",
            "label": "Novo"
        },
        "descriptionConventions": {
            "value": "http://id.loc.gov/vocabulary/descriptionConventions/aacr",
            "label": "AACr"
        }
    },
    "isMemberOfMADSCollection": [{
        "collection":
        {
            "value": "names",
            "label": "Nomes"
        }
    }],
    "elementList": [
        {
            "elementType": {
                "value": "http://www.loc.gov/mads/rdf/v1#FullNameElement",
                "label": "FullNameElement"
            },
            "elementValue": "",
            "elementLang": {
                "value": "",
                "label": ""
            }
        }
    ],
    "birth": {
        "month": { "value": "", "label": "" }
    },
    "death": {
        "month": { "value": "", "label": "" }
    },
    "hasVariant": [
        {
            "typeVariant": {
                "value": "",
                "label": ""
            },
            "elementList": [
                {
                    "elementType": {
                        "value": "",
                        "label": ""
                    },
                    "elementValue": "",
                    "elementLang": {
                        "value": "",
                        "label": ""
                    }
                }
            ]
        }
    ],
    "hasAffiliation": [
        {
            "affiliationStart": "",
            "affiliationEnd": "",
            "authority": {
                "base": "",
                "value": "",
                "label": ""
            }
        }
    ],
    "hasCloseExternalAuthority": [
        {
            "label": "",
            "base": "",
            "uri": ""
        }
    ],
    "fieldOfActivity": [
        {
            "authority": {
                "value": "",
                "label": "",
                "base": "",
            }
        }
    ],
    "occupation": [
        {
            "authority": {
                "value": "",
                "label": "",
                "base": "",
            }
        }
    ]
}


export default function Create() {

    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={"Nome"} />
            </Box>
            <FormMadsNames authority={defaultValues} />
        </Container>
    )
}
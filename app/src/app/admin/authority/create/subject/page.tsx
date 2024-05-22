// 
import {
    Container,
    Box
} from "@mui/material";

// react Icons
import { FcHome } from "react-icons/fc";
import { BsPersonPlus } from "react-icons/bs";

// BiblioKeia Components
// import FormMadsNames from "@/components/madsrdf/formMadsNames";
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormMadsSubjects from "@/components/madsrdf/formMadsSubjects";


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
            "value": "subjects",
            "label": "Assuntos"
        }
    }],
    "elementList": [
        {
            "elementType": {
                "value": "http://www.loc.gov/mads/rdf/v1#TopicElement",
                "label": "TopicElement"
            },
            "elementValue": "",
            "elementLang": {
                "value": "",
                "label": ""
            }
        }
    ],
    "hasReciprocalAuthority": [
        {
            "uri": "",
            "type": "",
            "label": "",
            "elementLang": {
                "value": "",
                "label": ""
            },
            "base": ""
        }
    ],
    "hasBroaderAuthority": [
        {
            "uri": "",
            "type": "",
            "label": "",
            "elementLang": {
                "value": "",
                "label": ""
            },
            "base": ""
        }
    ],
    "hasNarrowerAuthority": [
        {
            "uri": "",
            "type": "",
            "label": "",
            "elementLang": {
                "value": "",
                "label": ""
            },
            "base": ""
        }
    ],
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
    "hasCloseExternalAuthority": [
        {
            "label": "",
            "base": "",
            "uri": ""
        }
    ]
}


export default function Create() {

    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths} currentPath={"Assunto"} />
            </Box>
            <FormMadsSubjects authority={defaultValues} />
        </Container>
    )
}
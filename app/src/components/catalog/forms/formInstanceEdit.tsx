"use client"
import { Box, Button, Tabs, Tab } from "@mui/material";
// React-Hook-Form
import { useFieldArray, useWatch, useForm } from "react-hook-form";
// import bibframe from "@/share/bibframe/work.json"
// Metadata
import bibframe from "@/share/bibframe/instance.json"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// BiblioKeia Components

// BiblioKeia Service
import { bkapi } from "@/services/api";
import BfField from "./bibframe/bfField";
// import BfSubField from "./bibframe/bfSubField";

// Schema
import ZodWork from "@/schema/bibframe/zodWork"
import  ZodInstance  from "@/schema/bibframe/zodInstance"
import BfErros from "./bibframe/bfErros";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Nextjs
import { useRouter } from "next/navigation";
import Link from "next/link";
import action from "@/services/catalog/actions";
import { RemoveEmptyAuthority } from "@/services/catalog/removeEmptyAuthority";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Props {
    doc: any;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// function ParserContribution(contribution: any, obj: any) {
//     if (contribution) {
//         if (Array.isArray(contribution)) {
//             const contributions = contribution.map((e: any, i: number) => {
//                 let authority = {
//                     term: {
//                         value: e.uri,
//                         label: e.label[0]
//                     },
//                     role: {
//                         value: e.role[0],
//                         label: e.roleLabel
//                     }
//                 }
//                 return authority
//             })
//             obj['contribution'] = contributions
//         } else {
//             let authority = {
//                 term: {
//                     value: contribution.uri,
//                     label: contribution.label[0]
//                 },
//                 role: {
//                     value: contribution.role[0],
//                     label: contribution.roleLabel
//                 }
//             }
//             obj['contribution'] = [authority]
//         }
//     } else {
//         let authority = {
//             term: {
//                 value: "",
//                 label: ""
//             },
//             role: {
//                 value: "",
//                 label: ""
//             }
//         }
//         obj['contribution'] = [authority]
//     }

// }

// function ParserSubject(subject: any, obj: any) {
//     if (subject) {
//         if (Array.isArray(subject)) {
//             let authority = subject.map((e: any) => {
//                 let obj = {
//                     type: e.type[0],
//                     term: {
//                         value: e.uri,
//                         label: e.label[0]
//                     },
//                     lang: e.lang
//                 }
//                 return obj
//             })
//             obj['subject'] = authority
//         } else {
//             let authority = {
//                 type: subject.type[0],
//                 term: {
//                     value: subject.uri,
//                     label: subject.label[0]
//                 },
//                 lang: subject.lang
//             }
//             obj['subject'] = [authority]

//         }
//     } else {
//         let authority = {
//             type: "Topic",
//             term: {
//                 value: "",
//                 label: ""
//             },
//             lang: ""
//         }
//         obj['subject'] = [authority]

//     }

// }


function ParserDoc(doc: any, commonTypes: any) {

    let types = doc.type.map((e: string, i: number) => {
        const [resourceType] = commonTypes.resourceType.filter((element: any) => element.value === e);
        return resourceType
    })
    // carrier
    let [c] = doc.carrier
    let [carrier] = commonTypes.carrier.filter((element: any) => element.label === c);
    // issuance
    let [i] = doc.issuance
    let [issuance] = commonTypes.issuance.filter((element: any) => element.label === i);
    // media
    let [m] = doc.media
    let [media] = commonTypes.media.filter((element: any) => element.label === m);
    // console.log(issuance)

    let obj: any = {
        adminMetadata: {
            status: {
                value: "http://id.loc.gov/vocabulary/mstatus/c",
                label: "Editado"
            },
            descriptionConventions: {
                value: "http://id.loc.gov/vocabulary/descriptionConventions/aacr",
                label: "AACr"
            }
        },
        instanceOf: {
            value: doc.instanceOf.uri
        },
        resourceType: types,
        title: {
            mainTitle: doc.mainTitle[0],
            "subtitle": ""
        },
        "variantTitle": [
            {
                "mainTitle": "",
                "subtitle": ""
            }
        ],
        "responsibilityStatement": {
            "value": ""
        },
        physicalDetails: {
            carrier: carrier,
            extent: doc.extent[0],
            issuance: issuance,
            media: media
        },
        provisionActivity: [
            {
                place: doc.publicationPlace[0],
                agent: doc.publicationAgent[0],
                date: doc.publicationDate[0].toString()
            }
        ],
        "editionStatement": {
            "value": ""
        },
        note: {
            value: ""
        },
        image: {
            cover: doc.image
        }
    }

    return obj

}

// function ParserAuthorityExclude(data: any, doc: any) {
//     let authorityExclude = new Array
//     function makeArray(authority: any) {
//         if (Array.isArray(authority)) {
//             return authority
//         } else {
//             return [authority]
//         }
//     }
//     // contribution
//     if (doc.contribution) {
//         let urisA = data.contribution.map((e: any) => e.term.value)
//         let authority = makeArray(doc.contribution).filter((e: any) => !urisA.includes(e.uri))
//         if (authority.length > 0) {
//             let autContribution = authority.map((e: any) => {
//                 return {
//                     value: e.uri,
//                     metadata: 'contributionOf'
//                 }
//             })
//             authorityExclude.push(...autContribution)
//             data['authorityExclude'] = authorityExclude
//         }
//     }
//     // subject
//     if (doc.subject) {
//         let subjectA = data.subject.map((e: any) => e.term.value)
//         let autSubject = makeArray(doc.subject).filter((e: any) => !subjectA.includes(e.uri))
//         if (autSubject.length > 0) {
//             let autSubjectExclude = autSubject.map((e: any) => {
//                 return {
//                     value: e.uri,
//                     metadata: 'subjectOf'
//                 }
//             })
//             authorityExclude.push(...autSubjectExclude)
//             data['authorityExclude'] = authorityExclude
//         }
//     }
// }

export default function FormInstanceEdit({ doc }: Props) {
    

    type SchemaCreateInstance = z.infer<typeof ZodInstance>;
    const [openBfErros, setBfErros] = useState(false);
    const [panel, setPanel] = useState(0);
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const router = useRouter();

    const handleChangePanel = (event: React.SyntheticEvent, newValue: number) => {
        setPanel(newValue);
    };

    const obj = ParserDoc(doc, bibframe.commonTypes)


    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<SchemaCreateInstance>(
        {
            resolver: zodResolver(ZodInstance),
            defaultValues: obj
        }
    );

    useEffect(() => {

        if (Object.keys(errors).length > 0) {
            setBfErros(true)
            console.log(errors)
        }
    }, [errors])

    function EditInstance(data: any) {
        setProgress(true)
        const RemovePropreites = (obj: any) => {
            Object.entries(obj).forEach(function ([chave, valor]) {
                if (valor === "") {
                    delete obj[chave]
                }
            })
        }
        const RemoveEmpty = (obj: any) => {
            Object.entries(obj).forEach(function ([chave, valor]) {
                
                if (Array.isArray(valor)) {
                    valor.forEach(element => {
                        RemovePropreites(element)
                    })
                    if (Object.keys(valor[0]).length === 0) {
                        delete obj[chave]
                    }
                } else {
                    
                    RemovePropreites(valor)
                    if (Object.keys(valor).length === 0) {
                        delete obj[chave]
                        // console.log("*", chave, valor)
                    }
                    
                }
            });
        }
        RemoveEmpty(data)

        data.adminMetadata.creationDate = doc.creationDate[0]
        let id = doc.id.split("#")[1]
        let work_id = doc.instanceOf.uri.split("/")[4]
        // console.log(work_id)
        bkapi
            .put(`/catalog/instance/edit/${id}`, data, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    console.log(response.data)
                    action()
                    setMessage("Registro editado com sucesso!")
                    router.push(`/admin/catalog/${work_id}`);
                }
            })
            .catch(function (error) {
                setTypeAlert("error")
                if (error.response.status === 409) {
                    setMessage("Este registro já existe")
                }
                console.error("ERs:", error.response);
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(EditInstance)}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={panel} onChange={handleChangePanel} aria-label="basic tabs example">
                        {bibframe.sections.map((section: any, index) => (
                            <Tab key={index} label={section.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                {bibframe.sections.map((section: any, index) => (
                    <CustomTabPanel key={index} value={panel} index={index}>
                        {section.fields.map((field: any, indexField: number) => (
                            <BfField
                                key={indexField}
                                field={field}
                                register={register}
                                control={control}
                                setValue={setValue}
                                commonTypes={bibframe.commonTypes}
                            />
                        ))}
                    </CustomTabPanel>
                ))}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Link href={"/admin/catalog"}>
                        <Button variant="outlined">
                            Cancelar
                        </Button>
                    </Link>

                    <Button variant="outlined" type="submit">
                        Salvar
                    </Button>

                </Box>

            </form>
            <BfErros openBfErros={openBfErros} setBfErros={setBfErros} errors={errors} />
        </Box>
    )
}
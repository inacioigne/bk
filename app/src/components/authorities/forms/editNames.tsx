"use client";
// MUI
import {
    Box,
    // Grid,
    Divider,
    Button,
    Typography
} from "@mui/material";

// Schema
import { schemaAuthorityDoc } from "@/schema/solr";
// import { SchemaMads } from "@/schema/mads/schemaMads"
import { ZodNames } from "@/schema/mads/OLDER-zodNames"


// Next
import Link from "next/link";

// React Icons
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

// BiblioKeia Services
import { bkapi } from "@/services/api";

// React-Hook-Form
import {
    useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// BiblioKea Components
import FormMadsNames from "@/components/authorities/forms/formMadsNames"
import ModalThesarus from "@/components/authorities/modal/tmp-modalThesarus";


interface Props {
    doc: schemaAuthorityDoc;
}

type EditAuthorityData = z.infer<typeof ZodNames>;

function ParserUri(uri: any) {
    if (uri) {

        if (Array.isArray(uri)) {
            let arr = uri.map((e: any) => {
                let obj = { uri: e.uri, label: e.label[0], base: e.base }
                return obj
            })
            return arr
        } else {

            let arr = [{ label: uri.label[0], uri: uri.uri, base: uri.base }]
            return arr
        }
    } else {
        let arr = [{ label: "", uri: "", base: "" }]
        return arr
    }
}

function ParserAffiliation(affiliation: any) {
    if (affiliation) {
        if (Array.isArray(affiliation)) {
            let arr = affiliation.map((hasAffiliation: any) => {
                let obj = {
                    organization: { label: hasAffiliation.organization[0], uri: hasAffiliation.uri },
                    affiliationStart: hasAffiliation.affiliationStart, affiliationEnd: hasAffiliation.affiliationEnd
                }
                return obj
            })
            return arr
        } else {
            let obj = {
                organization: { label: affiliation.organization[0], uri: affiliation.uri },
                affiliationStart: affiliation.affiliationStart, affiliationEnd: affiliation.affiliationEnd
            }
            return [obj]
        }
    } else {
        let arr = [{
            organization: { label: "", uri: "" },
            affiliationStart: "", affiliationEnd: ""
        }]
        return arr
    }
}

function ParserVariant(variant: any) {
    // console.log("HV:", doc.hasVariant)
    if (variant) {
        if (Array.isArray(variant)) {
            return variant
        } else {
            let arr = [variant]
            return arr

        }

    } else {
        let arr = [{
            type: "PersonalName",
            elementList: [{ type: "FullNameElement", elementValue: { value: "" } }],
        }]
        return arr
    }

}

function TransForm(doc: schemaAuthorityDoc) {
    const obj: any = {
        type: doc.type,
        elementList: [{
            type: 'FullNameElement', elementValue: {
                value: doc.authority[0],
            }
        }],
        identifiersLccn: doc.identifiersLccn && doc.identifiersLccn,
        fullerName: doc.fullerName && doc.fullerName[0],
        birthPlace: doc.birthPlace && doc.birthPlace[0],
        birthDayDate: doc.birthDayDate,
        birthMonthDate: doc.birthMonthDate,
        birthYearDate: doc.birthYearDate,
        deathPlace: doc.deathPlace && doc.deathPlace[0],
        deathDayDate: doc.deathDayDate,
        deathMonthDate: doc.deathMonthDate,
        deathYearDate: doc.deathYearDate,
        hasVariant: ParserVariant(doc.hasVariant),
        hasAffiliation: ParserAffiliation(doc.hasAffiliation),
        hasCloseExternalAuthority: ParserUri(doc.hasCloseExternalAuthority),
        identifiesRWO: ParserUri(doc.identifiesRWO),
        occupation: ParserUri(doc.occupation),
        fieldOfActivity: ParserUri(doc.fieldOfActivity),
        imagem: doc.imagem
    }
    return obj
}

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Nextjs
import { useRouter } from "next/navigation";

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"
import { useState } from "react";


export default function EditNames({ doc }: Props) {

    const [open, setOpen] = useState(false);
    const [field, setField] = useState("");

    const router = useRouter();
    const { setProgress } = useProgress();

    const { setMessage } = useAlert();

    const defaultValues = TransForm(doc)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<EditAuthorityData>({
        resolver: zodResolver(ZodNames),
        defaultValues
    });
    // console.log("ER:", errors, defaultValues)

    function editAuthority(data: any) {
                // console.log("R:", data)

        setProgress(true)
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        };

        let obj = {
            identifiersLocal: doc.id,
            adminMetadata: {
                creationDate: doc.creationDate,
                status: {
                    label: "Editado",
                    value: "e"
                },
            },
            isMemberOfMADSCollection: "names",
            authoritativeLabel: data.birthYearDate ?
                `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
        }

        let formData = ParserData(data)
        const request = { ...obj, ...formData };

        bkapi.put("thesarus/edit/", request, {
            headers: headers,
        })
            .then(function (response) {
                if (response.status === 200) {
                    setMessage("Registro criado com sucesso!")
                    router.push(`/admin/authority/names/${doc.id}`);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setProgress(false)
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit(editAuthority)}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h5" gutterBottom>
                        Editar - Nomes
                    </Typography>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                        <Link href="/admin/authority/names">
                            <Button
                                sx={{ textTransform: "none" }}
                                variant="outlined"
                                startIcon={<FcCancel />}
                            >
                                Cancelar
                            </Button>
                        </Link>
                        <Box>
                            <Button
                                type="submit"
                                sx={{ textTransform: "none" }}
                                variant="outlined"
                                startIcon={<IoIosSave />}
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Divider />
                <FormMadsNames
                    control={control}
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    setValue={setValue} 
                    setOpen={setOpen} 
                    setField={setField} />
            </form>
            <ModalThesarus setOpen={setOpen} open={open} defaultValues={defaultValues} field={field} setValue={setValue}/>

        </>
    )
}
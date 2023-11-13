"use client";
// MUI
import {
    Box,
    Grid,
    Divider,
    Button,
    Typography,
    Paper,
    TextField,
    InputLabel,
    IconButton,
    FormControl,
    Select,
    MenuItem,
} from "@mui/material";

// Schema
import { schemaAuthorityDoc } from "@/schema/solr";
// import { SchemaMads } from "@/schema/mads/schemaMads"
import { ZodSubjects } from "@/schema/mads/zodSubject"


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
// import FormMads from "@/components/forms/formMadsNames"
import FormMadsSubject from "@/components/thesaurus/forms/formMadsSubject"

interface Props {
    doc: schemaAuthorityDoc;
}

type EditAuthorityData = z.infer<typeof ZodSubjects>;

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
            type: "TopicElement", elementValue: {
                value: doc.authority[0],
                lang: doc?.lang
            }
        }],
        hasVariant: ParserVariant(doc.hasVariant),
        hasReciprocalAuthority: ParserUri(doc.hasReciprocalAuthority),
        hasBroaderAuthority: ParserUri(doc.hasBroaderAuthority),
        hasNarrowerAuthority: ParserUri(doc.hasNarrowerAuthority),
        hasCloseExternalAuthority: ParserUri(doc.hasCloseExternalAuthority)
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

export default function EditSubjects({ doc }: Props) {
    // console.log("D: ", doc)

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
        resolver: zodResolver(ZodSubjects),
        defaultValues
    });
    // console.log("ER:", errors)

    function editAuthority(data: any) {
        setProgress(true)
        const headers = {
            accept: "application/json",
            "Content-Type": "application/json",
        };

        let obj = {
            type: doc.type,
            identifiersLocal: doc.id,
            identifiersLccn: doc?.identifiersLccn,
            adminMetadata: {
                creationDate: doc.creationDate,
                status: {
                    label: "editado",
                    value: "e"
                },
            },
            isMemberOfMADSCollection: doc.isMemberOfMADSCollection,
            authoritativeLabel: data.birthYearDate ?
                `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
        }

        let formData = ParserData(data)
        const request = { ...obj, ...formData };
        // console.log("R:", request)

        bkapi.put("thesarus/edit/", request, {
            headers: headers,
        })
            .then(function (response) {
                if (response.status === 200) {
                    // console.log(response);
                    setMessage("Registro criado com sucesso!")
                    router.push(`/admin/authority/subjects/${doc.id}`);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setProgress(false)
                //   setOpenSnack(true)
                //   setDoc(null)
            });
    }

    return (
        <form onSubmit={handleSubmit(editAuthority)}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" gutterBottom>
                    Editar - Assuntos
                </Typography>

                <Box sx={{ display: "flex", gap: "5px" }}>
                    <Link href={`/admin/authority/${doc.id}`}>
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
            <FormMadsSubject
                control={control}
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue} />
        </form>
    )
}
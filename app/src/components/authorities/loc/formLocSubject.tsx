import { Box, Divider, Typography, Button } from "@mui/material";

// BiblioKeia Components
import FormMadsSubject from "@/components/authorities/forms/formMadsSubject"
import ModalSubjects from "@/components/authorities/modal/tmp-modalThesarus"

// React-Hook-Form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { ZodSubjects } from "@/schema/mads/zodSubject"
import { SchemaMads } from "@/schema/mads/schemaMads"

// MUI Icons
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"
import { bkapi } from "@/services/api";

// React Hooks
import { useEffect, useState } from "react";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Nextjs
import { useRouter } from 'next/navigation'
// import Link from 'next/link'

type SchemaCreateAuthority = z.infer<typeof ZodSubjects>;

interface Props {
    hit: SchemaMads | null;
    setForm: Function;
}

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

const isMemberOfMADSCollection = {
    Geographic: 'place',
    Topic: 'subject'
}

function GetValue(hit: any) {

    let elementList = hit.elementList[0]
    let uriDefault = [{
        uri: "",
        label: "",
        base: ""
    }]

    const obj: any = {
        type: hit.type,
        elementList: [{
            type: elementList.type, elementValue: {
                value: elementList.elementValue.value,
                lang: elementList.elementValue.lang
            }
        }],
        hasVariant: hit.hasVariant ? hit.hasVariant : [{
            type: "",
            elementList: [{ type: '', elementValue: { value: "" } }]

        }],
        identifiersLccn: hit.identifiersLccn,
        hasCloseExternalAuthority: hit.hasCloseExternalAuthority ? hit.hasCloseExternalAuthority : uriDefault,
        hasBroaderAuthority: hit.hasBroaderAuthority ? hit.hasBroaderAuthority : uriDefault,
        hasNarrowerAuthority: hit.hasNarrowerAuthority ? hit.hasNarrowerAuthority : uriDefault,
        hasReciprocalAuthority: hit.hasReciprocalAuthority ? hit.hasReciprocalAuthority : uriDefault,
    }
    return obj
}

export default function FormLocSubject({ hit, setForm }: Props) {
    const router = useRouter()
    const { setProgress } = useProgress();
    const [id, setId] = useState(null);
    const { setOpenSnack, setMessage } = useAlert();
    const [open, setOpen] = useState(false);
    const [field, setField] = useState("");

    // useEffect(() => {
    //     bkapi
    //         .get(`/thesarus/next_id`)
    //         .then(function (response) {
    //             setId(response.data);

    //             // console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             // manipula erros da requisição
    //             console.error(error);
    //         })
    //         .finally(function () {
    //             // setProgress(false)
    //         });
    // }, [String(id)]);

    let defaultValues = GetValue(hit)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<SchemaCreateAuthority>({
        resolver: zodResolver(ZodSubjects),
        defaultValues,
    });

    // console.log("ER:", errors)
    function createAuthority(data: any) {
        let formData = ParserData(data)
        let obj = {
            type: hit?.type,
            // identifiersLocal: String(id),
            identifiersLccn: hit?.identifiersLccn,
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isMemberOfMADSCollection: isMemberOfMADSCollection[`${hit.type}`],
            authoritativeLabel: data.birthYearDate ?
                `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
        }
        let request = { ...obj, ...formData };
        // console.log("CR:", request)
        setProgress(true)
        bkapi.post("/thesarus/create", request, {
            headers: headers,
        })
            .then(function (response) {
                if (response.status === 201) {
                    setMessage("Registro criado com sucesso!")
                    router.push(`/admin/authority/subjects/${response.data.id}`);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });
    }

    return (
        <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(createAuthority)}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Autoridades - Assuntos
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            startIcon={<FcCancel />}
                            onClick={() => { setForm(false) }}
                        >
                            Cancelar
                        </Button>
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
                <Divider />
                <FormMadsSubject
                    control={control}
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    setValue={setValue} setOpen={setOpen} setField={setField} />
            </form>
            <ModalSubjects setOpen={setOpen} open={open} defaultValues={defaultValues} field={field} setValue={setValue}/>

        </Box>
    );
}
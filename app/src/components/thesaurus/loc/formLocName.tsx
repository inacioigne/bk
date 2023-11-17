import { Box, Divider, Typography, Button } from "@mui/material";

// BiblioKeia Components
import FormMadsNames from "@/components/thesaurus/forms/formMadsNames"

// React-Hook-Form
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { ZodNames } from "@/schema/mads/zodNames";
import { schemaMads } from "@/schema/authority";

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

type SchemaCreateAuthority = z.infer<typeof ZodNames>;

interface Props {
    hit: schemaMads | null;
    setForm: Function;
}

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

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
        identifiersLccn: hit.identifiersLccn,
        fullerName: hit.fullerName,
        birthPlace: hit.birthPlace,
        birthDayDate: hit.birthDayDate,
        birthMonthDate: hit.birthMonthDate,
        birthYearDate: hit.birthYearDate,
        deathPlace: hit.deathPlace,
        deathDayDate: hit.deathDayDate,
        deathMonthDate: hit.deathMonthDate,
        deathYearDate: hit.deathYearDate,
        hasVariant: hit.hasVariant ? hit.hasVariant : [{
            type: "PersonalName",
            elementList: [{ type: 'FullNameElement', elementValue: { value: "" } }]

        }],
        hasAffiliation: hit.hasAffiliation ? hit.hasAffiliation : [{
            organization: { label: "", uri: "" },
            affiliationStart: "",
            affiliationEnd: ""
        }],
        occupation: hit.occupation ? hit.occupation : uriDefault,
        fieldOfActivity: hit.fieldOfActivity ? hit.fieldOfActivity : uriDefault,
        identifiesRWO: hit.identifiesRWO ? hit.identifiesRWO : uriDefault,
        hasCloseExternalAuthority: hit.hasCloseExternalAuthority ? hit.hasCloseExternalAuthority : uriDefault,
        hasBroaderAuthority: hit.hasBroaderAuthority
    }
    // console.log("loc", hit);
    return obj
}

export default function FormLocName({ hit, setForm }: Props) {
    // console.log("LOC:", hit)
    const router = useRouter()
    const { setProgress } = useProgress();
    const [id, setId] = useState(null);
    const { setOpenSnack,
        setMessage,
    } = useAlert();

    useEffect(() => {
        bkapi
            .get(`/thesarus/next_id`)
            .then(function (response) {
                setId(response.data);
                // console.log(response.data);
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .finally(function () {
                // setProgress(false)
            });
    }, [String(id)]);

    let defaultValues = GetValue(hit)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<SchemaCreateAuthority>({
        resolver: zodResolver(ZodNames),
        defaultValues,
    });

    // console.log(errors) 
    function createAuthority(data: any) {
        let formData = ParserData(data)
        let obj = {
            type: hit?.type,
            identifiersLocal: String(id),
            identifiersLccn: hit?.identifiersLccn,
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isMemberOfMADSCollection: 'names',
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
                    router.push(`/admin/authority/names/${response.data.id}`);
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
                        Criar Autoridades - Nomes
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
                <FormMadsNames
                    control={control}
                    register={register}
                    errors={errors}
                    getValues={getValues}
                    setValue={setValue} />
            </form>
        </Box>
    );
}
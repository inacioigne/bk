import {
    Box,
    Divider,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
} from "@mui/material";

// BiblioKeia Components
// import FormElementList from "@/components/madsrdf/forms/formElementList";
// import FormFullerName from "@/components/madsrdf/forms/formFullerName"
// import FormBirth from "@/components/madsrdf/forms/birth"
// import FormDeath from "@/components/madsrdf/forms/death"
// import FormVariant from "@/components/madsrdf/forms/formVariant"
// import FormAffiliation from "@/components/madsrdf/forms/formAffiliation"
// import FormOccupation from "@/components/madsrdf/forms/formOccupation"
// import FormFieldOfActivity from "@/components/madsrdf/forms/formFieldOfActivity"
// import FormRWO from "@/components/madsrdf/forms/formRWO"
// import FormHCEA from "@/components/madsrdf/forms/formHCEA"

import FormMads from "@/components/forms/formMads"


// React-Hook-Form
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { MadsSchema } from "@/schema/authority/madsSchema";
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
import Link from 'next/link'

type SchemaCreateAuthority = z.infer<typeof MadsSchema>;

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
    }
    // console.log("loc", hit);
    return obj
}

export default function FormLocCreate({ hit, setForm }: Props) {
    const router = useRouter()

    const [id, setId] = useState(null);
    const {
        openSnack,
        setOpenSnack,
        message,
        setMessage,
        typeAlert,
        setTypeAlert,
    } = useAlert();

    useEffect(() => {
        bkapi
            .get(`/thesarus/next_id`)
            .then(function (response) {
                setId(response.data);

                console.log(response.data);
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
        resolver: zodResolver(MadsSchema),
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
            authoritativeLabel: data.birthYearDate ?
                `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
        }
        let request = { ...obj, ...formData };
        // console.log(request)
        bkapi
            .post("/thesarus/create", request, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    setMessage("Registro criado com sucesso!")
                    router.push(`/admin/authority/${response.data.id}`);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                // setProgress(false)
                setOpenSnack(true)
                //   setDoc(null)
            });
        // console.log(obj)

    }

    return (
        <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(createAuthority)}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h4" gutterBottom>
                        Criar Autoridades
                    </Typography>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center"}}>
                        <Link href={"/admin/authority/importation/loc"}>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            startIcon={<FcCancel />}
                        >
                            Cancelar
                        </Button>
                        </Link>
                        
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
                <FormMads 
                control={control}
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue} />
                {/* <Paper sx={{ p: "15px", mt: "20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Autoridade
                            </Typography>
                        </Grid>
                        <FormElementList
                            control={control}
                            register={register}
                            error={errors.elementList}
                        />
                        <Grid item xs={5}>
                            <FormFullerName register={register} />
                        </Grid>
                        <FormBirth register={register} control={control} />
                        <FormDeath register={register} control={control} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Variantes do nome
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormVariant control={control} register={register} getValues={getValues} setValue={setValue} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Afiliação
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormAffiliation control={control} register={register} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ocupações
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormOccupation control={control} register={register} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Campos de atividade
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormFieldOfActivity control={control} register={register} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Identificadores
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormRWO control={control} register={register} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Ocorrências em outra bases
                            </Typography>
                            <Divider />
                        </Grid>
                        <FormHCEA control={control} register={register} />
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Imagem
                            </Typography>
                            <Divider />
                            <TextField
                                fullWidth
                                size="small"
                                label="Imagem"
                                variant="outlined"
                                {...register("imagem")}
                            />
                        </Grid>
                    </Grid>
                </Paper> */}
            </form>
        </Box>
    );
}
import { Box, Button, Tabs, Tab } from "@mui/material";
import mads from "@/share/mads/madsSubjects.json"
import { useEffect, useState } from "react";
import BfField from "../catalog/forms/bibframe/bfField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ZodMadsSubjects from "@/schema/mads/zodSubject";
import Link from "next/link";
import { bkapi } from "@/services/api";
import { headers } from "@/share/acepts";
import { useAlert } from "@/providers/alert";
import { useProgress } from "@/providers/progress";
import BfErros from "../catalog/forms/bibframe/bfErros";
import { useRouter } from 'next/navigation'

interface Props {
    authority: any | null;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
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

export default function FormMadsSubjects(
    { authority }: Props
) {
    console.log("authority", authority)
    const router = useRouter()
    const [panel, setPanel] = useState(0);
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const { setProgress } = useProgress();
    type SchemaCreateMads = z.infer<typeof ZodMadsSubjects>;
    const [openBfErros, setBfErros] = useState(false);

    const handleChangePanel = (event: React.SyntheticEvent, newValue: number) => {
        setPanel(newValue);
    };
    const defaultValues = authority ? authority : mads.defaultValues
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<SchemaCreateMads>(
        {
            resolver: zodResolver(ZodMadsSubjects),
            defaultValues: defaultValues
        }
    );

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setBfErros(true)
            console.log("er", errors)
        }
    }, [errors])

    function CreateAuthority(data: any) {

        if (authority) {
            data['identifiersLccn'] = authority.identifiersLccn
        }

        setProgress(true)
        const RemovePropreites = (obj: any) => {

            Object.entries(obj).forEach(function ([chave, valor]) {

                if (typeof valor === 'object') {
                    RemovePropreites(valor)
                    if (Object.keys(valor).length === 0) {
                        delete obj[chave]
                    }
                }
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
                    }
                }
            });
        }
        RemoveEmpty(data)
        console.log("Dt", data)
        bkapi
            .post("/thesarus/create", data, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    setTypeAlert("success")
                    setMessage("Registro criado com sucesso!")
                    console.log(response.data)
                    router.push(`/admin/authority/${response.data.id}`);
                }
            })
            .catch(function (error) {
                console.error("ERs:", error);
                setTypeAlert("error")
                if (error.response.status === 409) {
                    setMessage("Este registro já existe")
                }
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });
    }

    return (
        <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(CreateAuthority)}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={panel} onChange={handleChangePanel} aria-label="basic tabs example">
                        {mads.sections.map((section: any, index) => (
                            <Tab key={index} label={section.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                </Box>
                {mads.sections.map((section: any, index) => (
                    <CustomTabPanel key={index} value={panel} index={index}>
                        {section.fields.map((field: any, indexField: number) => (
                            <BfField
                                key={indexField}
                                field={field}
                                register={register}
                                control={control}
                                setValue={setValue}
                                commonTypes={mads.commonTypes}
                            />
                        ))}
                    </CustomTabPanel>
                ))}
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, paddingBottom: 2 }}>
                    <Link href={"/admin/authority"}>
                        <Button variant="outlined" size="small">
                            Cancelar
                        </Button>
                    </Link>
                    <Button variant="outlined" type="submit" size="small">
                        Salvar
                    </Button>
                </Box>
            </form>
            <BfErros openBfErros={openBfErros} setBfErros={setBfErros} errors={errors} />
        </Box>
    )
}
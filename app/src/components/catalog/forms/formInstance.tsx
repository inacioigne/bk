"use client"
import { Box, Button, Tabs, Tab } from "@mui/material";
// React-Hook-Form
import { useFieldArray, useWatch, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

// BiblioKeia Components

// BiblioKeia Service
import { bkapi } from "@/services/api";
import BfField from "./bibframe/bfField";

// Schema
// import  ZodInstance  from "@/schema/bibframe/zodInstance"
import ZodInstance from "@/lib/resolvers/zodInstance";
import BfErros from "./bibframe/bfErros";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Nextjs
import { useRouter } from "next/navigation";

// Metadata
import bibframe from "@/share/bibframe/instance.json"
import action from "@/services/catalog/actions";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    defaultValues: any;
}

interface Props {
    defaultValues: any;
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

export default function FormInstance({ defaultValues }: Props) {
    // console.log(defaultValues)

    type SchemaCreateInstance = z.infer<typeof ZodInstance>;
    const [openBfErros, setBfErros] = useState(false);
    const [panel, setPanel] = useState(0);
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const router = useRouter();

    const handleChangePanel = (event: React.SyntheticEvent, newValue: number) => {
        setPanel(newValue);
    };

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
            defaultValues: defaultValues
        }
    );

    useEffect(() => {

        if (Object.keys(errors).length > 0) {
            console.log("E:", errors)
            setBfErros(true)
        }
    }, [errors])

    function CreateWork(data: any) {
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
                        // console.log(chave, valor)
                        delete obj[chave]
                    } 
                }
            });
        }
        RemoveEmpty(data)
        // console.log("IN:", data)
    
        bkapi
            .post("/catalog/instance/create", data, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    setTypeAlert("success")
                    setMessage("Registro criado com sucesso!")
                    let uri = data.instanceOf.value.split("/")
                    let id = uri[uri.length - 1]
                    action()
                    router.push(`/admin/catalog/${id}`);
                }
            })
            .catch(function (error) {
                setTypeAlert("error")
                if (error.response.status === 409) {                    
                    setMessage("Este registro já existe")
                } else {
                    setMessage(error.response.statusText)
                    console.error("ER:", error.response);
                }
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(CreateWork)}>
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
                    <Button variant="outlined">
                        Cancelar
                    </Button>
                    <Button variant="outlined" type="submit">
                        Salvar
                    </Button>

                </Box>

            </form>
            <BfErros openBfErros={openBfErros} setBfErros={setBfErros} errors={errors} />
        </Box>
    )
}
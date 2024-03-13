// "use client"
import { Box, Typography, Tabs, Tab } from "@mui/material";
// React-Hook-Form
import { useFieldArray, useWatch, useForm } from "react-hook-form";
import bibframe from "@/share/bibframe/work.json"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BibframeField from "./bibframe/bibframeField";
import { useEffect, useState } from "react";

// BiblioKeia Components
import ModalThesarusNames from "@/components/thesaurus/modal/modalThesarus";
import { typeMetadata } from "@/schema/fieldMetadata";

// BiblioKeia Service
import { bkapi } from "@/services/api";
import BfField from "./bibframe/bfField";
import BfSubField from "./bibframe/bfSubField";

// Schema
import { ZodWork } from "@/schema/bibframe/zodWork"
import BfErros from "./bibframe/bfErros";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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



export default function FormWork() {
    // const [thesaurus, setThesaurus] = useState({name:"", open: false});
    // const [open, setOpen] = useState(false);
    // const [field, setField] = useState("");
    // console.log("F: ", bibframe.fields)
    type SchemaCreateWork = z.infer<typeof ZodWork>;

    const [openBfErros, setBfErros] = useState(false);

    const [panel, setPanel] = useState(0);
    const [messages, setMessages] = useState(null);

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
    } = useForm<SchemaCreateWork>(
        {
            resolver: zodResolver(ZodWork),
            defaultValues: bibframe.defaultValues
        }
    );

     useEffect(() => {

        if (Object.keys(errors).length > 0) {
            setBfErros(true)
        }

     }, [errors])

    function CreateWork(data: any) {
        let obj = {
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isPartOf: `https://bibliokeia.com/catalog/work`,
        }
        const request = { ...obj, ...data };
        console.log("R", data)
        // bkapi
        //     .post("/catalog/work/create", request, {
        //         headers: headers,
        //     })
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             console.log("RS", response.data);
        //             request.identifiersLocal = response.data.id
        //             // setWork(request)
        //             // setOpenInstance(true)

        //             // setMessage("Registro criado com sucesso!")
        //             //   router.push(`/admin/authority/names/${response.data.id}`);
        //         }
        //     })
        //     .catch(function (error) {
        //         if (error.response.status === 409) {
        //             // setTypeAlert("error")
        //             // setMessage("Este registro já existe")
        //             console.error("ER:", error);
        //         }
        //     })
        //     .finally(function () {
        //         // setProgress(false)
        //         // setOpenSnack(true)
        //     });
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
                            />
                        ))}
                    </CustomTabPanel>
                ))}
                <button>SALVAR</button>
            </form>
            <BfErros openBfErros={openBfErros} setBfErros={setBfErros} errors={errors} />
        </Box>
    )
}
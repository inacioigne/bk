import { Box, Divider, Typography, Button, Tabs, Tab } from "@mui/material";
import mads from "@/share/mads/mads.json"
import { useState } from "react";
import BfField from "../catalog/forms/bibframe/bfField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import ZodWork from "@/schema/bibframe/zodWork";
import { z } from "zod";
import ZodMads from "@/schema/mads/zodMads";
import Link from "next/link";
import { bkapi } from "@/services/api";
import { headers } from "@/share/acepts";
import { useAlert } from "@/providers/alert";
import { useProgress } from "@/providers/progress";

interface Props {
    authority: any | null;
    // setForm: Function;
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

export default function FormMads(
    { authority }: Props
) {
    const [panel, setPanel] = useState(0);
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const { setProgress } = useProgress();
    type SchemaCreateMads = z.infer<typeof ZodMads>;

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
            resolver: zodResolver(ZodMads),
            defaultValues: defaultValues
        }
    );
    console.log("er", errors)
    function CreateAuthority(data: any) {

        if (authority) {
            data['identifiersLccn'] = authority.identifiersLccn
            console.log("Dt", data)

        }

        setProgress(true)
        bkapi
            .post("/thesarus/create", data, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    setTypeAlert("success")
                    setMessage("Registro criado com sucesso!")
                    console.log(response.data)
                    // router.push(`/admin/catalog/${response.data.id}`);
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
        <Box sx={{ width: "100%" }}>
            <form onSubmit={handleSubmit(CreateAuthority)}
            >
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


        </Box>
    )

}
import { Box, Divider, Typography, Button, Tabs, Tab } from "@mui/material";
import mads from "@/share/mads/mads.json"
import { useState } from "react";
import BfField from "../catalog/forms/bibframe/bfField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ZodWork from "@/schema/bibframe/zodWork";
import { z } from "zod";
import ZodMads from "@/schema/mads/zodMads";

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
            resolver: zodResolver(ZodWork),
            defaultValues: defaultValues
        }
    );
    console.log(authority, mads.defaultValues)
    return (
        <Box sx={{ width: "100%" }}>
            <form //onSubmit={handleSubmit(CreateWork)} 
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

            </form>


        </Box>
    )

}
import {
    Box, Accordion, AccordionSummary, Typography, Button, IconButton, Grid
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import BfSubField from "./bfSubField";

// React Icons
import { FaTrashCan } from "react-icons/fa6";

import { useFieldArray, useWatch, Controller } from "react-hook-form";

interface Props {
    field: any;
    register: Function;
    control: any;
    setValue: Function;

}

export default function BfField(
    { field, register, control, setValue }: Props
) {
    // console.log("FS:", field)

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: `${field.name}`,
    });

    const addField = () => {

        const objAppend = field.subfields.reduce((obj: object, item: object) => {
            obj[item.name] = ""
            return obj
        }, {})
        // console.log("F", field.subfields, objAppend)
        // append(objAppend);
        // { role: { value: "" }}
        append({
            role: { value: "" },
            term: { value: "" },
            value: ""
        })
    };

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="subtitle1" >
                    {field.label}
                </Typography>
            </AccordionSummary>
            <Box sx={{
                p: 3,
                display: "flex", flexDirection: "column", gap: 2
            }}>
                {field.repeatable ? (
                    fields.map((item, index) => (
                        <Box key={index} sx={{ display: "flex", gap: 2, }}>
                            <Grid container spacing={2}>
                                {field.subfields.map((subfield: any, i: number) => (
                                    <Grid item key={i} xs={subfield.width} >
                                        <BfSubField
                                            name={field.name}
                                            index={index}
                                            subfield={subfield}
                                            register={register}
                                            control={control}
                                            setValue={setValue}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            {fields.length > 1 &&
                                <IconButton onClick={() => {
                                    remove(index);
                                }}> <FaTrashCan /></IconButton>}
                        </Box>
                    ))
                ) : (
                    <Box sx={{ display: "flex", gap: 2, }}>
                        <Grid container spacing={2}>
                            {field.subfields.map((subfield: any, i: number) => (
                                <Grid item key={i} xs={subfield.width} >
                                    <BfSubField
                                        name={field.name}
                                        index={false}
                                        subfield={subfield}
                                        register={register}
                                        control={control}
                                        setValue={setValue}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
                <Box>
                    {field.repeatable &&
                        <Button variant="outlined" sx={{ textTransform: "none" }}
                            onClick={addField}
                        >Adicionar</Button>
                    }
                </Box>
            </Box>


        </Accordion>



    )

}
import {
    Box, Accordion, AccordionSummary, Typography, Button, IconButton, Grid
} from "@mui/material";
import { blueGrey } from '@mui/material/colors';
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
    commonTypes: any

}

const appendField: any = {
    contribution: {
        role: { value: "" },
        term: { value: "" },
        value: ""
    },
    subject: {
        type: "Topic",
        term: { value: "" },
        lang: ""
    },
    variant: {
        typeVariant: 'PersonalName',
        elementList: [
            {
                type: "http://www.loc.gov/mads/rdf/v1#FullNameElement",
                value: "",
                lang: ""
            }
        ]
    }
}

export default function BfField(
    { field, register, control, setValue, commonTypes }: Props
) {
    // console.log(field)

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: `${field.name}`,
    });

    const addField = () => {
        let appendValue = appendField[`${field.name}`] ? appendField[`${field.name}`] : { value: "" }
        append(appendValue)
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
                        <Box
                            key={index}
                            sx={{
                                display: "flex", gap: 2, 
                                alignItems: 'center',
                                bgcolor: blueGrey[50],
                                borderRadius: 2,
                                padding: 3
                            }}

                        >
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
                                            commonType={commonTypes[`${subfield.commonType}`]}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                            <Box>
                                {fields.length > 1 &&
                                    <IconButton onClick={() => {
                                        remove(index);
                                    }}> <FaTrashCan />
                                    </IconButton>
                                }

                            </Box>

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
                                        commonType={commonTypes[`${subfield.commonType}`]}
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
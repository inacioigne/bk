// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails
} from "@mui/material";

import { IoIosArrowDown } from "react-icons/io";


// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";

interface Props {
    control: any;
    register: any
}

export default function FormRWO({ control, register }: Props) {
    const {
        fields,
        append: appendRWO,
        remove: removeRWO,
    } = useFieldArray({
        control,
        name: "identifiesRWO",
    });
    const addRWO = () => {
        appendRWO({
            uri: "",
            label: "",
            base: ""
        });
    };
    return (
        <Accordion expanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="h6" gutterBottom>
                Identificadores:
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                pt: "20px"
            }}>
                {fields.map((field, index) => (
                    <Fragment key={index}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                label="Nome"
                                variant="outlined"
                                size="small"
                                {...register(`identifiesRWO.${index}.label`)}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="uri"
                                variant="outlined"
                                size="small"
                                {...register(`identifiesRWO.${index}.uri`)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                fullWidth
                                label="base"
                                variant="outlined"
                                size="small"
                                {...register(`identifiesRWO.${index}.base`)}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    aria-label="add"
                                    onClick={addRWO}
                                    color="primary"
                                >
                                    <IoAddOutline />
                                </IconButton>
                                <IconButton
                                    aria-label="add"
                                    onClick={() => {
                                        removeRWO(index);
                                    }}
                                    color="primary"
                                >
                                    <IoRemove />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Fragment>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}
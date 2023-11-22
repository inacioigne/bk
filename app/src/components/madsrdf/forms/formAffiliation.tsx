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

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";


interface Props {
    control: any;
    register: any
}

// React-Hook-Form
import { useFieldArray } from "react-hook-form";

// React
import { Fragment } from "react";

export default function FormAffiliation({ control, register }: Props) {

    const {
        fields,
        append: appendhasAffiliation,
        remove: removehasAffiliation,
    } = useFieldArray({
        control,
        name: "hasAffiliation",
    });

    const addAffiliation = () => {
        appendhasAffiliation({
            organization: { label: "", uri: "" },
            affiliationStart: "",
            affiliationEnd: ""
        })
    };

    return (
        <Accordion expanded={true}>
            <AccordionSummary expandIcon={<IoIosArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ borderBottom: "1px solid gray" }}
            >
                <Typography variant="h6" gutterBottom>
                    Afiliação
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{
                display: "flex",
                flexWrap: "wrap"
            }}>
                {fields.map((field, index) => (
                    <Fragment key={index}>
                        <Grid container spacing={2} sx={{ m: "10px" }}>
                            <Grid item xs={6}>
                                <Box sx={{ display: "flex", gap: "10px" }}>
                                    <TextField
                                        fullWidth
                                        label="Organização"
                                        variant="outlined"
                                        size="small"
                                        {...register(`hasAffiliation.${index}.organization.label`)}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Url"
                                        variant="outlined"
                                        size="small"
                                        {...register(`hasAffiliation.${index}.organization.uri`)}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    label="Início do vínculo"
                                    variant="outlined"
                                    size="small"
                                    {...register(`hasAffiliation.${index}.affiliationStart`)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    fullWidth
                                    label="Fim do vínculo"
                                    variant="outlined"
                                    size="small"
                                    {...register(`hasAffiliation.${index}.affiliationEnd`)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box sx={{ display: "flex", alignItems: "flex-start" }}>

                                    <IconButton
                                        aria-label="add"
                                        onClick={addAffiliation}
                                        color="primary"
                                    >
                                        <IoAddOutline />
                                    </IconButton>
                                    <IconButton
                                        aria-label="add"
                                        onClick={() => {
                                            removehasAffiliation(index);
                                        }}
                                        color="primary"
                                    >
                                        <IoRemove />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Fragment>
                ))}
            </AccordionDetails>
        </Accordion>
    )

}
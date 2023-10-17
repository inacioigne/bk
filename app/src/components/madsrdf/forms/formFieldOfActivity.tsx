// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton
} from "@mui/material";

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

export default function FormFieldOfActivity({ control, register }: Props) {
    const {
        fields: fieldsFieldOfActivity,
        append: appendFieldOfActivity,
        remove: removeFieldOfActivity,
    } = useFieldArray({
        control,
        name: "fieldOfActivity",
    });
    const addFieldOfActivity = () => {
        appendFieldOfActivity({
            uri: "",
            label: "",
            base: ""
        });
    };
    return (
        <>
            {fieldsFieldOfActivity.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            size="small"
                            {...register(`fieldOfActivity.${index}.label`)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            fullWidth
                            label="uri"
                            variant="outlined"
                            size="small"
                            {...register(`fieldOfActivity.${index}.uri`)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            label="base"
                            variant="outlined"
                            size="small"
                            {...register(`fieldOfActivity.${index}.base`)}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                aria-label="add"
                                onClick={addFieldOfActivity}
                                color="primary"
                            >
                                <IoAddOutline />
                            </IconButton>
                            <IconButton
                                aria-label="add"
                                onClick={() => {
                                    removeFieldOfActivity(index);
                                }}
                                color="primary"
                            >
                                <IoRemove />
                            </IconButton>
                        </Box>
                    </Grid>
                </Fragment>
            ))}

        </>
    )
}
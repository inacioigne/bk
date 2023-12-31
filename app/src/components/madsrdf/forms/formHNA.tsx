// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    InputAdornment,
    Chip,
    Avatar,
    Accordion,
    AccordionSummary,
    Typography,
    AccordionDetails
} from "@mui/material";

// React-Hook-Form
import { useFieldArray, useWatch } from "react-hook-form";

// React
import { Fragment } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { TiLockClosedOutline } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
    control: any;
    register: any;
    setOpen: Function;
    setField: Function
}

export default function FormHNA({ control, register, setOpen, setField }: Props) {
    const {
        fields,
        append,
        remove
    } = useFieldArray({
        control,
        name: "hasNarrowerAuthority",
    });
    const addField = () => {
        append({
            uri: "",
            label: "",
            base: ""
        });
    };

    const watchFields = useWatch({
        control,
        name: "hasNarrowerAuthority"
    });

    return (
        <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<IoIosArrowDown />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderBottom: "1px solid gray" }}
        >
          <Typography variant="h6" gutterBottom>
          Termo Específico
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{
          display: "flex",
          flexWrap: "wrap"
        }}>
            {fields.map((field, index) => (
                <Fragment key={index}>
                    <Grid item xs={4}>
                    <TextField
                            fullWidth
                            disabled={true}
                            variant="standard"
                            label="Termo geral"
                            size="small"
                            {...register(`hasNarrowerAuthority.${index}.label`)}
                            inputProps={{
                                style: { opacity: 0 },

                            }}
                            InputProps={
                                watchFields[index]?.label === "" ? {
                                    endAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setOpen(true)
                                                setField(`hasNarrowerAuthority.${index}`)
                                            }}
                                        >
                                            <FcSearch />
                                        </InputAdornment>
                                    ),
                                } : {
                                    startAdornment: (
                                        <InputAdornment
                                            position="start" >
                                            <Chip label={watchFields[index]?.label} size="small"
                                                color="info" 
                                                avatar={
                                                    watchFields[index]?.base === "bk" ?
                                                        <TiLockClosedOutline /> :
                                                        <Avatar alt="icon" src={`/logos/${watchFields[index]?.base}.png`} />
                                                }
                                                />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment
                                            position="start"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setOpen(true)
                                                setField(`hasNarrowerAuthority.${index}`)
                                            }}
                                        >
                                            <FcSearch />
                                        </InputAdornment>
                                    ),
                                }}
                        />
                       
                    </Grid>
               
                    <Grid item xs={2}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton
                                aria-label="add"
                                onClick={addField}
                                color="primary"
                            >
                                <IoAddOutline />
                            </IconButton>
                            <IconButton
                                aria-label="add"
                                onClick={() => {
                                    remove(index);
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
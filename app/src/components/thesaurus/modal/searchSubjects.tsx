"use client";
// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    DialogContent,
    DialogTitle,
    Dialog,
    InputAdornment,
    DialogContentText,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem

} from "@mui/material";
import { useState } from "react";

import { FcSearch } from "react-icons/fc";

interface Props {
    setOpen: Function;
    open: boolean;
    defaultValues: any
}
export default function SearchSubjects({ setOpen, open, defaultValues }: Props) {
    const [type, setType] = useState("all");
    const [search, setSearch] = useState("");
    const handleClose = () => {
        setOpen(false);
    };
    console.log(defaultValues)
    const handleSubmit = (e ) => {
        e.preventDefault()
        
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle id="alert-dialog-title">
                Assuntos
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ p: "10px" }}>
                        <FormControl //fullWidth sx={{ mb: "0.5rem" }}
                            size="small"
                        >
                            <InputLabel id="label">Selecione uma opção</InputLabel>
                            <Select
                                labelId="label"
                                id="demo-simple-select"
                                value={type}
                                label="Selecione uma opção"
                                onChange={(e) => {
                                    // handleChangeType(e, params);
                                }}
                            >
                                <MenuItem value="all">Todos</MenuItem>
                                <MenuItem value="Topic">Termo Topico</MenuItem>
                                <MenuItem value="Geographic">Termo Geográfico</MenuItem>
                                <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                                <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            // fullWidth
                            // disabled={true}
                            value={search}
                            label="Assunto"
                            size="small"
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        position="start"
                                        // type="submit"
                                        sx={{ cursor: "pointer" }}
                                    // onClick={() => {setOpen(true)}}
                                    >
                                        <FcSearch />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />

                    </Box>
                    <Button type="submit">Disagree</Button>

                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    )

}
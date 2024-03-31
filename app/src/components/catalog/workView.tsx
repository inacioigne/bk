"use client";
import {
    Tooltip,
    IconButton,
    Chip,
    Typography,
    Divider,
    Dialog,
    Box,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Alert,
    DialogContentText
} from "@mui/material";
import { useState } from "react";

import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";
// BiblioKeia Service
import { bkapi } from "@/services/api";

interface Props {
    work: any
}

export default function WorkView({ work }: Props) {
    const [open, setOpen] = useState(false);
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();

    const handleDelete = () => {
        // console.log(work)
        setProgress(true)
        setOpen(false)
        let id = work.id.split("#")[1]
        bkapi
            .delete(`/catalog/work/delete/${id}`)
            .then(function (response) {
                if (response.status === 201) {
                    // action()
                    console.log("RS", response.data);
                    setTypeAlert("success")
                    setMessage("Instância excluida com sucesso!")
                }
            })
            .catch(function (error) {
                console.error("ER:", error);
                setTypeAlert("error")
                setMessage(error.response.statusText)
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });

    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Box sx={{ pt: "10px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                        {work.type.map((type: string, index: number) => (
                            <Chip key={index} size="small" label={type} variant="filled" color="primary" />
                        ))}
                    </Box>
                    <Box>
                        <Tooltip title="Editar">
                            <IconButton //onClick={handleClose}
                            >
                                <CiEdit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton onClick={() => {setOpen(true)}}
                            >
                                <IoTrashOutline />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Typography variant="h4" gutterBottom>
                    {work.mainTitle}
                </Typography>
                <Divider />
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Autoria
                        </Typography>
                        {Array.isArray(work.contribution) ? (
                            work.contribution.map((contribution: any, index: number) => (
                                <Box key={index}
                                    sx={{ pt: 1, pl: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="caption" display="block">
                                        {contribution.roleLabel}
                                    </Typography>
                                    <Box>
                                        <Chip
                                            key={index}
                                            label={contribution.label}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            sx={{ cursor: "pointer" }}
                                        />
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box
                                sx={{ pt: 1, pl: 1, display: "flex", flexDirection: "column" }}>
                                <Typography variant="caption" display="block">
                                    {work.contribution.roleLabel}
                                </Typography>
                                <Box>
                                    <Chip
                                        label={work.contribution.label}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ cursor: "pointer" }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                    <Divider orientation="vertical" flexItem />

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Assunto
                        </Typography>
                        {Array.isArray(work.subject) ? (
                            <code>SUBJECT ARRAY</code>
                        ) : (
                            <Box sx={{ pl: 1 }}>
                                <Typography variant="caption" display="block">
                                    {work.subject.type}
                                </Typography>
                                <Chip
                                    label={work.subject.label}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ cursor: "pointer" }}
                                />

                            </Box>
                        )}
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box >
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Idioma
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {work.language}
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box >
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Classificação
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {work.cdd}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {work.cutter}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Excluir obra"}
                </DialogTitle>
                <DialogContent>
                    {work.hasInstance && work.hasInstance.length > 0 ?
                        <Alert severity="warning">Para excluir uma obra você deve excluir todos os recursos a ela relacionados</Alert> :
                        <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja excluir esta obra?
                    </DialogContentText>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    )
}
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
// Nextjs
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
    work: any
}

export default function WorkView({ work }: Props) {
    const [open, setOpen] = useState(false);
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const router = useRouter();

    const handleDelete = () => {
        // console.log(work)
        setProgress(true)
        setOpen(false)
        let id = work.id.split("#")[1]
        bkapi
            .delete(`/catalog/work/delete/${id}`)
            .then(function (response) {
                if (response.status === 201) {
                    // console.log("RS", response.data);
                    router.push(`/admin/catalog/`);
                    setTypeAlert("success")
                    setMessage("Obra excluida com sucesso!")
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

//    console.log(work)

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
                            <Link href={`/admin/catalog/edit/${work.id.split("#")[1]}`}>
                                <IconButton>
                                    <CiEdit />
                                </IconButton>
                            </Link>

                        </Tooltip>
                        <Tooltip title="Excluir">
                            <IconButton onClick={() => { setOpen(true) }}
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
                    {work.contribution &&
                        <>
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
                                                    label={contribution.contribution_label}
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
                                                label={work.contribution.contribution_label}
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                sx={{ cursor: "pointer" }}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Divider orientation="vertical" flexItem />  </>}

                    {work.subject &&
                        <>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                    Assunto
                                </Typography>
                                {Array.isArray(work.subject) ? (
                                    work.subject.map((subject: any, index: number) => (
                                        <Box key={index}
                                            sx={{ pt: 1, pl: 1, display: "flex", flexDirection: "column" }}>
                                            <Typography variant="caption" display="block">
                                                {subject.type}
                                            </Typography>
                                            <Box>
                                                <Chip
                                                    key={index}
                                                    label={subject.subject_label}
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    sx={{ cursor: "pointer" }}
                                                />
                                            </Box>
                                        </Box>
                                    ))
                                ) : (
                                    <Box sx={{ pl: 1 }}>
                                        <Typography variant="caption" display="block">
                                            {work.subject.type}
                                        </Typography>
                                        <Chip
                                            label={work.subject.subject_label}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            sx={{ cursor: "pointer" }}
                                        />
                                    </Box>
                                )}
                            </Box>
                            <Divider orientation="vertical" flexItem /> </>}
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
                <Box>
                    {work.summary &&
                        <>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Resumo
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {work.summary}
                            </Typography>
                        </>
                    }
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
                    <Button
                        disabled={work.hasInstance && work.hasInstance.length > 0 ? true : false}
                        onClick={handleDelete}
                        autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </>

    )
}
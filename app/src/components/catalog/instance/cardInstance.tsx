"use client";
import {
    Card, 
    CardContent, 
    Typography, 
    IconButton, 
    Box, 
    Chip, 
    Divider, 
    CardActions, 
    Button, 
    Tooltip, 
    CardMedia,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from "@mui/material";

// React Icons
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { BsGlobeAmericas } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

// BiblioKeia Components
import ModalItems from "@/components/catalog/items/modalItems"

// React
import { useState } from "react";
import ModalFormItems from "../items/modalFormItems";
// import { ExecSyncOptionsWithBufferEncoding } from "child_process";

type Classification = {
    cdd: string;
    cutter: string;
}

interface Props {
    instance: any;
    classification: Classification
    // setOpenItems: Function;
}

export default function CardInstance({ instance, classification }: Props) {
    const [open, setOpen] = useState(false);
    const [deleteInstance, setDelete] = useState(false);
    const [formItems, setFormItems] = useState(false);


    const addEx = () => {
        setFormItems(true)
        // console.log(classification)
    }

    const handleDelete = () => {
        setDelete(true)
        // console.log(instance)
        // if (instance.hasItem.length > 0) {
        //     console.log(instance.hasItem.length)
        // }
    }

    const handleClose = () => {
        setDelete(false);
    };

    return (
        <>
            <Card sx={{ minWidth: 275 }} >
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            {instance.type.map((type: any, index: number) => (
                                <Chip label={type} size="small" color="primary" key={index} />
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
                                <IconButton onClick={handleDelete}
                                >
                                    <IoTrashOutline />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                    <Divider sx={{ pt: 2 }} />
                    <Box sx={{ display: "flex", pt: 1, gap: 2 }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={instance.image}
                            alt="cover"
                        />

                        <Box>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column", width: 130, pt: 1 }}>
                                    <Typography variant="caption" display="block" sx={{ textAlign: "center" }}>
                                        Local de Publicação
                                    </Typography>
                                    <Box>
                                        <IconButton sx={{ cursor: "none" }}>
                                            <BsGlobeAmericas />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        {instance.publicationPlace}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column", width: 130, pt: 1 }}>
                                    <Typography variant="caption" display="block" sx={{ textAlign: "center" }}>
                                        Editora
                                    </Typography>
                                    <Box>
                                        <IconButton sx={{ cursor: "none" }}>
                                            <MdOutlineMapsHomeWork />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        {instance.publicationAgent}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center", flexDirection: "column", width: 130, pt: 1 }}>
                                    <Typography variant="caption" display="block" sx={{ textAlign: "center" }}>
                                        Data de publicação
                                    </Typography>
                                    <Box>
                                        <IconButton sx={{ cursor: "none" }}>
                                            <FaRegCalendarAlt />
                                        </IconButton>
                                    </Box>
                                    <Typography variant="body2" sx={{ textAlign: "center" }}>
                                        {instance.publicationDate}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                    Edição:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    1º Ed.
                                </Typography>
                            </Box>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                    Número de páginas:
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    250 p.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                </CardContent>
                <CardActions>
                    <Button size="small" variant="outlined" sx={{ textTransform: "none" }} onClick={() => { setOpen(true) }}>Ver Exemplares</Button>
                    <Button size="small" variant="outlined" sx={{ textTransform: "none" }} onClick={addEx}>Adicionar Exemplares</Button>
                </CardActions>
            </Card>
            <ModalItems items={instance.hasItem} setOpen={setOpen} open={open} />
            <ModalFormItems
                setOpen={setFormItems}
                open={formItems}
                instance={instance}
                classification={classification}
            />
            <Dialog
                open={deleteInstance}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Excluir obra"}
                </DialogTitle>
                <DialogContent>
                    {instance.hasItem && instance.hasItem.length > 0 &&
                        <Alert severity="warning">Para excluir uma instância você deve excluir todos os recursos a ela relacionados</Alert>
                    }

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>


    )
}
"use client"
import {
    Container,
    // Box,
    // DialogActions,
    // DialogContentText,
    // DialogContent,
    // DialogTitle,
    Paper,
    Divider,
    // Button,
    // Dialog
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormCreateWork from "@/components/catalog/forms/formCreateWork";
import FormCreateInstance from "@/components/catalog/forms/formCreateInstance";

// React Icons
import { FcHome, FcCancel } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";

// React Hooks
import { useState } from "react";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    },
    {
        link: "/admin/catalog",
        label: "Catálogo",
        icon: <GiBookshelf fontSize="small" />,
    },
];

export default function Create() {

    const [instance, setInstance] = useState(false);
    const [work, setWork] = useState(null);

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{ mt: "10px" }} />
            <Paper elevation={3} sx={{
                p: "15px", mt: "10px"
            }}>
                {instance ?
                    <FormCreateInstance setInstance={setInstance} work={work} /> :
                    <FormCreateWork setInstance={setInstance} setWork={setWork} />}
            </Paper>
        </Container>
    )
}
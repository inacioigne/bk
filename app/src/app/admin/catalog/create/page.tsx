"use client"
import {
    Container,
    Paper,
    Divider
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

    const [openInstance, setOpenInstance] = useState(false);
    const [work, setWork] = useState(null);
    // const [work_id, setWork_id] = useState("");


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
                {openInstance ?
                    <FormCreateInstance setOpenInstance={setOpenInstance} work={work} /> :
                    <FormCreateWork setOpenInstance={setOpenInstance} setWork={setWork} />}
            </Paper>
        </Container>
    )
}
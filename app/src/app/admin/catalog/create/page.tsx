"use client"
import {
    Container,
    Box,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Paper,
    Divider,
    Button,
    Dialog,

} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcCancel } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";

// React-Hook-Form
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import { ZodWork } from "@/schema/bibframe/zodWork"

// React Hooks
import { useEffect, useState } from "react";

// import { bkapi } from "@/services/api";


// Providers BiblioKeia
// import { useProgress } from "@/providers/progress";
// import { useAlert } from "@/providers/alert";


import FormCreateWork from "@/components/catalog/forms/formCreateWork";
import FormCreateInstance from "@/components/catalog/forms/formCreateInstance";


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
                 <FormCreateWork setInstance={setInstance} setWork={setWork} /> }
            
            </Paper>

        </Container>
    )
}
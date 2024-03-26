"use client"
import {
    Container,
    Paper,
    Divider
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
// import FormCreateWork from "@/components/catalog/forms/formCreateWork";

// React Icons
import { FcHome } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import FormWork from "@/components/catalog/forms/formWork";

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


    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{ mt: "10px" }} />
            <Paper
                elevation={3}
                sx={{ p: "15px", mt: "10px" }}>
                <FormWork />
            </Paper>
        </Container>
    )
}
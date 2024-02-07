// "use client"
import {
    Container,
    Paper,
    Divider
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import FormCreateInstance from "@/components/catalog/forms/formCreateInstance";


// React Icons
import { FcHome } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";

// React Hooks
// import { useState } from "react";

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

interface Props {
    id: string
}

async function getData(id: string) {

    const url = `http://${process.env.SOLR}:8983/solr/catalog/select?fl=*,[child]&q=id:${id}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Create({ params }: { params: { id: string } }) {

    const data = await getData(params.id);
    const [doc] = data.response.docs;
    // console.log(doc)



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
                <FormCreateInstance work={doc} />
            </Paper>
        </Container>
    )
}
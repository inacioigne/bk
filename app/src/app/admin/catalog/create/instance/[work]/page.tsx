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
import FormInstance from "@/components/catalog/forms/formInstance";

// React Hooks
// import { useState } from "react";

// Metadata
import bibframe from "@/share/bibframe/instance.json"

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

    const url = `http://${process.env.SOLR}:8983/solr/catalog/select?fl=*,[child]&q=id:work%23${id}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Create({ params }: { params: { work: string } }) {

    const data = await getData(params.work);
    const [doc] = data.response.docs;
    const work_url = `https://bibliokeia.com/works/${doc.id.split("#")[1]}`

    const ParserDefaultValues = () => {
        const defaultValues = bibframe['defaultValues']
        defaultValues.instanceOf.value = work_url
        const [mainTitle] = doc.mainTitle
        defaultValues.title.mainTitle = mainTitle
        return defaultValues
    }

    const defaultValues = ParserDefaultValues()


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
                <FormInstance defaultValues={defaultValues}/>
            </Paper>
        </Container>
    )
}
import {
    Container,
    Chip,
    Typography,
    Button,
    Divider,
    Grid,
    Paper
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome, FcSearch } from "react-icons/fc";

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    }
];

async function getData(id: string) {

    const url = `http://${process.env.SOLR}:8983/solr/catalog/select?fl=*,[child]&q=id:${id}`;
    // console.log("DAT:", url)

    const res = await fetch(url, { cache: "no-store" });


    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    const data = await getData(params.id);
    const [doc] = data.response.docs;
    console.log("DAT:", doc)

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath="Catálogo"
            />
            <Divider sx={{ mt: "10px" }} />
            <Chip  size="small" label="Obra" variant="filled" color="primary" />
            <Typography variant="h4" gutterBottom>
                {doc.mainTitle}
            </Typography>
            {doc.hasInstance.map((instance, index) => (
                <p key={index}>Instance</p>
            ))}

        </Container>
    )
}
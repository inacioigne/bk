import {
    Container, Box,
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import EditSubjects from "@/components/thesaurus/forms/editSubjects"


// React Icons
import { FcHome } from "react-icons/fc";
import { BsFillPersonLinesFill } from "react-icons/bs";

async function getData(id: string) {
    const url = `http://${process.env.SOLR}:8983/solr/authority/select?fl=*,[child]&q=id:${id}`;
    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

const previousPaths = [
    {
        link: "/admin",
        label: "Início",
        icon: <FcHome fontSize="small" />,
    },
    {
        link: "/admin/authority",
        label: "Autoridades",
        icon: <BsFillPersonLinesFill fontSize="small" />,
    },
];

export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);
    const [doc] = data.response.docs;

    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK
                    previousPaths={previousPaths}
                    currentPath={`edit/${params.id}`}
                />
            </Box>
            <EditSubjects doc={doc} />
        </Container>
    );
}
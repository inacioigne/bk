import {
    Container
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";

// React Icons
import { FcHome } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";

// Next
// import Link from "next/link";
import FormWorkEdit from "@/components/catalog/forms/formWorkEdit";
import FormInstanceEdit from "@/components/catalog/forms/formInstanceEdit";
// import action from "@/services/catalog/actions";

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
    }
];

async function getData(id: string) {

    const url = `http://${process.env.SOLR}:8983/solr/catalog/select?fl=*,[child]&q=id:instance%23${id}`;
    const res = await fetch(url, {
        cache: 'no-store',
        next: { tags: ['catalog', 'edit'] }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    const data = await getData(params.id);
    const [doc] = data.response.docs;
    console.log(doc)

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath={"Edit"}
            />
            <FormInstanceEdit doc={doc}/>
            
        </Container>
    )
}
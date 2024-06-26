import {
    Container,
    Button,
    Divider,
    Box
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import CardInstance from "@/components/catalog/instance/cardInstance"

// React Icons
import { FcHome } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import { IoAddOutline } from "react-icons/io5";

// Next
import Link from "next/link";
import WorkView from "@/components/catalog/workView";
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

    const url = `http://${process.env.SOLR}:8983/solr/catalog/select?fl=*,[child]&q=id:work%23${id}`;
    const res = await fetch(url, {
        cache: 'no-store',
        next: { tags: ['catalog'] }
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
                currentPath={params.id}
            />
            <WorkView work={doc} />
            <Divider sx={{ mt: "10px" }} />
            <Box sx={{ pt: "10px", display: "flex", gap: "15px" }}>
                <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
                    {doc?.hasInstance && (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            {doc.hasInstance.map((instance: any, index: number) => (
                                <CardInstance
                                    instance={instance}
                                    key={index}
                                    classification={{
                                        cdd: doc.cdd,
                                        cutter: doc.cutter
                                    }} />
                            ))}
                        </Box>
                    )}
                    <Link href={`/admin/catalog/create/instance/${params.id}`}>
                        <Button
                            size="small"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                            startIcon={<IoAddOutline />}>
                            Criar Instâncias
                        </Button>
                    </Link>

                </Box>
            </Box>
        </Container>
    )
}
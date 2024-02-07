import {
    Container,
    Chip,
    Typography,
    Button,
    Divider,
    // Grid,
    Box
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import CardInstance from "@/components/catalog/instance/cardInstance"

// React Icons
import { FcHome } from "react-icons/fc";
import { GiBookshelf } from "react-icons/gi";
import { LuFileText } from "react-icons/lu";
import { IoAddOutline } from "react-icons/io5";

// Next
import Image from 'next/image'

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

    const url = `http://${process.env.SOLR}:8983/solr/catalog/select?fl=*,[child]&q=id:${id}`;
    const res = await fetch(url, { cache: "no-store" });


    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    const data = await getData(params.id);
    const [doc] = data.response.docs;
    let instances = doc.hasInstance
    let lastInstance = instances[instances.length - 1]

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath={params.id.split("%23")[1]}
            />
            <Divider sx={{ mt: "10px" }} />
            <Box sx={{ pt: "10px", display: "flex", gap: "15px" }}>
                <Image
                    src={lastInstance.image}
                    width={300}
                    height={400}
                    alt="cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                        <Chip size="small" label="Obra" variant="filled" color="primary" />
                        <Chip size="small" label={doc.content} variant="filled" color="primary" avatar={<LuFileText />} />
                    </Box>

                    <Typography variant="h4" gutterBottom>
                        {doc.mainTitle}
                    </Typography>
                    <Box>
                        <Chip label={`${doc.contribution.label} (${doc.contribution.roleLabel})`} variant="outlined" color="primary" />
                    </Box>
                    <Divider />
                    <Box >
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Idioma
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                            {doc.language}
                        </Typography>

                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography variant="h6" display="block" gutterBottom>
                            Instâncias /
                        </Typography>
                        <Box>
                            <Button size="small" variant="outlined" sx={{ textTransform: "none" }} startIcon={<IoAddOutline />}>Criar Instâncias</Button>


                        </Box>
                    </Box>
                    <Box sx={{ pt: "10px" }}>
                        {doc.hasInstance.map((instance: any, index: number) => (
                            <CardInstance key={index} instance={instance} />
                        ))}

                    </Box>


                </Box>

            </Box>



        </Container>
    )
}
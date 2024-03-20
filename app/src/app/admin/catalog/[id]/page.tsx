import {
    Container,
    Chip,
    Typography,
    Button,
    Divider,
    Card,
    Box,
    Grid
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
import Link from "next/link";

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
    console.log(url)

    const res = await fetch(url, { cache: "no-store" });


    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {

    const data = await getData(params.id);
    const [doc] = data.response.docs;
    // console.log("D", doc.contribution)

    return (
        <Container maxWidth="xl" sx={{ py: "1rem" }}>
            <BreadcrumbsBK
                previousPaths={previousPaths}
                currentPath={params.id}
            />
            <Divider sx={{ mt: "10px" }} />
            <Box sx={{ pt: "10px", display: "flex", gap: "15px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
                    <Box sx={{ display: "flex", gap: "5px" }}>
                        {doc.type.map((type: string, index: number) => (
                            <Chip key={index} size="small" label={type} variant="filled" color="primary" />
                        ))}
                    </Box>
                    {/* Title */}
                    <Typography variant="h4" gutterBottom>
                        {doc.mainTitle}
                    </Typography>
                    <Divider />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Autoria
                        </Typography>
                        {Array.isArray(doc.contribution) ? (
                            doc.contribution.map((contribution: any, index: number) => (
                                <Box key={index}
                                    sx={{ pt: 1, pl: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="caption" display="block">
                                        {contribution.roleLabel}
                                    </Typography>
                                    <Box>
                                        <Chip
                                            key={index}
                                            label={contribution.label}
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            sx={{ cursor: "pointer" }}
                                        />
                                    </Box>
                                </Box>
                            ))
                        ) : (
                            <Box
                                sx={{ pt: 1, pl: 1, display: "flex", flexDirection: "column" }}>
                                <Typography variant="caption" display="block">
                                    {doc.contribution.roleLabel}
                                </Typography>
                                <Box>
                                    <Chip
                                        label={doc.contribution.label}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        sx={{ cursor: "pointer" }}
                                    />
                                </Box>
                            </Box>
                        )}

                    </Box>
                    <Divider />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                            Assunto
                        </Typography>
                        {Array.isArray(doc.subject) ? (
                            <code>SUBJECT ARRAY</code>
                        ) : (
                            <Box sx={{ pl: 1 }}>
                                <Typography variant="caption" display="block">
                                    {doc.subject.type}
                                </Typography>
                                <Chip
                                    label={doc.subject.label}
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    sx={{ cursor: "pointer" }}
                                />

                            </Box>
                        )}
                        {/* {doc.contribution.map((contribution: any, index: number) => (
                            <Box key={index}
                                sx={{ pt: 1, pl: 1, display: "flex", flexDirection: "column" }}>
                                <Typography variant="caption" display="block">
                                    {contribution.roleLabel}
                                </Typography>
                                <Box>
                                    <Chip
                                        key={index}
                                        label={contribution.label}
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                    />
                                </Box>
                            </Box>
                        ))} */}
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
                    <Link href={`/admin/catalog/create/instance/${params.id}`}>
                        <Button size="small" variant="outlined" sx={{ textTransform: "none" }} startIcon={<IoAddOutline />}>Criar Instâncias</Button>
                    </Link>

                </Box>
            </Box>
        </Container>
    )
}
// "use client";
import {
    Container,
    Box,
    Typography,
    Button,
    Divider,
    Grid,
    Paper
} from "@mui/material";

// BiblioKeia Components
import BreadcrumbsBK from "@/components/nav/breadcrumbs";
import HasVariant from "@/components/madsrdf/view/hasVariant";
import MadsUri from "@/components/madsrdf/view/madsUri"
import HasAffiliation from "@/components/madsrdf/view/hasAffiliation";

// React Icons
import { FcHome, FcCalendar } from "react-icons/fc";
import { CiEdit, CiImport } from "react-icons/ci";
import { BsFillPersonLinesFill, BsFillPersonPlusFill } from "react-icons/bs";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiTombstone } from "react-icons/gi"

// Nextjs
// import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// React Hooks
import { Suspense } from "react";
import DeleteItem from "./deleteItem";

async function getData(id: string) {

    const url = `http://${process.env.SOLR}:8983/solr/authority/select?fl=*,[child]&q=id:authority%23${id}`;

    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}


export default async function Page({ params }: { params: { id: string } }) {
    const data = await getData(params.id);

    const [doc] = data.response.docs;
    // console.log(doc)

    const previousPaths = [
        {
            link: "/admin",
            label: "Início",
            icon: <FcHome fontSize="small" />,
        },
        {
            link: `/admin/authorities`,
            label: "Autoridades",
            icon: <BsFillPersonLinesFill fontSize="small" />,
        },
    ];

    return (
        <Container maxWidth="xl">
            <Box my={"1rem"}>
                <BreadcrumbsBK previousPaths={previousPaths}
                    currentPath={params.id}
                />
                <Suspense fallback={"Item em espera..."}>
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h4" gutterBottom>
                                {doc.authority}
                            </Typography>
                            <Box>
                                <Link href={"/admin/authorities/importation"}>
                                    <Button
                                        variant="outlined"
                                        sx={{ textTransform: "none", mr: "10px" }}
                                        startIcon={<CiImport />}
                                    >
                                        Importar
                                    </Button>
                                </Link>
                                <Link href={"/admin/authorities/create"}>
                                    <Button
                                        sx={{ textTransform: "none" }}
                                        variant="outlined"
                                        startIcon={<BsFillPersonPlusFill />}
                                    >
                                        Novo
                                    </Button>
                                </Link>
                                <Link href={`/admin/authorities/names/${params.id}/edit`}>
                                    <Button
                                        sx={{ textTransform: "none", mx: "10px" }}
                                        variant="outlined"
                                        startIcon={<CiEdit />}
                                    >
                                        Editar
                                    </Button>
                                </Link>
                                <DeleteItem id={doc.id} type={doc.type} isMemberOfMADSCollection={doc.isMemberOfMADSCollection} />
                            </Box>
                        </Box>
                        <Divider />
                        <Paper sx={{ mt: "15px" }}
                        >
                            <Box sx={{ p: "20px" }}>

                                <Grid
                                    container
                                    spacing={2}
                                    sx={{ alignItems: "flex-start", alignContent: "flex-start" }}
                                >
                                    {/* {doc?.imagem && (
                                        <Grid item xs={3}>
                                            <Box sx={{ p: "10px", display: "flex", justifyContent: "center" }}>
                                                <Image
                                                    src={doc.imagem}
                                                    height={300}
                                                    width={200}
                                                    alt="Picture of the author"
                                                />
                                            </Box>
                                        </Grid>
                                    )} */}
                                    {doc?.fullerName || (doc?.birthPlace || doc?.birthDate) || (doc?.deathPlace || doc?.deathDate) &&
                                        <Grid item xs={4}>
                                            {doc?.fullerName && (
                                                <Box>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        Nome completo:
                                                    </Typography>
                                                    <Typography variant="subtitle1" gutterBottom>
                                                        {doc.fullerName}
                                                    </Typography>
                                                </Box>
                                            )}

                                            {(doc?.birthPlace || doc?.birthDate) && (
                                                <Box>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        Nascimento:
                                                    </Typography>
                                                    <Box sx={{ display: "flex", gap: "5px" }}>
                                                        {doc?.birthPlace && (
                                                            <Button
                                                                startIcon={<LiaBirthdayCakeSolid />}
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ textTransform: "none" }}
                                                            >
                                                                {" "}
                                                                {doc.birthPlace}
                                                            </Button>

                                                        )}
                                                        {doc?.birthDate && <Button
                                                            variant="outlined"
                                                            startIcon={<FcCalendar />}
                                                            size="small"
                                                        >
                                                            {doc.birthDate}
                                                        </Button>}
                                                    </Box>
                                                </Box>
                                            )}

                                            {(doc?.deathPlace || doc?.deathDate) && (
                                                <Box sx={{ mt: "10px" }}
                                                >
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        Falecimento:
                                                    </Typography>

                                                    <Box sx={{ display: "flex", gap: "5px", }}>
                                                        {doc.deathPlace && (
                                                            <Button
                                                                startIcon={<GiTombstone />}
                                                                variant="outlined"
                                                                size="small"
                                                                sx={{ textTransform: "none" }}
                                                            >
                                                                {doc.deathPlace}
                                                            </Button>
                                                        )}

                                                        {doc?.deathDate && (
                                                            <Button
                                                                variant="outlined"
                                                                startIcon={<FcCalendar />}
                                                                size="small"
                                                            >
                                                                {" "}
                                                                {doc.deathDate}{" "}
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </Box>
                                            )}
                                        </Grid>
                                    }



                                    {doc?.hasAffiliation && (
                                        <Grid item xs={4}>
                                            <HasAffiliation hasAffiliation={doc.hasAffiliation} />
                                        </Grid>
                                    )}
                                    {doc?.variant && (
                                        <Grid item xs={4}>
                                            <HasVariant hasVariant={doc.hasVariant} />
                                        </Grid>
                                    )}
                                    {doc?.occupation && (
                                        <Grid item xs={4}>
                                            <MadsUri uri={doc.occupation} label={"Ocupações:"} />
                                        </Grid>
                                    )}
                                    {doc?.identifiesRWO && (
                                        <Grid item xs={4}>
                                            <MadsUri uri={doc.identifiesRWO} label={"Identificado por:"} />
                                        </Grid>
                                    )}
                                    {doc?.fieldOfActivity && (
                                        <Grid item xs={4}>
                                            <MadsUri
                                                uri={doc.fieldOfActivity}
                                                label={"Campos de Atividade:"}
                                            />
                                        </Grid>
                                    )}
                                    {doc?.hasReciprocalAuthority && (
                                        <Grid item xs={4}>
                                            <MadsUri
                                                uri={doc.hasReciprocalAuthority}
                                                label={"Termo Relacionado:"}
                                            />
                                        </Grid>
                                    )}
                                    {doc?.hasBroaderAuthority && (
                                        <Grid item xs={4}>
                                            <MadsUri
                                                uri={doc.hasBroaderAuthority}
                                                label={"Termo Geral:"}
                                            />
                                        </Grid>
                                    )}

                                    {doc?.hasNarrowerAuthority && (
                                        <Grid item xs={4}>
                                            <MadsUri
                                                uri={doc.hasNarrowerAuthority}
                                                label={"Termo Específico:"}
                                            />
                                        </Grid>
                                    )}

                                    {doc?.hasCloseExternalAuthority && (
                                        <Grid item xs={4}>
                                            <MadsUri
                                                uri={doc.hasCloseExternalAuthority}
                                                label={"Ocorrência em outros bases:"}
                                            />
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </Suspense>
            </Box>
        </Container>
    );
}
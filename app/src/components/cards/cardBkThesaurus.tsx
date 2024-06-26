// MUI
import {
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Typography,
    Tooltip,
    IconButton,
    Divider,
    Chip,
    Grid,
    Box
} from "@mui/material";

import { schemaAuthorityDoc } from "@/schema/solr"

import { red } from "@mui/material/colors";
// import { CiImport } from "react-icons/ci";
import { FcCheckmark } from "react-icons/fc";

import HasVariant from "@/components/madsrdf/view/hasVariant";
import MadsUri from "@/components/madsrdf/view/madsUri";
import ListMadsBk from "@/components/madsrdf/view/listMadsBk"

interface Props {
    doc: schemaAuthorityDoc;
    setDoc: Function;
    setValue: Function;
    field: String;
    setOpen: Function

}
export default function CardBkTheasaurs({ doc, setDoc, setValue, field, setOpen }: Props) {

    // console.log("F:", field)
    
    const handleChoose = () => {
        setValue(`${field}.term.label`, doc.authority[0])
        setValue(`${field}.base`, "bk")
        setValue(`${field}.lang`, doc.lang)
        let id = doc.id.split("#")[1]
        setValue(`${field}.term.value`, `https://bibliokeia.com/authority/${doc.type}/${id}`)
        setOpen({name: "", open: false})
    }

    return (
        <Card >
            <CardContent>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {doc.authority[0][0]}
                        </Avatar>
                    }
                    title={
                        <>
                            <Typography variant="h5" component="div">
                                {doc.authority}
                            </Typography>
                            <Chip label={doc.type} color="primary" size="small" />
                        </>
                    }
                    action={
                        <Tooltip title="Usar registro">
                            <IconButton
                                aria-label="settings"
                                onClick={handleChoose}
                            >
                                <FcCheckmark />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <Divider />
                <Grid container spacing={2} sx={{ mt: "5px" }}
                >
                    {/* hasVariant */}
                    {doc?.hasVariant && (
                        <Grid item xs={6}>
                            <HasVariant hasVariant={doc.hasVariant} />
                        </Grid>
                    )}
                    {/* identifiesRWO */}
                    {doc?.identifiesRWO && (
                        <Grid item xs={6}>
                            <MadsUri uri={doc.identifiesRWO} label={"Identificado por:"} />
                        </Grid>
                    )}
                    {/* hasReciprocalAuthority */}
                    {doc?.hasReciprocalAuthority && (
                        <Grid item xs={6}>
                            <ListMadsBk label={"Termo Relacionado"} setDoc={setDoc} items={doc.hasReciprocalAuthority} />
                        </Grid>
                    )}

                    {/* hasBroaderAuthority  */}
                    {doc?.hasBroaderAuthority && (
                        <Grid item xs={6}>
                            <ListMadsBk label="Termo Geral" setDoc={setDoc} items={doc.hasBroaderAuthority} />
                        </Grid>
                    )}

                    {/* hasBroaderAuthority */}
                    {doc?.hasNarrowerAuthority && (
                        <Grid item xs={6}>
                            <ListMadsBk label="Termo Específico" setDoc={setDoc} items={doc.hasNarrowerAuthority} />
                        </Grid>
                    )}

                </Grid>
            </CardContent>

        </Card>
    )

}
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

import { CiImport } from "react-icons/ci";
import { red } from "@mui/material/colors";

//   import { schemaMads } from "@/schema/authority";
import { Bibframe } from "@/schema/bibframe"


// BiblioKeia Hooks
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// BiblioKeia Services
// import { CreateAuthority } from "@/services/thesarus/createAuthority"
import { bkapi } from "@/services/api"

// BiblioKeia Components
import MadsUri from "@/components/madsrdf/view/madsUri"
import FieldOfActivity from "@/components/madsrdf/view/fieldOfActivity"
import HasAffiliation from "@/components/madsrdf/view/hasAffiliation";
import HasVariant from "@/components/madsrdf/view/hasVariant";
import HasCloseExternalAuthority from "@/components/madsrdf/view/hasCloseExternalAuthority";
import BtnIcon from "@/components/buttons/btnIcon";
import ListMads from "@/components/loc/listMads"
import MadsLoc from "@/components/madsrdf/view/madsLoc";


// React Icons
import { FaTreeCity } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";

// Nextjs
import { useRouter } from 'next/navigation'

interface Props {
    hit: Bibframe;
    setHit: Function;
    setForm: Function;
}

export default function CardLocResource({ hit, setHit, setForm }: Props) {
    const router = useRouter();
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    console.log("H: ", hit)

    function LocExist(identifiersLccn: any) {
        setProgress(true)
        bkapi
            .get(`/thesarus/loc/exist/${identifiersLccn}`)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.exist) {
                        // console.log(response.data)
                        setTypeAlert("error");
                        setMessage("Registro já existe")
                        setOpenSnack(true);
                        router.push(`/admin/authority/${response.data.id}`);
                        // setForm(true)
                    } else {
                        setForm(true)
                    }
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setProgress(false)
                //   setOpenSnack(true)
                //   setDoc(null)
            });

    }

    return (
        <Card variant="outlined">
            <CardContent>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            {hit.title.mainTitle[0]}
                        </Avatar>
                    }
                    title={
                        <>
                            <Typography variant="h5" component="div">
                                {hit.title.mainTitle}
                            </Typography>
                            <Box sx={{ display: "flex", gap: "5px" }}>
                                {hit.type.map((type, index) => (
                                    <Chip key={index} label={type} color="primary" size="small" />
                                ))}
                            </Box>
                        </>
                    }
                    action={
                        <Tooltip title="Import registro">
                            <IconButton
                                aria-label="settings"
                                onClick={() => {
                                    LocExist(hit.identifiersLccn)
                                    
                                }}
                            >
                                <CiImport />
                            </IconButton>
                        </Tooltip>
                    }
                />
                <Divider />
                <Grid container spacing={2} sx={{ mt: "5px" }}>
                    <Grid item xs={6}>
                        <Box sx={{ pl: "10px" }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Conteúdo:
                            </Typography>
                            {hit.content.map((content, index) => (
                                <Typography key={index} variant="subtitle1" gutterBottom>
                                    {content.label}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ pl: "10px" }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                Idioma:
                            </Typography>
                            {hit.language.map((e, index) => (
                                <Typography key={index} variant="subtitle1" gutterBottom>
                                    {e.label}
                                </Typography>
                            ))}
                        </Box>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>
    );
}

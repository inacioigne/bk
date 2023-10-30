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
  
  import { schemaMads } from "@/schema/authority";
  
  // BiblioKeia Hooks
  import { useProgress } from "@/providers/progress";
  import { useAlert } from "@/providers/alert";
  
  // BiblioKeia Services
  // import { CreateAuthority } from "@/services/thesarus/createAuthority"
import { bkapi } from "@/services/api"
  
  // BiblioKeia Components
  // import IdentifiesRWO from "@/components/madsrdf/view/identifiesRWO"
  import MadsUri from "@/components/madsrdf/view/madsUri"
  import FieldOfActivity from "@/components/madsrdf/view/fieldOfActivity"
  import HasAffiliation from "@/components/madsrdf/view/hasAffiliation";
  import HasVariant from "@/components/madsrdf/view/hasVariant";
  import Occupation from "@/components/madsrdf/view/occupation";
  import HasCloseExternalAuthority from "@/components/madsrdf/view/hasCloseExternalAuthority";
  import BtnIcon from "@/components/buttons/btnIcon";
//   import HasBroaderAuthority from "@/components/madsrdf/view/hasBroaderAuthority";
  import ListMads from "@/components/madsrdf/view/listMads"

  
  // React Icons
  import { FaTreeCity } from "react-icons/fa6";
  import { FcCalendar } from "react-icons/fc";
  
  // Nextjs
  import { useRouter } from 'next/navigation'
  
  // BiblioKeia Services
  // import { bkapi } from "@/services/api";
  
  interface Props {
    hit: schemaMads;
    setHit: Function;
    setForm: Function;
  }
  
  export default function CardLoc({ hit, setHit, setForm }: Props) {
    // console.log(hit)
  
    // const router = useRouter();
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
  
    function LocExist(identifiersLccn:any) {
      setProgress(true)
  
      bkapi
        .get(`/thesarus/exist/${identifiersLccn}`)
        .then(function (response) {
          if (response.status === 200) {
            if (response.data) {
              setTypeAlert("error");
              setMessage("Registro já existe")
              setOpenSnack(true);
            } else {
              setForm(true)
              // console.log(response)
              // CreateAuthority(
              //         hit,
              //         setProgress,
              //         setTypeAlert,
              //         setMessage,
              //         setOpenSnack,
              //         router
              //       )
              // router.push(`/admin/authority/${id}`);
  
            }
            // console.log(response);
            // setTypeAlert("error");
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
                {hit.authoritativeLabel[0]}
              </Avatar>
            }
            title={
              <>
                <Typography variant="h5" component="div">
                  {hit.authoritativeLabel}
                </Typography>
                <Chip label={hit.type} color="primary" size="small" />
              </>
            }
            action={
              <Tooltip title="Import registro">
                <IconButton
                  aria-label="settings"
                  onClick={() => {
                    LocExist(hit.identifiersLccn)
  
                    // LocExist(hit.identifiersLccn)
                    // CreateAuthority(
                    //   hit,
                    //   setProgress,
                    //   setTypeAlert,
                    //   setMessage,
                    //   setOpenSnack,
                    //   router,
                    //   setHit
                    // )
                  }}
                >
                  <CiImport />
                </IconButton>
              </Tooltip>
            }
          />
          <Divider />
          <Grid container spacing={2} sx={{ mt: "5px" }}>
  
            {/* Nascimento */}
            {(hit?.birthPlace || hit?.birthDate) && (
              <Grid item xs={6}>
                <Box sx={{ pl: "10px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Nascimento:
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      p: "5px",
                    }}
                  >
                    {hit?.birthPlace && (<BtnIcon icon={<FaTreeCity />} label={hit?.birthPlace} />)}
                    {hit?.birthDate && (<BtnIcon icon={<FcCalendar />} label={hit?.birthDate} />)}
                  </Box>
                </Box>
              </Grid>
            )}
  
            {/* Falecimento */}
            {(hit?.deathPlace || hit?.deathDate) && (
              <Grid item xs={6}>
                <Box sx={{ pl: "10px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Falecimento:
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "5px",
                      p: "5px",
                    }}
                  >
                    {hit?.deathPlace && (<BtnIcon icon={<FaTreeCity />} label={hit.deathPlace} />)}
                    {hit?.deathDate && (<BtnIcon icon={<FcCalendar />} label={hit?.deathDate} />)}
                  </Box>
                </Box>
              </Grid>
            )}
  
            {/* fullerName */}
            {hit?.fullerName && (
              <Grid item xs={6}>
                <Box sx={{ pl: "10px" }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    Nome completo:
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {hit.fullerName}
                  </Typography>
                </Box>
              </Grid>
            )}
  
            {/* hasVariant */}
            {hit?.hasVariant && (
              <Grid item xs={6}>
                <HasVariant hasVariant={hit?.hasVariant} />
              </Grid>
            )}
  
            {/* identifiesRWO */}
            {hit?.identifiesRWO && (
              <Grid item xs={6}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
                {/* <IdentifiesRWO identifiesRWO={hit?.identifiesRWO} /> */}
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
                {/* <IdentifiesRWO identifiesRWO={hit?.identifiesRWO} /> */}
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
                <MadsUri child={hit.identifiesRWO} label={"Identificado por:"} />
              </Grid>
            )}
  
            {/* hasAffiliation */}
            {hit?.hasAffiliation && (
              <Grid item xs={6}>
                <HasAffiliation hasAffiliation={hit.hasAffiliation} />
              </Grid>
            )}
  
            {/* fieldOfActivity */}
            {hit?.fieldOfActivity && (
              <Grid item xs={6}>
                <FieldOfActivity fieldOfActivity={hit.fieldOfActivity} setHit={setHit} />
              </Grid>
            )}
  
            {/* Occupation */}
            {hit?.occupation && (
              <Grid item xs={6}>
                <Occupation occupation={hit.occupation} setHit={setHit} />
              </Grid>
            )}
  
            {/* hasReciprocalAuthority */}
            {hit?.hasReciprocalAuthority && (
              <Grid item xs={6}>
                <ListMads label="Termo Relacionado" setHit={setHit} items={hit?.hasReciprocalAuthority} />
              </Grid>
            )}
  
            {/* hasBroaderAuthority  */}
            {hit?.hasBroaderAuthority && (
              <Grid item xs={6}>
                <ListMads label="Termo Geral" setHit={setHit} items={hit?.hasBroaderAuthority} />
              </Grid>
            )}
  
            {/* hasBroaderAuthority */}
            {hit?.hasNarrowerAuthority && (
              <Grid item xs={6}>
                <ListMads label="Termo Específico" setHit={setHit} items={hit?.hasNarrowerAuthority} />
              </Grid>
            )}
            {/* HasCloseExternalAuthority */}
            {hit?.hasCloseExternalAuthority && (
              <Grid item xs={6}>
                <HasCloseExternalAuthority hasCloseExternalAuthority={hit.hasCloseExternalAuthority} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    );
  }
  
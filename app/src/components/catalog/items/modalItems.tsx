"use client";
// MUI
import {
    Box,
    Grid,
    TextField,
    IconButton,
    DialogContent,
    DialogTitle,
    Dialog,
    InputAdornment,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Avatar,
    ListItemText,
    ListItemButton,
    Paper,
    Alert
} from "@mui/material";

// React
import { Fragment, useEffect, useState } from "react";




import { FcSearch } from "react-icons/fc";

// Services BiblioKeia
import { SearchModalSubjects } from "@/services/thesarus/searchModalSubjects"
// import CardBkTheasaurs from "@/components/cards/cardBkThesaurus";

import { schemaAuthorityDoc } from "@/schema/solr"

// React-Hook-Form
import { useForm } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";

interface Props {
    setOpen: Function;
    open: boolean;
    // defaultValues: any
    // field: string
}

export default function ModalItems({ setOpen, open }: Props) {
    const [type, setType] = useState("*");
    const [search, setSearch] = useState("");
    const [docs, setDocs] = useState<schemaAuthorityDoc[]>([])
    const [doc, setDoc] = useState<schemaAuthorityDoc | null>(null)

    const { control, register } = useForm<SchemaCreateWork>({
        resolver: zodResolver(ZodWork),
        defaultValues,
    });
    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "items",
    });

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        // console.log(type, search)
        SearchModalSubjects(type, search, setDocs)
    }, [open])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        SearchModalSubjects(type, search, setDocs)
        // console.log(type, search)

    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle id="alert-dialog-title">
                Items
            </DialogTitle>
            <Divider />
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                                {fields.map((field, index) => (
                                    <TextField
                                        fullWidth
                                        // disabled={true}
                                        variant="outlined"
                                        label="CDD"
                                        size="small"
                                        {...register(`subject.${index}.label`)}

                                    />
                                    // <Fragment key={index} >
                                    //     <Box sx={{ display: "flex", gap: "10px", width: "100%" }}>
                                    //         <Controller
                                    //             name={`subject.${index}.type`}
                                    //             control={control}
                                    //             defaultValue={"Topic"}
                                    //             render={({ field }) => (
                                    //                 <FormControl
                                    //                     sx={{ width: 300 }}
                                    //                 >
                                    //                     <InputLabel id="label">Tipo de Assunto</InputLabel>
                                    //                     <Select
                                    //                         id="role"
                                    //                         size="small"
                                    //                         label="Tipo de Assunto"
                                    //                         {...field}
                                    //                     >
                                    //                         <MenuItem value={"Topic"}>Topic</MenuItem>
                                    //                     </Select>
                                    //                 </FormControl>
                                    //             )}
                                    //         />
                                    //         <TextField
                                    //             fullWidth
                                    //             disabled={true}
                                    //             variant="outlined"
                                    //             label="Assunto"
                                    //             size="small"
                                    //             {...register(`subject.${index}.label`)}
                                    //             inputProps={{
                                    //                 style: { opacity: 0 },

                                    //             }}
                                    //             InputProps={
                                    //                 watchFields[index]?.label === "" ? {
                                    //                     endAdornment: (
                                    //                         <InputAdornment
                                    //                             position="start"
                                    //                             sx={{ cursor: "pointer" }}
                                    //                             onClick={() => {
                                    //                                 setOpen(true)
                                    //                                 setField(`subject.${index}`)
                                    //                             }}
                                    //                         >
                                    //                             <FcSearch />
                                    //                         </InputAdornment>
                                    //                     ),
                                    //                 } : {
                                    //                     startAdornment: (
                                    //                         <InputAdornment
                                    //                             position="start" >
                                    //                             <Chip label={watchFields[index]?.label} size="small"
                                    //                                 color="info"
                                    //                                 avatar={<FcLock />}
                                    //                             />
                                    //                         </InputAdornment>
                                    //                     ),
                                    //                     endAdornment: (
                                    //                         <InputAdornment
                                    //                             position="start"
                                    //                             sx={{ cursor: "pointer" }}
                                    //                             onClick={() => {
                                    //                                 // console.log("abrir")
                                    //                                 setOpen(true)
                                    //                             }}
                                    //                         >
                                    //                             <FcSearch />
                                    //                         </InputAdornment>
                                    //                     ),
                                    //                 }}
                                    //         />
                                    //         <Controller
                                    //             name={`subject.${index}.lang`}
                                    //             control={control}
                                    //             defaultValue={"por"}
                                    //             render={({ field }) => (
                                    //                 <FormControl
                                    //                     sx={{ width: 200 }}
                                    //                 >
                                    //                     <InputLabel id="label">Idioma</InputLabel>
                                    //                     <Select
                                    //                         size="small"
                                    //                         label="Idioma"
                                    //                         {...field}
                                    //                     // onChange={(e) => {
                                    //                     //     field.onChange(e)
                                    //                     // }}
                                    //                     >
                                    //                         <MenuItem value={"por"}>Português</MenuItem>
                                    //                         <MenuItem value={"en"}>Inglês</MenuItem>

                                    //                     </Select>
                                    //                 </FormControl>
                                    //             )}
                                    //         />

                                    //         <Box sx={{ display: "flex", alignItems: "center" }}>
                                    //             <IconButton
                                    //                 aria-label="add"
                                    //                 onClick={addField}
                                    //                 color="primary"
                                    //             >
                                    //                 <IoAddOutline />
                                    //             </IconButton>
                                    //             <IconButton
                                    //                 aria-label="add"
                                    //                 onClick={() => {
                                    //                     remove(index);
                                    //                 }}
                                    //                 color="primary"
                                    //             >
                                    //                 <IoRemove />
                                    //             </IconButton>
                                    //         </Box>
                                    //     </Box>
                                    // </Fragment>
                                ))}
                                {/* <FormControl
                                    sx={{ width: "30%" }}
                                    size="small"
                                >
                                    <InputLabel id="label">Selecione uma opção</InputLabel>
                                    <Select
                                        labelId="label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Selecione uma opção"
                                        onChange={(e) => {
                                            setType(e.target.value)
                                        }}
                                    >
                                        <MenuItem value="*">Todos</MenuItem>
                                        <MenuItem value="Topic">Termo Topico</MenuItem>
                                        <MenuItem value="Geographic">Termo Geográfico</MenuItem>
                                        <MenuItem value="PersonalName">Nome Pessoal</MenuItem>
                                        <MenuItem value="CorporateName">Nome Coorporativo</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    sx={{ width: "70%" }}
                                    value={search}
                                    label="Assunto"
                                    size="small"
                                    onChange={(e) => {
                                        setSearch(e.target.value)
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment
                                                position="start"
                                                sx={{ cursor: "pointer" }}
                                            // onClick={handleSubmit}
                                            >
                                                <IconButton type="submit">
                                                    <FcSearch />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                /> */}
                            </Box>
                        </form>
                    </Grid>
                    {docs.length > 0 ?
                        <Grid item xs={4}>
                            <Paper elevation={3}>
                                <List dense={true}>
                                    {
                                        docs.map((doc, index) => (
                                            <div key={index}>
                                                <ListItem disablePadding >
                                                    <ListItemButton onClick={() => { setDoc(doc) }}>
                                                        <ListItemIcon>
                                                            <Avatar sx={{ width: 24, height: 24, fontSize: 15 }}>
                                                                {doc.type[0]}
                                                            </Avatar>
                                                        </ListItemIcon>
                                                        <ListItemText primary={doc.authority} />
                                                    </ListItemButton>
                                                </ListItem>
                                                <Divider />
                                            </div>
                                        ))
                                    }
                                </List>
                            </Paper>
                        </Grid> : (
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <Alert severity="info" >
                                        Sua busca não retorno nenhum resultado.
                                    </Alert>
                                </Box>
                            </Grid>
                        )}
                    {/* </Grid> */}
                    {/* <Grid item xs={8}>
                        {doc ? <CardBkTheasaurs doc={doc} setDoc={setDoc} field={field} setValue={setValue} setOpen={setOpen} /> : null}
                    </Grid> */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    )

}
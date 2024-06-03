"use client"
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
    Slide,
    Toolbar,
    AppBar
} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';

// import { IoCloseSharp } from "react-icons/io5";
import { IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

// BiblioKeia Components
import FormMadsNames from "@/components/thesaurus/forms/formMadsNames";
import ModalSubjects from "@/components/thesaurus/modal/tmp-modalThesarus"

// React-Hook-Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
import ZodMads from "@/schema/mads/zodNames";

// Share
import defaultValues from "@/share/defaultValues/formNames.json" assert { type: "json" };

import { forwardRef, useEffect, useState } from "react"

type SchemaCreateAuthority = z.infer<typeof ZodMads>;

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Services BiblioKeia
import { ParserData } from "@/services/thesarus/parserData"
import { bkapi } from "@/services/api";

interface Props {
    setOpen: Function;
    open: boolean;
}
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

export default function ModalThesarusNamesCreate({ setOpen, open }: Props) {
    const { setProgress } = useProgress();
    const { setOpenSnack, setMessage } = useAlert();
    const [id, setId] = useState(null);
    const [field, setField] = useState("");
    const [openSubjects, setOpenSubjects] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues
    } = useForm<SchemaCreateAuthority>({
        resolver: zodResolver(ZodMads),
        defaultValues: defaultValues,
    });

    useEffect(() => {
        bkapi
            .get(`/thesarus/next_id`)
            .then(function (response) {
                setId(response.data);
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error(error);
            })
            .finally(function () {
                // setProgress(false)
            });
    }, [String(id)]);

    function CreateName(data: any) {

        setProgress(true)
        let formData = ParserData(data)

        let obj = {
            identifiersLocal: String(id),
            adminMetadata: {
                status: {
                    label: "novo",
                    value: "n"
                },
            },
            isMemberOfMADSCollection: "names",
            authoritativeLabel: data.birthYearDate ?
                `${data.elementList[0].elementValue.value}, ${data.birthYearDate}` : data.elementList[0].elementValue.value,
        }

        const request = { ...obj, ...formData };

        bkapi
            .post("/thesarus/create", request, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    setMessage("Registro criado com sucesso!")
                    setOpen(false)
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });

    }
    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <form onSubmit={handleSubmit(CreateName)}
                >
                    <AppBar color="default">
                        <DialogTitle id="alert-dialog-title" sx={{ display: "flex", justifyContent: "space-between" }}>
                            Criar Autoridades - {id}
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                    sx={{ textTransform: "none" }}
                                    variant="outlined"
                                    startIcon={<FcCancel />}
                                    onClick={handleClose}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    sx={{ textTransform: "none" }}
                                    variant="outlined"
                                    startIcon={<IoIosSave />}
                                >
                                    Salvar
                                </Button>

                            </Box>

                        </DialogTitle>

                    </AppBar>

                    {/* <Divider /> */}

                    <DialogContent sx={{ mt: "10px" }} >
                        <FormMadsNames
                            control={control}
                            register={register}
                            errors={errors}
                            getValues={getValues}
                            setValue={setValue}
                            setOpen={setOpenSubjects}
                            setField={setField}
                        />

                    </DialogContent>
                    {/* <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                    </DialogActions> */}
                </form>
            </Dialog>
            <ModalSubjects
                setOpen={setOpenSubjects}
                open={openSubjects}
                defaultValues={defaultValues}
                field={field}
                setValue={setValue} />

        </>


    )
}
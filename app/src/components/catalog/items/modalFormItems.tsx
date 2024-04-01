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
    DialogActions,
    Button,
    Divider
} from "@mui/material";

// React
import { useEffect, useState } from "react";

// React Icons
import { IoRemove, IoAddOutline } from "react-icons/io5";
import { FcCancel } from "react-icons/fc";
import { IoIosSave } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

// Services BiblioKeia

// React-Hook-Form
import { useForm } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
import { ZodItem } from "@/schema/bibframe/zodItem"

import { bkapi } from "@/services/api";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

// Next
import { useRouter } from 'next/navigation'
import action from "@/services/catalog/actions";

type SchemaCreateItem = z.infer<typeof ZodItem>;

type Classification = {
    cdd: string;
    cutter: string;
}

interface Props {
    setOpen: Function;
    open: boolean;
    // work: string;
    instance: number | null
    classification: Classification
}

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};


export default function ModalFormItems({ setOpen, open, instance, classification }: Props) {

    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const { setProgress } = useProgress();
    const [id, setId] = useState(null);

    const router = useRouter()

    const defaultValues = {
        items: [{
            cdd: classification.cdd,
            cutter: classification.cutter,
            year: "",
            collection: "",
            shelf: "",
            barcode: ""
        }],
    }
    const [year] = instance.publicationDate
    const {
        control,
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<SchemaCreateItem>({
        resolver: zodResolver(ZodItem),
        defaultValues,
    });


    useEffect(() => {
        bkapi
            .get("/catalog/item/next_id")
            .then(function (response) {
                setValue('items[0].barcode', response.data.barcode);
                setValue('items[0].year', year);
            })
            .catch(function (error) {
                // manipula erros da requisição
                console.error("Er:", error.response);
            })
            .finally(function () {
            });
    }, [open]);

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "items",
    });

    const wFArray = watch("items");

    const handleClose = () => {
        setOpen(false);
    };

    const addField = () => {

        let lastItem = wFArray[wFArray.length - 1]
        let barcode = lastItem.barcode
        let [y, n] = barcode.split("-")
        let nextItem = `${y}-${parseInt(n) + 1}`


        append({
            cdd: lastItem.cdd,
            cutter: lastItem.cutter,
            year: year,
            collection: lastItem.collection,
            shelf: lastItem.shelf,
            barcode: nextItem
        });


    };
    // console.log('E:', errors)

    function CreateItems(data: any) {

        let items = data.items.map((item: any) => {
            let status = {
                status: {
                    "value": "http://id.loc.gov/vocabulary/mstatus/n",
                    "label": "Novo"
                }
            }
            item['adminMetadata'] = status
            return item
        })
        let linstanceOf = instance.instanceOf.id.split("/")
        let instanceOf = linstanceOf[linstanceOf.length - 1]
        let request = {
            "itemOf": instance.id,
            "instanceOf": instanceOf,
            "items": items
        }
        setProgress(true)
        // console.log('d', request)

        bkapi
            .post("catalog/items/create", request, {
                headers: headers,
            })
            .then(function (response) {
                if (response.status === 201) {
                    action()
                    // console.log(response);
                    setMessage("Registro criado com sucesso!")
                    // router.push(`/admin/catalog/work%23${response.data.instanceOf}`);
                }
            })
            .catch(function (error) {
                setTypeAlert("error")
                if (error.response.status === 409) {

                    setMessage("Este registro já existe")
                } else {
                    setMessage(error.response.statusText)
                    console.error("ER:", error.response);
                }
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
                setOpen(false)
            });
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"lg"}
        >
            <DialogTitle id="alert-dialog-title">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                Criar Items
                    <IconButton color="primary" onClick={handleClose}>
                        <IoMdClose />
                    </IconButton>
                </Box>
            </DialogTitle>
            <Divider />
            <form onSubmit={handleSubmit(CreateItems)}>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {fields.map((field, index) => (
                                    <Box key={index} sx={{ display: "flex" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="CDD"
                                                size="small"
                                                {...register(`items.${index}.cdd`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Cutter"
                                                size="small"
                                                {...register(`items.${index}.cutter`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Ano"
                                                size="small"
                                                {...register(`items.${index}.year`)}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Coleção"
                                                size="small"
                                                {...register(`items.${index}.collection`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Localização"
                                                size="small"
                                                {...register(`items.${index}.shelf`)}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="outlined"
                                                label="Registro"
                                                size="small"
                                                {...register(`items.${index}.barcode`)}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <IconButton
                                                aria-label="add"
                                                onClick={addField}
                                                color="primary"
                                            >
                                                <IoAddOutline />
                                            </IconButton>
                                            <IconButton
                                                aria-label="add"
                                                onClick={() => {
                                                    remove(index);
                                                }}
                                                color="primary"
                                            >
                                                <IoRemove />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Box sx={{ display: "flex", gap: "10px", alignItems: "center", pb: "10px", pr: "10px" }}>
                        <Button
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            size="small"
                            onClick={handleClose}
                            startIcon={<FcCancel />}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            sx={{ textTransform: "none" }}
                            variant="outlined"
                            size="small"
                            startIcon={<IoIosSave />}
                        >
                            Salvar
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    )

}
import { bkapi } from "@/services/api";
import {
    Box,
    Grid,
    Alert,
    IconButton,
    DialogContent,
    DialogTitle,
    Dialog,
    DialogActions,
    Button,
    Divider
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from "react";

// React Icons
import { IoMdClose } from "react-icons/io";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useAlert } from "@/providers/alert";

import action from "@/services/catalog/actions";

const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
};

interface Props {
    items: any;
    instanceOf: any
    setOpen: Function;
    open: boolean;
}
export default function ModalItems({ items, instanceOf, setOpen, open }: Props) {

    // console.log(instanceOf)
    const [rowsDelete, setRowsDelete] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const { setProgress } = useProgress();

    const handleDelete = () => {
        let item = items[0]
        let instance = item.itemOf.id.split("#")[2]
        let instanceOf_id = instanceOf.id.split("/")[2]
        let data = {
            instanceOf: instanceOf_id,
            itemOf: instance,
            items: rowsDelete
        }
        // console.log(data)
        setProgress(true)
        bkapi
            .delete("/catalog/items/delete", {data: data} )
            .then(function (response) {
                if (response.status === 201) {
                    action()
                    console.log("RS", response.data);
                    setTypeAlert("success")
                    setMessage("Item excluido com sucesso!")
                }
            })
            .catch(function (error) {
                console.error("ER:", error);
                setTypeAlert("error")
                setMessage(error.response.statusText)
            })
            .finally(function () {
                setProgress(false)
                setOpenSnack(true)
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns: GridColDef[] = [
        { field: 'cdd', headerName: 'CDD', width: 90 },
        { field: 'cutter', headerName: 'Cutter', width: 90 },
        { field: 'year', headerName: 'Ano', width: 90 },
        { field: 'shelf', headerName: 'Localização', width: 90 },
        { field: 'collection', headerName: 'Coleção', width: 110 },
        { field: 'barcode', headerName: 'Registro', width: 90 }
    ]

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth={"lg"}
        >
            <DialogTitle id="alert-dialog-title" >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    Items
                    <IconButton color="primary" onClick={handleClose}>
                        <IoMdClose />
                    </IconButton>
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {items ? 
                <DataGrid
                    rows={items}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setRowsDelete(newRowSelectionModel);
                        if (newRowSelectionModel.length > 0) {
                            setBtnDisabled(false)
                        } else {
                            setBtnDisabled(true)
                        }
                        // console.log(newRowSelectionModel)
                    }}
                /> :
                <Box sx={{ display: "flex", justifyContent: "center"}}>
                    <Alert severity="info">Não há item cadastrados para esta instância.</Alert>
                </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={handleDelete} 
                size="small" 
                variant="outlined"
                disabled={btnDisabled}
                >Excluir items selecionados</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>

    )
}
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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from "react";

// React Icons
import { IoMdClose } from "react-icons/io";



interface Props {
    items: any;
    setOpen: Function;
    open: boolean;
}
export default function ModalItems({ items, setOpen, open }: Props) {

    const [rowsDelete, setRowsDelete] = useState(null);

    const handleDelete = () => {
        console.log(rowsDelete)
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
                        // console.log(newRowSelectionModel)
                    }}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} size="small" variant="outlined">Excluir items selecionados</Button>
                <Button onClick={handleClose} autoFocus>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>

    )
}
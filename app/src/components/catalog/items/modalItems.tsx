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
import { 
    DataGrid, 
    GridColDef, 
    GridRowModesModel,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowModel,
    GridRowsProp,
    GridValueGetterParams,
 } from '@mui/x-data-grid';
import { useState } from "react";

// React Icons
import { IoMdClose } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

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
    setFormItems: Function;
    open: boolean;
}

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
  }

  function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }

export default function ModalItems({ items, instanceOf, setOpen, setFormItems, open }: Props) {

    const [rowsDelete, setRowsDelete] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
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
            .delete("/catalog/items/delete", { data: data })
            .then(function (response) {
                if (response.status === 201) {
                    action()
                    // console.log("RS", response.data);
                    setTypeAlert("success")
                    setMessage("Item excluido com sucesso!")
                    setBtnDisabled(true)
                    setOpen(false)
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

    const addEx = () => {
        setOpen(false);
        setFormItems(true)
    }

    const columns: GridColDef[] = [
        { field: 'cdd', headerName: 'CDD', width: 90 },
        { field: 'cutter', headerName: 'Cutter', width: 90 },
        { field: 'year', headerName: 'Ano', width: 90 },
        { field: 'shelf', headerName: 'Localização', width: 90 },
        { field: 'collection', headerName: 'Coleção', width: 110 },
        { field: 'barcode', headerName: 'Registro', width: 90 }
    ]

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        console.log('hrm: ', newRowModesModel)
        setRowModesModel(newRowModesModel);
      };

      const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      };

      const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      };

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
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
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
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Alert severity="info">Não há item cadastrados para esta instância.</Alert>
                    </Box>
                }
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDelete}
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    disabled={btnDisabled}
                >Excluir items selecionados</Button>

                <Button
                    size="small"
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    
                    onClick={addEx}>Adicionar Exemplares</Button>

                <Button
                    sx={{ textTransform: "none" }}
                    variant="outlined"
                    size="small"
                    onClick={handleClose}
                    startIcon={<FcCancel />}
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>

    )
}
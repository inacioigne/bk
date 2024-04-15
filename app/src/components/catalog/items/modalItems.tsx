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
    GridSlots,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowId,
    GridRowModes,
    GridValueGetterParams,
} from '@mui/x-data-grid';
import { useState } from "react";
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';

// React Icons
import { IoMdClose, IoIosSave } from "react-icons/io";
import { FcCancel } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

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
        console.log(id)
        //   setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
        //   setRowModesModel((oldModel) => ({
        //     ...oldModel,
        //     [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        //   }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" //startIcon={<AddIcon />} 
                onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};
const initialRows: GridRowsProp = [
    {
        id: randomId(),
        name: randomTraderName(),
        age: 25,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 36,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 19,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 28,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
    {
        id: randomId(),
        name: randomTraderName(),
        age: 23,
        joinDate: randomCreatedDate(),
        role: randomRole(),
    },
];

export default function ModalItems({ items, instanceOf, setOpen, setFormItems, open }: Props) {
    // console.log(items)

    const [rowsDelete, setRowsDelete] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const { setOpenSnack, setMessage, setTypeAlert } = useAlert();
    const { setProgress } = useProgress();
    const [rows, setRows] = useState(initialRows);

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

    // const columns: GridColDef[] = [
    //     { field: 'cdd', headerName: 'CDD', width: 90 },
    //     { field: 'cutter', headerName: 'Cutter', width: 90 },
    //     { field: 'year', headerName: 'Ano', width: 90 },
    //     { field: 'shelf', headerName: 'Localização', width: 90 },
    //     { field: 'collection', headerName: 'Coleção', width: 110 },
    //     { field: 'barcode', headerName: 'Registro', width: 90 }
    // ]
    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    const handleCancelClick = (id: GridRowId) => () => {
        
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = items.find((item) => item.id === id);
        // console.log(editedRow)
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
      };

    const columns: GridColDef[] = [
        { field: 'cdd', headerName: 'CDD', width: 90, editable: false },
        {
            field: 'cutter',
            headerName: 'Cutter',
            width: 90,
            // align: 'left',
            // headerAlign: 'left',
            editable: false,
        },
        {
            field: 'year',
            headerName: 'Ano',
            type: 'number',
            width: 90,
            editable: true,
        },
        {
            field: 'shelf',
            headerName: 'Localização',
            width: 100,
            editable: true,
        },
        {
            field: 'collection',
            headerName: 'Coleção',
            width: 150,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Obras Gerais', 'Teses', 'Periodicos'],
        },
        {
            field: 'barcode',
            headerName: 'Registro',
            width: 100,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Edição',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                // console.log('hrm: ', rowModesModel)

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<IoIosSave />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<FcCancel />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<CiEdit />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    // <GridActionsCellItem
                    //     icon={<MdDelete />}
                    //     label="Delete"
                    //     onClick={handleDeleteClick(id)}
                    //     color="inherit"
                    // />,
                ];
            },
        },
    ];

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        
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

        // let data = {
        //     id: updatedRow.id,
        //     creationDate: updatedRow.creationDate,
        //     collection: updatedRow.collection,
        //     shelf: updatedRow.shelf,
        //     barcode: updatedRow.barcode,
        //     itemOf: updatedRow.itemOf.id
        // }
        let data = {
            adminMetadata: {
                creationDate: updatedRow.creationDate[0],
                identifiedBy: updatedRow.id,
                status: {
                    value: "http://id.loc.gov/vocabulary/mstatus/c",
                    label: "Alterado"
                  },
            },
            cdd: updatedRow.cdd,
            cutter: updatedRow.cutter,
            year: updatedRow.year[0],
            collection: updatedRow.collection,
            shelf: updatedRow.shelf,
            barcode: updatedRow.barcode,
            itemOf: updatedRow.itemOf.id
        }

        // bkapi
        //     .put(`/catalog/items/edit/`, updatedRow, {
        //         headers: headers,
        //     })
        //     .then(function (response) {
        //         if (response.status === 201) {
        //             console.log(response.data)
        //             // action()
        //             setMessage("Registro editado com sucesso!")
        //             // router.push(`/admin/catalog/${work_id}`);
        //         }
        //     })
        //     .catch(function (error) {
        //         setTypeAlert("error")
        //         if (error.response.status === 409) {
        //             setMessage("Este registro já existe")
        //         }
        //         console.error("ERs:", error.response);
        //     })
        //     .finally(function () {
        //         setProgress(false)
        //         setOpenSnack(true)
        //     });
        console.log(data)
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
                        // rows={rows}
                        columns={columns}
                        editMode="row"
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        onRowEditStop={handleRowEditStop}
                        processRowUpdate={processRowUpdate}
                        // slots={{
                        //     toolbar: EditToolbar as GridSlots['toolbar'],
                        // }}
                        slotProps={{
                            toolbar: { setRows, setRowModesModel },
                        }}
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
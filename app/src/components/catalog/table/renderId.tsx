import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";

export function RenderId(props: GridRenderCellParams) {
    const { value } = props;
    let id = value.split("#")[1]
    console.log(id)
    
    return (
        <div>{id}</div>
    );
}
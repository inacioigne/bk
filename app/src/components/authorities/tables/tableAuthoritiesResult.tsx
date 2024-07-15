import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GetType from "./getType";
import RenderType from "./renderType";
import RenderCollection from "./RenderCollection";
import RenderAuthority from "./renderAuthority";
import { useState } from "react";
import { SearchAuthority } from "@/services/authorities/searchAuthority";

interface Props {
    rows: any[];
    rowCount: number;
    setRows: Function;
    setRowCount: Function;
    params: URLSearchParams;
    setParams: Function
    // setFacet: Function
}


export function TableAuthoritiesResult({ rows, rowCount, params, setParams, setRows, setRowCount }: Props) {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
      });
    const columns: GridColDef[] = [
        {
            field: "authority",
            renderHeader: () => <strong>{"Autoridade"}</strong>,
            renderCell: RenderAuthority,
            // valueGetter: GetTitle,
            flex: 2
        },
        {
            field: "type",
            renderHeader: () => <strong>{"Tipo"}</strong>,
            renderCell: RenderType(params, setRows, setRowCount),
            valueGetter: GetType,
            flex: 2
        },
        {
            field: "isMemberOfMADSCollection",
            renderHeader: () => <strong>{"Coleção"}</strong>,
            renderCell: RenderCollection,
            // valueGetter: GetType,
            flex: 2
        },
    
    ]
    return (
        <div style={{ height: 'auto', width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                // autoHeight={true}
                // getRowHeight={() => 'auto'}
                paginationMode="server"
                rowCount={rowCount}
                paginationModel={paginationModel}
                pageSizeOptions={[10]}
                onPaginationModelChange={(paginationModel) => {
                    console.log(paginationModel)
                    let page = paginationModel.page == 0 ? 0 : paginationModel.page + 9
                    params.set('start', `${page}`)
                    setParams(params)
                    SearchAuthority(
                        params,
                        setRows,
                        setRowCount
                    );
                    setPaginationModel(paginationModel)
                }}
            />
        </div>
    )
}
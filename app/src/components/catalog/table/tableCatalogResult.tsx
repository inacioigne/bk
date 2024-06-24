"use client";
// React Hooks
import { useState } from "react";
// MUI
import {
  DataGrid,
  // GridRowsProp,
  GridColDef,
  // GridRenderCellParams,
} from "@mui/x-data-grid";
// import { Avatar, Box } from "@mui/material";
import { GridRowParams, MuiEvent, GridCallbackDetails, GridCellParams, GridValueGetter } from '@mui/x-data-grid';

// React Icons
// import { TbUserSearch } from "react-icons/tb";
// import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

// BiblioKeia Services
// import { SearchSubjects } from "@/services/thesarus/searchSubjects";

import { RenderTitle } from "@/components/catalog/table/renderTitle"
import { RenderCover } from "@/components/catalog/table/renderCover"
import { RenderAuthors } from "@/components/catalog/table/renderAuthors"

// Nextjs
import { useRouter } from 'next/navigation'
// import Link from 'next/link'

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useDemoData } from '@mui/x-data-grid-generator';
import { title } from "process";
import {
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { RenderId } from "./renderId";
import { RenderInstances } from "./renderInstances";
import { RenderSubjects } from "./renderSubjects";
import GetTitle from "./getTitile";

interface Props {
  rows: any[];
  rowCount: number;
  setRows: Function;
  setRowCount: Function;
  // setFacetType: Function;
}

export function RenderTest(props: GridRenderCellParams) {
  const { hasFocus, value } = props;

  return (
    <div>{value}</div>
  );
}



export function TableCatalogResult(
  { rows, rowCount, setRows, setRowCount,
  }: Props) {

  const router = useRouter()

  const { setProgress } = useProgress();

  const columns: GridColDef[] = [
    {
      field: "cover",
      width: 140,
      renderHeader: () => "",
      renderCell: RenderCover,
    },
    {
      field: "title",
      renderHeader: () => <strong>{"Título"}</strong>,
      renderCell: RenderTitle,
      valueGetter: GetTitle,
      flex: 2
    },
    {
      field: "authors",
      renderHeader: () => <strong>{"Autoria"}</strong>,
      renderCell: RenderAuthors,
      flex: 2
    },
    {
      field: "subjects",
      renderHeader: () => <strong>{"Assunto"}</strong>,
      renderCell: RenderSubjects,
      flex: 1
    },
    {
      field: "hasInstance",
      renderHeader: () => <strong>{"Edições"}</strong>,
      renderCell: RenderInstances,
      width: 300
    }
  ]

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const handleCellClick = (params: GridCellParams) => {
    console.log(params)

  }


  return <div style={{ height: 'auto', width: '100%' }}>
    <DataGrid
      columns={columns}
      rows={rows}
      getRowHeight={() => 'auto'}
      // onCellClick={handleCellClick}
    />
  </div>

  // return <DataGrid
  //   rows={rows}
  //   getRowHeight={() => 'auto'}
  //   rowCount={rowCount}
  //   onRowClick={(params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => {
  //     setProgress(true)
  //     let id = params.id.replace('work#', '')
  //     // console.log("ID: ", id)
  //     router.push(`/admin/catalog/${id}`)
  //   }}
  //   columns={columns}
  //   paginationModel={paginationModel}
  //   paginationMode="server"
  //   onPaginationModelChange={(paginationModel) => {
  //     // console.log(paginationModel)
  //     let page = paginationModel.page == 0 ? 0 : paginationModel.page + 4
  //     // paramsAuthority.set('start', page)
  //     // SearchSubjects(paramsAuthority, setRows, setRowCount, setFacetType);
  //     setPaginationModel(paginationModel)
  //   }}
  //   pageSizeOptions={[5]}
  //   sx={{ cursor: "pointer" }}
  // />;

}
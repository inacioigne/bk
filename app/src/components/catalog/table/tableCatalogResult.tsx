"use client";
// React Hooks
import { useState } from "react";
// MUI
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Avatar, Box } from "@mui/material";
import { GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';

// React Icons
import { TbUserSearch } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

// BiblioKeia Services
import { SearchSubjects } from "@/services/thesarus/searchSubjects";

import { RenderTitle } from "@/components/catalog/table/renderTitle"
import { RenderCover } from "@/components/catalog/table/renderCover"
import { RenderAuthors } from "@/components/catalog/table/renderAuthors"





// Nextjs
import { useRouter } from 'next/navigation'
// import Link from 'next/link'

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useParmasAutority } from "@/providers/paramsAuthority"

interface Props {
  rows: any[];
  rowCount: number;
  setRows: Function;
  setRowCount: Function;
  // setFacetType: Function;
}

export function TableCatalogResult(
  { rows, rowCount, setRows, setRowCount,
  }: Props) {

  const router = useRouter()

  const { setProgress } = useProgress();

  const columns: GridColDef[] = [
    {
      field: "cover",
      // flex: 1,
      renderHeader: () => "",
      renderCell: RenderCover,
    },
    {
      field: "title",
      flex: 2,
      renderHeader: () => <strong>{"Título"}</strong>,
      renderCell: RenderTitle,
    },
    {
      field: "authors",
      flex: 1,
      renderHeader: () => <strong>{"Autores"}</strong>,
      renderCell: RenderAuthors,
    },
    {
      field: "year",
      flex: 1,
      renderHeader: () => <strong>{"Ano"}</strong>,
      // renderCell: RenderType,
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  return <DataGrid
    rows={rows}
    getRowHeight={() => 'auto'}
    rowCount={rowCount}
    // onRowClick={(params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => {
    //   setProgress(true)
    //   router.push(`/admin/authority/subjects/${params.id}`)
    // }}
    columns={columns}
    paginationModel={paginationModel}
    paginationMode="server"
    onPaginationModelChange={(paginationModel) => {
      // console.log(paginationModel)
      let page = paginationModel.page == 0 ? 0 : paginationModel.page + 4
      // paramsAuthority.set('start', page)
      // SearchSubjects(paramsAuthority, setRows, setRowCount, setFacetType);
      setPaginationModel(paginationModel)
    }}
    pageSizeOptions={[5]}
  />;

}
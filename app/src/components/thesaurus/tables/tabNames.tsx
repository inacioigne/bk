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
import { Button, Avatar, Box } from "@mui/material";
import { GridRowParams, MuiEvent, GridCallbackDetails } from '@mui/x-data-grid';

// React Icons
import { TbUserSearch } from "react-icons/tb";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

// BiblioKeia Services
import { SearchNames } from "@/services/thesarus/searchNames";

// Nextjs
import { useRouter } from 'next/navigation'
// import Link from 'next/link'

function RenderLabel(props: GridRenderCellParams<any, Object>) {
  const { hasFocus, value } = props;
  // console.log(value)

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name[0]}`,
    };
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        cursor: "pointer",
      }}
    >
      <Avatar {...stringAvatar(value)} />
      {value}
    </Box>
  );
}

function RenderType(props: GridRenderCellParams<any, String>) {
  const { hasFocus, value } = props;
  let obj = {
    PersonalName: { name: "Nome Pessoal", icon: <TbUserSearch /> },
    CorporateName: {
      name: "Nome Coorporativo",
      icon: <HiOutlineBuildingOffice2 />,
    },
  };
  // console.log(obj)

  return (
    <div>
      {/* <Button startIcon={obj[`${value}`].icon} sx={{ textTransform: "none" }}>
        {obj[`${value}`].name}
      </Button> */}
      {value}
    </div>
  );
}

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";
import { useParmasAutority } from "@/providers/paramsAuthority"

interface Props {
  rows: any[];
  rowCount: number;
  setRows: Function;
  setRowCount: Function;
  setFacetType: Function;
  setFacetAffiliation: Function;
  setOccupation: Function;
}

export function TabName({ rows, rowCount, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation }: Props) {

  const router = useRouter() 

  const { paramsAuthority } = useParmasAutority()
  const { setProgress } = useProgress();

  const columns: GridColDef[] = [
    {
      field: "authority",
      flex: 2,
      renderHeader: () => <strong>{"Nome"}</strong>,
      renderCell: RenderLabel,
    },
    {
      field: "type",
      flex: 1,
      renderHeader: () => <strong>{"Tipo"}</strong>,
      renderCell: RenderType,
    },
  ];

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 3,
  });

  return <DataGrid
    rows={rows}
    rowCount={rowCount}
    onRowClick={(params: GridRowParams, event: MuiEvent, details: GridCallbackDetails) => {
      setProgress(true)
      router.push(`/admin/authority/${params.id}`) 
    }}
    columns={columns}
    paginationModel={paginationModel}
    paginationMode="server"
    onPaginationModelChange={(paginationModel) => {
      console.log(paginationModel)
      let page = paginationModel.page == 0 ? 0 : paginationModel.page + 2
      paramsAuthority.set('start', page)
      SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);
      setPaginationModel(paginationModel)
    }}
    pageSizeOptions={[3]}
  />;

}
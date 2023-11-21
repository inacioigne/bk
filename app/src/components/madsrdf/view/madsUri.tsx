"use client";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Typography, Tooltip, IconButton, Dialog, DialogTitle, Divider } from "@mui/material";


import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { FcImport } from "react-icons/fc";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

import { schemaUri } from "@/schema/authority";

// Next
import Link from "next/link";
import { useRouter } from 'next/navigation'

import { logos } from "@/share/objLogos";
import { useState } from "react";

import { LocAuthority } from "@/services/importation/locAuthority"

import CardLoc from "@/components/cards/cardLoc"

type Props = {
  uri: schemaUri[] | schemaUri;
  label: string;
};

type PropsImportAction = {
  uri: string | undefined;
  // setOpen: Function
};


function ImportAction({ uri }: PropsImportAction) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(false)
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter()
  const [hit, setHit] = useState(null)
  const HandleImport = () => {
    // LocAuthority(setHit, uri)
    router.push(`/admin/authority/importation/loc?uri=${uri}`)
    // setOpen(true)
    // console.log("ACTION", uri)


  }
  return (
    <>
      <Tooltip title="Importar registro">
        <IconButton
          aria-label="action"
          size="small"
          sx={{ ml: "10px" }}
          onClick={HandleImport}
        >
          <FcImport />
        </IconButton>
      </Tooltip>
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="alert-dialog-title">
          Importar Autoridades - Library of Congress
        </DialogTitle>
        <Divider />
        {hit && <CardLoc hit={hit} setHit={setHit} setForm={setForm} />}
      </Dialog> */}
    </>



  )
}

export default function MadsUri({ uri, label }: Props) {

  return (
    <>
      <TreeView
        defaultCollapseIcon={<AiOutlineArrowDown />}
        defaultExpandIcon={<AiOutlineArrowUp />}
        defaultExpanded={["1"]}
      >
        <TreeItem
          nodeId="1"
          label={
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              {label}
            </Typography>
          }
        >
          <Box
            sx={{
              flexGrow: 1,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {Array.isArray(uri) ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {uri.map((e, index) => (
                  // <Link key={index} href={e.base === 'bk' ?
                  //   `/admin/authority/subjects/${e.uri.split("/")[5]}` : `${e.uri}`} target={e.base === 'bk' ? "_self" : "_blank"}>
                  <StyledTreeItem
                  key={index}
                    nodeId={`${index + 5}`}
                    labelText={`${e.label}`}
                    labelIcon={logos[`${e.base}`]}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    colorForDarkMode="#B8E7FB"
                    bgColorForDarkMode="#071318"
                    action={e.base === 'loc' ? (
                      <ImportAction uri={e.uri} />
                    )
                      : null}
                  />
                  // </Link>
                ))}
              </Box>
            ) : (
              <Link href={`${uri.uri}`} target="_blank">
                <StyledTreeItem
                  nodeId={"5"}
                  labelText={uri.label}
                  labelIcon={logos[`${uri.base}`]}
                  color="#1a73e8"
                  bgColor="#e8f0fe"
                  colorForDarkMode="#B8E7FB"
                  bgColorForDarkMode="#071318"
                />
              </Link>
            )}
          </Box>
        </TreeItem>
      </TreeView>

    </>
  );
}
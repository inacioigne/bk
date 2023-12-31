"use client";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Typography } from "@mui/material";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

import { schemaUri } from "@/schema/authority";

// BiblioKeia Services
import { LocAuthority } from "@/services/importation/locAuthority"

// Next
import Link from "next/link";

import { logos } from "@/share/objLogos";

// type Uri = {
//   base: string;
//   label: string;
//   uri: string;
// }

type Props = {
  uri: schemaUri[] | schemaUri;
  label: string;
  setHit: Function
};

export default function MadsLoc({ uri, label, setHit }: Props) {
  // console.log(uri)
  return (
    <TreeView
      defaultCollapseIcon={<AiOutlineArrowDown />}
      defaultExpandIcon={<AiOutlineArrowUp />}
      defaultExpanded={["1"]}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
      }}
    >
      <TreeItem
        nodeId="1"
        label={
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            {label}
          </Typography>
        }
      >
        {Array.isArray(uri) ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {uri.map((e, index) => (
              <StyledTreeItem
                key={index}
                nodeId={`${index + 5}`}
                labelText={`${e.label}`}
                labelIcon={logos[`${e.base}`]}
                color="#1a73e8"
                bgColor="#e8f0fe"
                colorForDarkMode="#B8E7FB"
                bgColorForDarkMode="#071318"
                onClick={() => {
                  // console.log(e.uri)
                  LocAuthority(setHit, e.uri)
                }}
              />
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
      </TreeItem>
    </TreeView>
  );
}
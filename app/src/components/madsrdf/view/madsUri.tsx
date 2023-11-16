"use client";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Typography } from "@mui/material";

import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

import { schemaUri } from "@/schema/authority";

// Next
import Link from "next/link";

import { logos } from "@/share/objLogos";

type Props = {
  uri: schemaUri[] | schemaUri;
  label: string;
};

export default function MadsUri({ uri, label }: Props) {
  // console.log(uri)
  return (
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
                <Link key={index} href={`${e.uri}`} target="_blank">
                  <StyledTreeItem
                    nodeId={`${index + 5}`}
                    labelText={`${e.label}`}
                    labelIcon={logos[`${e.base}`]}
                    color="#1a73e8"
                    bgColor="#e8f0fe"
                    colorForDarkMode="#B8E7FB"
                    bgColorForDarkMode="#071318"
                  />
                </Link>
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
  );
}
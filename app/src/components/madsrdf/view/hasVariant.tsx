"use client";
// MUI Components
import { Typography, Box } from "@mui/material";
import {
  TreeItem,
  TreeItemProps,
  treeItemClasses,
} from "@mui/x-tree-view/TreeItem";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

import { schemaVariant } from "@/schema/authority";

import StyledTreeItem from "@/components/baseMui/styledTreeItem";

type Props = {
  hasVariant: schemaVariant[];
};

export default function HasVariant({ hasVariant }: Props) {
  // console.log(hasVariant)
  return (

      <TreeView
        aria-label="hasVariant"
        defaultCollapseIcon={<AiOutlineArrowDown />}
        defaultExpandIcon={<AiOutlineArrowUp />}
        defaultExpanded={['1']}
        sx={{
          flexGrow: 1,
          maxHeight: 300,
          overflowY: "auto",
        }}
      >
        <TreeItem
          nodeId="1"
          label={
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Variantes do nome:
            </Typography>
          }
        >
          {hasVariant.map((variant, index) => (
            <StyledTreeItem
            key={index}
              nodeId={`${index + 5}`}
<<<<<<< HEAD
<<<<<<< HEAD
              // labelText={variant}
              labelText={variant.variantLabel}
=======
              labelText={variant}
              // labelText={variant.variantLabel}
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
=======
              labelText={variant}
              // labelText={variant.variantLabel}
>>>>>>> 8834fb335e24e2e6eafb1266f82f749cd3fccae1
              // labelIcon={BsLink45Deg}
              color={"#1a73e8"}
              bgColor="#e8f0fe"
              colorForDarkMode="#B8E7FB"
              bgColorForDarkMode="#071318"
            />
          ))}
        </TreeItem>
      </TreeView>
  );
}

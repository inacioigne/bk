import {
  Box
} from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';
import StyledTreeItem from "@/components/baseMui/styledTreeItem"

// BiblioKeia Services
import { SearchNames } from "@/services/thesarus/searchNames";

// Types BiblioKeia
// import Facet from "@/utils/types"

// Reacts Icons
import { RiFilterLine } from 'react-icons/ri';
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

// Providers BiblioKeia
import { useParmasAutority } from "@/providers/paramsAuthority"
// import { Console } from "console";

interface Types {
  [chave: string]: string;
}

interface Facet {
  name: string;
  count: number;
}

interface FacetProps {
  facets: Facet[];
  setRows: Function;
  setFacetType: Function;
  setRowCount: Function;
  setFacetAffiliation: Function;
  setOccupation: Function;
  setCleanOn: Function;
}
const FacetTypeNames: React.FC<FacetProps> = ({
  facets,
  setRows,
  setFacetType,
  setFacetAffiliation,
  setOccupation,
  setRowCount,
  setCleanOn
}) => {

  const { paramsAuthority, updateParamsAuthority } = useParmasAutority()

  const obj: Types = {
    PersonalName: "Nome Pessoal",
    CorporateName: "Nome Coorporativo",
    Topic: "Topic"
  };

  const handleFacet = (facet: Facet, params: URLSearchParams) => {

    setCleanOn(true)


    if (!params.getAll('fq').includes(`type:${facet.name}`)) {
      params.append('fq', `type:${facet.name}`)
      SearchNames(paramsAuthority, setRows, setRowCount, setFacetType, setFacetAffiliation, setOccupation);
    }
  }

  return (
    <TreeView
      defaultCollapseIcon={<AiOutlineArrowDown />}
      defaultExpandIcon={<AiOutlineArrowUp />}
      sx={{
        flexGrow: 1, overflowY: 'auto'
      }}
    >
      <StyledTreeItem nodeId="1" labelText="Tipo" labelIcon={RiFilterLine}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {
            facets?.map((facet, index) => (
              <StyledTreeItem
                key={index}
                nodeId={`${index + 2}`}
                labelText={`${obj[facet.name]}`}
                labelInfo={facet.count}
                color="#a250f5"
                bgColor="#f3e8fd"
                colorForDarkMode="#D9B8FB"
                bgColorForDarkMode="#100719"
                onClick={() => {
                  handleFacet(facet, paramsAuthority)
                }} />
            ))
          }
        </Box>
      </StyledTreeItem>
    </TreeView>
  )


}

export default FacetTypeNames;
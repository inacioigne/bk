// MUI Components
import { Typography, Box } from "@mui/material";
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import StyledTreeItem from "@/components/baseMui/styledTreeItem"

import { logos } from "@/share/objLogos"

// import { LocAuthority } from "@/services/importation/locAuthority"

// BiblioKeia Services
import { solr } from "@/services/solr";

interface ElementMads {
    label: string
    base: string
    uri: string
    type?: string
}

type Props = {
    label: string
    setDoc: Function
    items: ElementMads[]|ElementMads
};

export default function ListMadsBk({ label, setDoc, items }: Props) {

    const HandleClick = (e: ElementMads) => {

        if (e.base == 'bk') {
            let uri = e.uri.split("/")
            let id = uri[uri.length - 1]
            const params = new URLSearchParams();
            params.set("q", `id:${id}`);
            params.set("fl", "*,[child]");
            console.log(id)
            solr.get("authority/query?", { params: params })
                .then(function (response) {
                    
                    const [doc] = response.data.response.docs;
                    console.log("RESub:", response.data)
                    setDoc(doc)
                })
                .catch(function (error) {
                    console.error(error);
                })
                .finally(function () {
                    // setProgress(false)
                });
        }
    }

    return (
        <TreeView
            defaultCollapseIcon={<AiOutlineArrowDown />}
            defaultExpandIcon={<AiOutlineArrowUp />}
            defaultExpanded={['1']}
        >
            <TreeItem
                nodeId="1"
                label={
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        {label}
                    </Typography>
                }
            >
                { Array.isArray(items) ? 
                <Box
                    sx={{
                        flexGrow: 1,
                        maxHeight: 300,
                        overflowY: "auto",
                    }}
                >
                    {items.map((e, index) => (
                        <div key={index} onClick={() => { HandleClick(e) }}>
                            <StyledTreeItem
                                nodeId={`${index + 5}`}
                                labelText={e.label}
                                labelIcon={logos[`${e.base}`]}
                                color="#1a73e8"
                                bgColor="#e8f0fe"
                                colorForDarkMode="#B8E7FB"
                                bgColorForDarkMode="#071318"
                            />
                        </div>
                    ))}
                </Box> :  <StyledTreeItem
                                nodeId={"6"}
                                labelText={items.label}
                                labelIcon={logos[`${items.base}`]}
                                color="#1a73e8"
                                bgColor="#e8f0fe"
                                colorForDarkMode="#B8E7FB"
                                bgColorForDarkMode="#071318"
                            />}
            </TreeItem>
        </TreeView>

    )
}
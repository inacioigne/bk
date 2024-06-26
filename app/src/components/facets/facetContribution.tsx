import { SearchCatalog } from "@/services/catalog/searchCatalog";
import { Box, List, ListItem, ListItemText, ListItemButton, Divider, ListItemIcon, Checkbox, Typography, Chip, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Buckets {
    val: string
    count: number
    uri: { buckets: Buckets[] }
}

interface Props {
    facet: any
    // buckets: Buckets[]
    // setParams: Function
    // params: URLSearchParams
    // setRows: Function
    // setRowCount: Function
    // setFacet: Function
    setRefine: Function
    checked: number[]
    setChecked: Function
    filters: any[]
    setFilters: Function
}

export default function FacetContribution({
    facet,
    // buckets,
    // setParams,
    // params,
    // setRows,
    // setRowCount,
    // setFacet,
    setRefine,
    checked,
    setChecked,
    filters,
    setFilters
}: Props) {

    const handleToggle = (bucket: Buckets, index: number) => () => {
        const [uri] = bucket.uri.buckets
        const currentIndex = checked.indexOf(uri.val);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(uri.val);
            filters.push({ id: index, uri: uri.val, type: 'contribution', status: 'inative' })
        } else {
            newChecked.splice(currentIndex, 1);
            filters.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        setFilters(filters)
        newChecked.length > 0 ? setRefine(true) : setRefine(false)
    };

    return (
        <Box >
            <Accordion
                defaultExpanded
                disableGutters
                square>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ borderBottom: 'solid 1px gray' }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        Autores:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense >
                        {facet.contribution.buckets.map((bucket, index) => (
                            <ListItem
                                key={index}
                                secondaryAction={bucket.count}
                                disablePadding
                                dense
                            >
                                <ListItemButton dense
                                    onClick={handleToggle(bucket, index)} >
                                    <ListItemIcon sx={{ minWidth: 0 }}>
                                        <Checkbox
                                            edge="start"
                                            // checked={bucket.checked}
                                            checked={checked.indexOf(bucket.uri.buckets[0].val) !== -1}
                                            // tabIndex={-1}
                                            disableRipple
                                        // onClick={}
                                        // inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={bucket.val}
                                    // secondary={checked.indexOf(bucket.uri.buckets[0].val) !== -1 && <Chip label="Limitado" size="small"/>} 
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                </AccordionDetails>
            </Accordion>
        </Box>

    )
}
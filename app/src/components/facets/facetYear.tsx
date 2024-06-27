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
    setRefine: Function
    checked: number[]
    setChecked: Function
    filters: any[]
    setFilters: Function
}

export default function FacetYear({
    facet,
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
        <Box>
            <Accordion
                defaultExpanded
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ borderBottom: 'solid 1px gray' }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        Assuntos:
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List dense >
                {facet.year.buckets.map((bucket, index) => (
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
                                    checked={checked.indexOf(bucket.uri.buckets[0].val) !== -1}
                                    // disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={bucket.val}
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
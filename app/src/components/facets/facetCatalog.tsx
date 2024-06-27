import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface Buckets {
    val: string
    count: number
    uri: { buckets: Buckets[] }
}

interface Props {
    type: string
    label: string
    buckets: Buckets[]
    checked: string[]
    filters: any[]
    setFilters: Function
    setChecked: Function
    setRefine: Function
}

const theme = createTheme({
    components: {
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    padding: '0',
                },
            },
        },
    },
});

export default function FacetCatalog({ type, label, buckets, checked, setChecked, setFilters, filters, setRefine }: Props) {
    const handleToggle = (bucket: Buckets, index: number) => () => {
        const [uri] = bucket.uri.buckets
        const currentIndex = checked.indexOf(uri.val);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(uri.val);
            filters.push({ id: index, uri: uri.val, type: type, status: 'inative' })
        } else {
            newChecked.splice(currentIndex, 1);
            filters.splice(currentIndex, 1);
        }
        setChecked(newChecked);
        setFilters(filters)
        newChecked.length > 0 ? setRefine(true) : setRefine(false)
    };
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ mt: 1 }}>
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
                            {label}:
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense >
                            {buckets.map((bucket, index) => (
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
        </ThemeProvider>
    )
}
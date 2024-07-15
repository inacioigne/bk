"use client"
import { SearchAuthority } from "@/services/authorities/searchAuthority";
import { SearchCatalog } from "@/services/catalog/searchCatalog";
import { Box, Button, Collapse, Divider } from "@mui/material";

interface Props {
    refine: boolean
    setRefine: Function
    params: URLSearchParams
    setParams: Function
    setRows: Function
    setRowCount: Function
    setFacet: Function
    checked: number[]
    setChecked: Function
    filters: string[]
    setFilters: Function
    setClear: Function
}

export default function BtnRefineAuthority({
    refine,
    setRefine,
    params,
    setParams,
    setRows,
    setRowCount,
    setFacet,
    checked,
    setChecked,
    filters,
    setFilters,
    setClear }: Props) {

    const handleExclude = () => {
        filters.forEach(filter => {
            if (!params.has('fq', `{!parent which=isPartOf:Work}uri:"${filter.uri}"`)) {
                params.append("fq", `-{!parent which=isPartOf:Work}uri:"${filter.uri}"`);
                filter['status'] = 'active'
            }
        });
        let fqs = filters.map(filter => {
            let fq = `-{!parent which=isPartOf:Work}uri:"${filter.uri}"`
            filter['status'] = 'active'
            return fq
        })
        let stringFilters = `(${fqs.join(' OR ')})`
        params.delete('fq')
        params.append("fq", 'isPartOf:Work');
        params.append("fq", stringFilters);
        setParams(params)
        console.log(filters)

        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        setChecked([])
        setRefine(false)
    }

    const handleLimit = (params: URLSearchParams, filters: any[]) => () => {
        let fqs = new Array
        filters.forEach(filter => {
            if (filter.status === 'inative') {
                let fq = `type:${filter.val}`
                fqs.push(fq)
                filter['status'] = 'active'
            }
            // console.log(filter)
        });
        let stringFilters = `(${fqs.join(' OR ')})`
        params.delete('fq')
        // params.append("fq", 'type:Authority');
        params.append("fq", stringFilters);
        setParams(params)
        SearchAuthority(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        console.log(params.getAll('fq'))
        const newChecked = filters.map((filter, index) => {
            if (filter.status === 'active') {
                return filter.val
            } else {
                return -1
            }
        })
        setChecked(newChecked)
        setRefine(false)
        setClear(true)
    }

    const handleCancel = () => {
        console.log(filters)
        const newChecked = filters.map((filter) => {
            if (filter.status === 'active') {
                return filter.id
            } else {
                return -1
            }
        })
        setChecked(newChecked)
        setFilters([])
        setRefine(false)
    }


    return (
        <Collapse in={refine} >
            <Box
                sx={refine ? { display: 'block' } : { display: 'none' }}>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={handleExclude}
                    >
                        Excluir
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{ textTransform: 'none' }}
                        onClick={handleLimit(params, filters)}>
                        Limitar
                    </Button>
                </Box>
            </Box>
        </Collapse>
    )
}
import { SearchCatalog } from "@/services/catalog/searchCatalog";
import { Box, Button, Collapse, Divider } from "@mui/material";
import { useEffect } from "react";

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
}

export default function BtnRefine({
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
    setFilters }: Props) {

    useEffect(() => {


    }, [params])
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
        console.log(params.getAll('fq'))
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
            let fq = `{!parent which=isPartOf:Work}uri:"${filter.uri}"`
            fqs.push(fq)
            filter['status'] = 'active'
            // if (filter.status === 'inative') {
            //     fqs.push(fq)
            //     filter['status'] = 'active'
            // }
        });
        let stringFilters = `(${fqs.join(' OR ')})`
        params.delete('fq')
        params.append("fq", 'isPartOf:Work');
        params.append("fq", stringFilters);
        setParams(params)
        // console.log(filters)
        // 
        SearchCatalog(
            params,
            setRows,
            setRowCount,
            setFacet
        );
        const newChecked = filters.map((filter, index) => {
            // console.log(filter)
            if (filter.status === 'active') {
                return filter.uri
            } else {
                return -1
            }
        })
        setChecked(newChecked)
        setRefine(false)
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
        <Collapse in={refine}>
            <Box sx={refine ? { display: 'block' } : { display: 'none' }}>
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
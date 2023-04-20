import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { SetStateAction } from 'react';

const Paginacion: React.FC<IPropsPaginacion> = ({children, page, setPage, countPage}) => {

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }

    return ( 
        <Box sx={{ display: 'flex', flexDirection: 'column', marginY: '1rem' }}>
            {
                countPage > 1 && <Pagination count={countPage} page={page} boundaryCount={2} sx={{ display: 'flex', justifyContent: 'center' }} onChange={handleChangePage} />
            }
            {children}
            {
                countPage > 1 && <Pagination count={countPage} page={page} boundaryCount={2} sx={{ display: 'flex', justifyContent: 'center' }} onChange={handleChangePage} />
            }
        </Box>
     );
}
 
export default Paginacion;

interface IPropsPaginacion {
    children: React.ReactNode;
    page: number;
    setPage: React.Dispatch<SetStateAction<number>>;
    countPage: number;
}
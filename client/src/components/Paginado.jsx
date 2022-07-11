import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useSelector } from "react-redux";

export default function Paginado ({videogamesPerPage, allVideogames,paginado}) {

    var notModifiedPageNumber=useSelector((state)=> state.notModifiedPageNumber);
    
    const pageNumbers = [];
        for(let i=1; i<=Math.ceil(allVideogames / videogamesPerPage); i++){
            pageNumbers.push(i);
        }

    const handleChange = (event: SelectChangeEvent,page:number) => {
        paginado(page)
        };   

        return(
                <Stack sx={{ mx: "auto",mb:3, width: 200 }} spacing={2}>
                  <Pagination page={notModifiedPageNumber} count={pageNumbers.length} color="secondary" onChange={handleChange} />
                </Stack>  
        )
}



                    
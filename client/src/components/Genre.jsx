import React from "react";
import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenresFromDb,filterVideogamessByGenre,getPageNumber,getInitialPageNumber,getBackPage} from "../actions/index";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Genre(){

	const [genre, setGenre] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
    	setGenre(event.target.value);
    	dispatch(filterVideogamessByGenre(event.target.value));
    	dispatch(getPageNumber(1)) ;
    	dispatch(getInitialPageNumber(1));
    	dispatch(getBackPage(false));
    };

	const dispatch = useDispatch();

     useEffect(() => {
       dispatch(getGenresFromDb()); 
   }, []);

     const allGenres=useSelector((state)=> state.genres);
     const sortGenres=allGenres.sort();

  return(

  		<div>
	      <FormControl sx={{ m: 1, minWidth: 120 }}>
	        <InputLabel id="demo-simple-select-autowidth-label">Género</InputLabel>
	        <Select
	          labelId="demo-simple-select-autowidth-label"
	          id="demo-simple-select-autowidth"
	          value={genre}
	          onChange={handleChange}
	          autoWidth
	          label="Genre"
	        >
	          {/*<MenuItem value=""><em>Ninguno</em></MenuItem>*/}
	          <MenuItem value={"all"}>Todos</MenuItem>
	          {sortGenres.map((el) => { 
                    return (
                          <MenuItem value={el} key={el}>{el}</MenuItem>                
                   );
              })}
	        </Select>
	      </FormControl>
	    </div>
  	)
}
			
          
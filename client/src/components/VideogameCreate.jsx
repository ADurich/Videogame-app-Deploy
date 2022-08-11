import React, {useState, useEffect} from 'react';
import {postVideogame,getGenres,getPlatforms,getInitialPageNumber,noVideogamesLoaded,getBackPage,initializeVideogames} from '../actions/index'
import { useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import {Link} from "react-router-dom";
import Box from '@mui/material/Box';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




export default function VideogameCreate(){

	const dispatch = useDispatch();
	let history=useHistory();

	useEffect(() => {
       dispatch(getGenres()); 
       dispatch(getPlatforms()); 
   }, []);

	const allGenres=useSelector((state)=> state.genresFromApi);
	const allPlatforms=useSelector((state)=> state.platforms);
    //const [error,setError] = useState({});
    const [newVideogame,setNewVideogame] = useState({
        name: "",
        description: "",
        platforms:[],
        genre:[],
        img:"",
        //released:""
    })
   const [open,setOpen] = useState(false)	

//-------------------------------------------------------------
    function handleChange(event){
    	let inputValue=event.target.value;
    	if(event.target.name==='name'){
    		inputValue=inputValue.charAt(0).toUpperCase()+inputValue.slice(1)
    	}
       setNewVideogame({
           ...newVideogame,
           [event.target.name] : inputValue
       })    
   }

//-------------------------------------------------------------

const [platform, setPlatform] = React.useState([]);

	  const handleCheck = (event) => {
	    const {
	      target: { value },
	    } = event;
	    setPlatform(
	      typeof value === 'string' ? value.split(',') : value,
	    );
        setNewVideogame({
            ...newVideogame,
            //platforms: [...newVideogame.platforms,event.target.value[(event.target.value.length)-1]] 
            platforms: event.target.value
        })
	  };
//-------------------------------------------------------------
const [genres, setGenres] = React.useState([]);

	  const handleCheckGenre = (event) => {
	    const {
	      target: { value },
	    } = event;
	    setGenres(
	      typeof value === 'string' ? value.split(',') : value,
	    );

            setNewVideogame({
                ...newVideogame,
                //genre: [...newVideogame.genre,event.target.value[(event.target.value.length)-1]]
             	genre: event.target.value
                       })                  
	   };	  


//-------------------------------------------------------------
function backToPage(){
    dispatch(getBackPage(false));
    dispatch(noVideogamesLoaded(true));   
   }
//-------------------------------------------------------------

const handleClose = () => {
    setOpen(false);
  };

//-------------------------------------------------------------

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newVideogame)
    
  

    if(newVideogame.name!==""&&newVideogame.description!==""&&newVideogame.platforms.length>0&&newVideogame.genre.length>0){
    	dispatch(postVideogame(newVideogame));
	    dispatch(noVideogamesLoaded(false));
	    dispatch(initializeVideogames());

	                    setNewVideogame({
	                        name: "",
	                        description: "",
	                        genre:[],
	                        platforms:[],
	                        img:"",
	                        //released:""
	                    });
	                    setPlatform([]);
	                    setGenres([]);
	                    
	   history.push({pathname: '/Home'}) 
    }else{
    	setOpen(true);
    }
                   
  };

	return(

			<> 				  
	            <ThemeProvider theme={theme}>
			      <Container component="main" maxWidth="xs">
			        <CssBaseline />
			        <Box
			          sx={{
			            marginTop: 8,
			            display: 'flex',
			            flexDirection: 'column',
			            alignItems: 'center',
			          }}
			        >
			          <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
			            <VideogameAssetIcon />
			          </Avatar>
			          <Typography component="h1" variant="h5">
			            Crear videojuego
			          </Typography>    
			          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
			            <TextField
			              margin="normal"
			              required
			              fullWidth
			              id="email"
			              label="Nombre"
			              autoComplete="email"
			              autoFocus
			              value= {newVideogame.name}
                          name="name"
                          onChange={(e)=>handleChange(e)}
			            />
			            <TextField
				            sx={{
				            background:"white"
				          }}
			              margin="normal"
			              required
			              fullWidth
				          id="outlined-multiline-static"
				          label="Descripción"
				          multiline
				          rows={4}
				          value= {newVideogame.description}
                          name= "description"
                          onChange={(e)=>handleChange(e)}
				          
				        />
			            <TextField
			              margin="normal"
			              required
			              fullWidth
			              name="img"
			              label="Imágen"
			              type="text"
			              id="password"
			              autoComplete="current-password"
			              value= {newVideogame.img}
                          onChange={(e)=>handleChange(e)}
			            />
			            
			            <FormControl fullWidth margin="normal">
					        <InputLabel id="demo-multiple-checkbox-label">Plataformas</InputLabel>
					        <Select
					          labelId="demo-multiple-checkbox-label"
					          id="demo-multiple-checkbox"
					          multiple
					          value={platform}
					          onChange={handleCheck}
					          input={<OutlinedInput label="Tag" />}
					          renderValue={(selected) => selected.join(', ')}
					          MenuProps={MenuProps}
					        >
					          {allPlatforms.map((el) => (
					            <MenuItem key={el} value={el}>
					              <Checkbox checked={platform.indexOf(el) > -1} />
					              <ListItemText primary={el} />
					            </MenuItem>
					          ))}
					        </Select>
					    </FormControl>
					    <FormControl fullWidth margin="normal">
					        <InputLabel id="demo-multiple-checkbox-label">Géneros</InputLabel>
					        <Select
					          labelId="demo-multiple-checkbox-label"
					          id="demo-multiple-checkbox"
					          multiple
					          value={genres}
					          onChange={handleCheckGenre}
					          input={<OutlinedInput label="Tag" />}
					          renderValue={(selected) => selected.join(', ')}
					          MenuProps={MenuProps}
					        >
					          {allGenres.map((el) => (
					            <MenuItem key={el} value={el}>
					              <Checkbox checked={genres.indexOf(el) > -1} />
					              <ListItemText primary={el} />
					            </MenuItem>
					          ))}
					        </Select>
					    </FormControl>
					    <Button
			              type="submit"
			              fullWidth
			              variant="contained"
			              sx={{ mt: 3, mb: 2 }}
			            >
			              Crear
			            </Button> 			            
			          </Box>
			        </Box>
			      </Container>
			    </ThemeProvider>
	            
			    <Dialog
			        open={open}
			        onClose={handleClose}
			        aria-labelledby="alert-dialog-title"
			        aria-describedby="alert-dialog-description"
			      >
			        <DialogContent>
			          <DialogContentText id="alert-dialog-description">
			            Completar los campos requeridos
			          </DialogContentText>
			        </DialogContent>
			        <DialogActions>
			          <Button onClick={handleClose}>Cerrar</Button>
			        </DialogActions>
			     </Dialog>

	            <Link to= '/Home'>
            		<Button variant="contained" onClick={backToPage}>Volver</Button>
        		</Link>  
         </>   
		)

	}

	
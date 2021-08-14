import {
    makeStyles,
    AppBar,
    IconButton,
    Toolbar,
    Card,
    CardMedia,
    Grid,
    Typography,

} from '@material-ui/core';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {Link ,useParams} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import Grey from '@material-ui/core/colors/grey';


const useStyles=makeStyles((theme)=>({
    root:{
        flexGrow:1,
    },
    grid:{
        marginTop: 7,
        marginLeft: "auto",
        
    },
    appBar:{
    backgroundColor:'white',
    display:'flex',
    
    },
    title:{
        color:'gray',
        flexGrow:1,
    },
    Card:{
    borderRadius:1.5,
    marginLeft:5,
    marginRight:7,
    },
    info:{
    marginRight:10,
    marginBottom:6,
    },
    multiLineEllipsis: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        "-webkit-line-clamp":1,
        "-webkit-box-orient": "vertical",
        marginRight:10,
    marginBottom:6,
      }
   
  
  }));
  


const DetailsPage=()=>{
const params=useParams();
//console.log(params.movie_id);
const movie_id=params.movie_id;
const [movie,Setmovie]= useState([]);
const [crew,Setcrew]=useState([]);
const [cast,Setcast]=useState([]);

const classes=useStyles();


const getMovie=async()=>{
    const response=await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=afe3feda2272b853b181533a7aa4129b&language=en-US`, {
          
      });
      Setmovie(response.data)
      console.log(response.data);
      
}
const getCredits=async()=>{
    const response=await axios.get(
        `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=afe3feda2272b853b181533a7aa4129b&language=en-US`, {
          
      });
      console.log(response.data);
      Setcast(response.data.cast);
      Setcrew(response.data.crew);

}

useEffect(()=>{
    getMovie();
    getCredits();
},[])
    
const year=movie.release_date;

   

return (
    
    <>
    <Grid container>
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          
          <Typography variant="h6"  className={classes.title}>
           Movie  Details
          </Typography>
          <Link to="/listpage">
            <IconButton color={Grey['#4A4A4A']} >
            
                     <HomeIcon />
                   
                 </IconButton>
                 </Link>
        </Toolbar>
      </AppBar>
    </div>
    <Grid container className={classes.grid}>
        <Grid item xs ={12} sm={12} md={2}  >
            <Card className={classes.Card}>
                <CardMedia
                component="img"
                alt="Poster"
                height="265"
               
                src={'https://image.tmdb.org/t/p/w500/'+movie.poster_path}

                title="Paella dish"
                />

               
               
            </Card>
        </Grid>
        <Grid item xs={12} sm={12}  md={10} style={{alignItems:'right'}}>
       <Typography className={classes.info} style={{fontSize:16,color:"#4A4A4A"}}>
           <b>{movie.title}</b>({movie.vote_average}/10)
       </Typography >
       <Typography className={classes.info} style={{fontSize:16,color:"#4A4A4A"}}>
       <b>Release-date:</b>{movie.release_date} | <b>Length:</b>{movie.runtime} |<b >Directors:</b>{crew.filter((val)=>{
    return val.known_for_department=='Directing';
      }).map((val)=>(<>{val.name} </>))}
       
       </Typography>
       <Typography  className={classes.multiLineEllipsis} style={{fontSize:16,color:"#4A4A4A"}}>
           <b>Cast:</b>
               {cast.filter((val)=>{
                return val.known_for_department=='Acting';
                  }).map((val)=>(<>{val.name}</>))}
           
       </Typography>
       <Typography className={classes.info} style={{fontSize:16,color:"#4A4A4A"}}>
           <b>Description:</b>{movie.overview}
       </Typography>
        </Grid>
    </Grid>
    
    </Grid>
    
    </>
);

}
export default DetailsPage;
import {
  Grid,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  AppBar,
Toolbar,
InputBase,

IconButton,
Box
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import {

  Link,
  
} from 'react-router-dom';
import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';
import {useSelector,useDispatch,} from 'react-redux';
import listAction from '../actions/listAction';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 70,
    marginLeft: "auto",
    marginRight: 50,


  },
  media: {
    height: 180,
    // paddingTop: '56.25%', // 16:9
  },
  
    appBar:{
      backgroundColor:'White',
      display:'flex'
      },
     inputBase:{
       backgroundColor:'#DFDFDF',
       borderRadius:4,
       flex:0.3,
       padding:4
     }

  ,
  multiLineEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp":2,
    "-webkit-box-orient": "vertical",
  }

}));

const ListPage = () => {
  const classes = useStyles();



  const [movies, setMovies] = useState([]);
  const [search,setSearch]=useState([]);
  const [searchResult,setSearchresult]=useState([]);
  const value=useSelector(state=>state.listNumber);
  //const search=useSelector(state=>state.search);
  //const movies=useSelector(state=>state.movieArray);
  const dispatch=useDispatch();
  
  //movie search function
  const searchMovie=async()=>{
    if(search.length>0){
    const response=await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=afe3feda2272b853b181533a7aa4129b&language=en-US&page=1`, {
        
    });
    //console.log(response.data);
    setSearchresult(response.data.results);
    }
     }
     //list getting function
 const getList=async()=>{
  const response=await axios.get(
    `https://api.themoviedb.org/3/list/${value}?api_key=afe3feda2272b853b181533a7aa4129b`, {
      
  });
  
  console.log(value);
   var movieArrray=movies.concat(response.data.items);
  setMovies(movieArrray);
  // dispatch(updateMovieArray(response.data.items));
  // console.log(response.data.items);
  // }
  // else{
  //  return ;
  // }
  }
  useEffect(()=>{
    // console.log("inside useEffect");
     getList();
    
 
      },[value])

  useEffect(()=>{
     searchMovie();
 
    },[search]);



  if(search.length>0){
     return ( <>
        <Grid container >
    <       AppBar className={classes.appBar}>
                      <Toolbar>
                         
                          <Box display='flex' flexGrow={1}>
                          <InputBase 
                             placeholder="Search Movie..."
                        className={classes.inputBase}
                        onChange={(e)=>{setSearch(e.target.value); searchMovie();}}
                          />
            {/* whatever is on the left side */}
        
                         
            </Box>
            <Link to="/listpage">
            <IconButton  >
            
                     <HomeIcon />
                   
                 </IconButton>
                 </Link>

                       </Toolbar>


              </AppBar>
              <Grid container className={classes.root} spacing={1} >
          {searchResult.map((value) => (
            <Grid key={value.id} item xs={12} sm={4} md={3} lg={2}>
              <Card >
              <Link to={"/detailspage/"+value.id} style={{textDecoration:'none',}}>
                <CardActionArea >
                <CardMedia
                  component="img"
                  alt="Poster NOT AVAILABLE"
                  height="140"
                   src={'https://image.tmdb.org/t/p/w500/'+value.poster_path}

                  title="poster"
                />
                <CardContent style={{display:'flex',justifyContent: "space-between"}}>
                <Typography  style={{fontSize:14,color:"#4A4A4A"}}>
                  {value.title}
                  </Typography>
                  <Typography  style={{fontSize:14,color:"#4A4A4A"}}>
                  {value.vote_average}/10
                  </Typography>
                  </CardContent>
                  <CardContent>
                  <Typography color="textSecondary" style={{fontSize:12}}className={classes.multiLineEllipsis}>
                  {value.overview}
                  </Typography>
                </CardContent>
                </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
          </Grid>
              </Grid>

      </>
     );
       }
      else{

       return (
           <>
           <Grid container >
              <AppBar className={classes.appBar}>
                      <Toolbar>
                         
                          <Box display='flex' flexGrow={1}>
                          <InputBase 
                             placeholder="Search Movie..."
                        className={classes.inputBase}
                        onChange={(e)=>{setSearch(e.target.value)}}
                          />
            {/* whatever is on the left side */}
        
                         
            </Box>
            <Link to="/listpage">
            <IconButton  >
            
                     <HomeIcon />
                   
                 </IconButton>
                 </Link>

                       </Toolbar>


              </AppBar>
         <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={()=>{dispatch(listAction())}}
           hasMore={true}
           style={{paddingRight:10,overflowY:'hidden',overflowX:'hidden'}}
          
         >
           <Grid container className={classes.root} spacing={1} >
          {movies.map((value) => (
            <Grid key={value.id} item xs={12} sm={4} md={3} lg={2}>
              <Card >
              <Link to={"/detailspage/"+value.id} style={{textDecoration:'none',}}>
                <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Poster"
                  height="140"
                   src={'https://image.tmdb.org/t/p/w500/'+value.poster_path}

                  title="poster"
                />
                <CardContent style={{display:'flex',justifyContent: "space-between"}}>
                <Typography  style={{fontSize:14,color:"#4A4A4A"}}>
                  {value.title}
                  </Typography>
                  <Typography  style={{fontSize:14,color:"#4A4A4A"}}>
                  {value.vote_average}/10
                  </Typography>
                  </CardContent>
                  <CardContent>
                  <Typography color="textSecondary" style={{fontSize:12}}className={classes.multiLineEllipsis}>
                  {value.overview}
                  </Typography>
                </CardContent>
                 
                </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
          </Grid>
         </InfiniteScroll>
        

         </Grid>
      
      
    </>
  );
          }
}
export default ListPage;
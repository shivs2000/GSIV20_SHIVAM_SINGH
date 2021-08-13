import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardMedia
} from '@material-ui/core';

import {
  useState,
  useEffect




} from 'react';
import axios from 'axios';
import Bar from './Bar';
import InfiniteScroll from 'react-infinite-scroll-component';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 70,
    marginLeft: "auto",
    marginRight: "auto",


  },
  media: {
    height: 140,
    // paddingTop: '56.25%', // 16:9
  },
  paper: {
    height: 230,

    [theme.breakpoints.down('sm')]: {
      height: 230,

    },

  },

}));

const ListPage = () => {
  const classes = useStyles();



  const [listnumber,setListnumber]=useState(1);
  const [movies, setMovies] = useState([]);



  const getList=async()=>{
  const response=await axios.get(
    `https://api.themoviedb.org/3/list/${listnumber}?api_key=afe3feda2272b853b181533a7aa4129b`, {
      
  });
  
  
  var number=listnumber+1;
  setListnumber(number);
  var movieArrray=movies.concat(response.data.items);
  setMovies(movieArrray);
  console.log(response.data.items);
  }
  useEffect(()=>{
    console.log("inside useEffect");
    getList();
    
 
},[])

  return (
    <>
      <Grid container>
        <Bar />
        <Grid container className={classes.root} spacing={2} margin={20}>
         <InfiniteScroll
            dataLength={movies.length} //This is important field to render the next data
            next={()=>{getList()}}
           hasMore={true}
         
         
         >
          {movies.map((value) => (
            <Grid key={value.id} item xs={12} sm={4} md={3} lg={2}>
              <Card >
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                   src={'https://image.tmdb.org/t/p/w500/'+value.poster_path}

                  title="Paella dish"
                />
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                  {value.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
         </InfiniteScroll>
        </Grid>


      </Grid>

      
    </>
  );
}
export default ListPage;
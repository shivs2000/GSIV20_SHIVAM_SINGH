import {
AppBar,
Toolbar,
InputBase,
makeStyles

} from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
  appBar:{
  marginBottom:70 ,
  },


}));

const Bar=()=>{
    const classes=useStyles();
    return(
              <AppBar className={classes.appBar}>
                      <Toolbar>
                         <InputBase 
                             placeholder="search..."

                          />


                       </Toolbar>


              </AppBar>

    );
}

export default Bar;
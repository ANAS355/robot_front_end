import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Image from 'next/image'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {useState, useEffect} from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
const map_width = 200;
const map_hieght = 150;
let mapScale = {x:1, y:1}
export default function RobotView(props) {
  const [target, setTarget] = React.useState({x:0, y:0})

  const [termenalIn, setTermenalIn] = useState("")
  const { user,
          currentpage,
          setCurrentpage, 
          test, 
          addSnackBar,
          lidarBitMap} = props

  const sendTermenalCommand = () => {
    user.send({function: "termenalCommand", data: {command: termenalIn}})
  }


  return (
          <>
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-termenal">Termenal</InputLabel>
          <OutlinedInput
            id="outlined-adornment-termenal"
            onChange={e => {setTermenalIn(e.target.value)}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={sendTermenalCommand}
                  onMouseDown={() => {}}
                  edge="end"
                >
                  <InputIcon/>
                </IconButton>
              </InputAdornment>
            }
            label="Termenal"
          />
        </FormControl>
                  <Box sx={{
                                mb: 1,
                                mt: 1,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                                overflow: "hidden",
                                overflowY: "scroll",
                                border:1
                              // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
                              }}>
                    <Typography mt={2}>
                      
                    </Typography>
                  </Box>
              
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                      
                    }}
                  >
                     <Autocomplete
                        disablePortal
                        options={currencies}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                        onChange={(e, value) => {
                          if (value){
                            try {
                              console.log(value)
                            } catch (exception_var) {
                            }
                          }   
                        }}
                        sx={{m:1}}
                      />
                    <TextField  id="outlined-basic" 
                                label="Target-X" 
                                value={target.x}
                                variant="outlined" 
                                onChange={(e) => {console.log(e.target.value);setTarget(target => ({...target, x:e.target.value}))}}
                                sx={{m:1}}/>
                    <TextField  id="outlined-basic" 
                                label="Target-Y" 
                                value={target.y}
                                variant="outlined" 
                                onChange={(e) => {console.log(e.target.value);setTarget(target => ({...target, y:e.target.value}))}}
                                sx={{m:1}}/>  
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3} >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                      
                    }}
                  >
                     <img src={"data:image/png;base64," + lidarBitMap} />

                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                  <LocationOnIcon 
                        sx={{
                          color: "#ed4245",
                          position: "relative",
                          zIndex: 2,
                          //border: '1px solid red',
                          left: (target.x - map_width/2)/mapScale.x + "px",
                          top: target.y/mapScale.y + "px",
                        }}/>
                    <Paper 
                    sx={{
                      p: 0,
                      display: 'flex',
                    }}>
                      
                      <Image            
                        src={"./bitmap-sample.png"}
                        width={map_width*10 + "px"}
                        height={map_hieght*10 + "px"}
                        onClick={(e) => {
                          console.log(e.target.clientHeight); 
                          mapScale = {x:map_width/e.target.clientWidth,
                                      y:map_hieght/e.target.clientHeight},
                          setTarget({ x:e.nativeEvent.layerX*mapScale.x, 
                                      y:e.nativeEvent.layerY*mapScale.y})}}
                      />
                    </Paper>
                  </Paper>
                </Grid>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </>
  );
}


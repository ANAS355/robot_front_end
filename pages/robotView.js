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
import { Divider, IconButton } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Chart from './chart';

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
let mapScale = { x: 1, y: 1 }
export default function RobotView(props) {
  const [termenalIn, setTermenalIn] = React.useState("")
  const { user,
    currentpage,
    setCurrentpage,
    test,
    addSnackBar,
    lidarBitMap,
    termenalOut,
    dataM1,
    dataM2,
    target,
    setTarget,
    current,
    setCurrent, } = props
  
    

  const sendTermenalCommand = () => {
    user.send({ function: "termenalCommand", data: { command: termenalIn } })
  }


  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: 500,
              }}
            >
             <Chart tite="Motor_1" data={dataM1}/>
             <Chart tite="Motor_2" data={dataM2}/>
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} >
            <Paper
              sx={{
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: 500,

              }}
            > 
          <TextField id="outlined-basic"
                    key="terminal"
                    label="Terminal"
                    variant="outlined"
                    onChange={(e) => { setTermenalIn(e.target.value) }}
                    sx={{ m: 1 }} />
          <Button onClick={sendTermenalCommand} sx={{ m: 1 }} variant="contained">Send</Button>
          <Divider sx={{ m: 0.5 }}/>
              <Autocomplete
                disablePortal
                options={currencies}
                renderInput={(params) => <TextField {...params} label="Map" />}
                onChange={(e, value) => {
                  if (value) {
                    try {
                      console.log(value)
                    } catch (exception_var) {
                    }
                  }
                }}
                sx={{ m: 1 }}
              />
              <Button sx={{ m: 1 }} variant="contained">Set-Map</Button>
              <Divider sx={{ m: 0.5 }}/>
              <Grid item xs={12} sx={{display: 'flex', }}>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', m: 1}}>
                  <TextField id="outlined-basic"
                    key="tx"
                    label="Target-X"
                    value={target.x}
                    variant="outlined"
                    onChange={(e) => { console.log(e.target.value); setTarget(target => ({ ...target, x: e.target.value })) }}
                    sx={{ m: 1 }} />
                  <TextField id="outlined-basic"
                    key="ty"
                    label="Target-Y"
                    value={target.y}
                    variant="outlined"
                    onChange={(e) => { console.log(e.target.value); setTarget(target => ({ ...target, y: e.target.value })) }}
                    sx={{ m: 1 }} />
                  <Button onClick={e => {user.send({function: "setTargetPosition", 
                                                    data: { x: target.x, y: target.y } }); 
                                          }} sx={{ m: 1 }} variant="contained">Set-P</Button>
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', m: 1}}>
                  <TextField id="outlined-basic"
                    key="tv"
                    label="Target-V"
                    variant="outlined"
                    onChange={(e) => { console.log(e.target.value); setTarget(target => ({ ...target, v: e.target.value })) }}
                    sx={{ m: 1 }} />
                  <TextField id="outlined-basic"
                    key="tw"
                    label="Target-W"
                    variant="outlined"
                    onChange={(e) => { console.log(e.target.value); setTarget(target => ({ ...target, w: e.target.value })) }}
                    sx={{ m: 1 }} />
                  <Button onClick={e => {user.send({function: "setTargetVelocity", 
                                                    data: { v: target.v, w: target.w } }); 
                                          }} sx={{ m: 1 }} variant="contained">Set-V</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Recent Orders */}
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} >
            <Paper
              sx={{
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: 500,

              }}
            >      
              <Paper
              sx={{
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: 500,

              }}
            >
            <img src={"data:image/png;base64," + lidarBitMap} />
            </Paper>
              <Grid item xs={12} sx={{display: 'flex', }}>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', m: 1}}>
                  <TextField id="outlined-basic"
                  disabled
                    key="tx"
                    label="Current-X"
                    value={current.x}
                    variant="standard"
                    sx={{ m: 1 }} />
                  <TextField id="outlined-basic"
                  disabled
                    key="ty"
                    label="Current-Y"
                    value={current.y}
                    variant="standard" 
                    sx={{ m: 1 }} />
                </Grid>
                <Grid item xs={12} sx={{display: 'flex', flexDirection: 'column', m: 1}}>
                  <TextField id="outlined-basic"
                  disabled
                    key="tv"
                    label="Current-V"
                    value={current.v}
                    variant="standard"  
                    sx={{ m: 1 }} />
                  <TextField id="outlined-basic"
                  disabled
                    key="tw"
                    label="Current-W"
                    value={current.w}
                    variant="standard"
                    sx={{ m: 1 }} />
                </Grid>
              </Grid>
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
                  left: (target.x - map_width / 2) / mapScale.x + "px",
                  top: target.y / mapScale.y + "px",
                }} />
              <Paper
                sx={{
                  p: 0,
                  display: 'flex',
                }}>

                <Image
                  src={"./bitmap-sample.png"}
                  width={map_width * 10 + "px"}
                  height={map_hieght * 10 + "px"}
                  onClick={(e) => {
                    console.log(e.target.clientHeight);
                    mapScale = {
                      x: map_width / e.target.clientWidth,
                      y: map_hieght / e.target.clientHeight
                    },
                      setTarget({
                        x: e.nativeEvent.layerX * mapScale.x,
                        y: e.nativeEvent.layerY * mapScale.y
                      })
                  }}
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


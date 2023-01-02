import * as React from 'react';
import {useState, useEffect} from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
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
import InputIcon from '@mui/icons-material/Input';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import RobotView from './robotView';

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

class User {
      constructor(addSnackBar, handleServerResponse) {
        this.addSnackBar = addSnackBar
        this.handleServerResponse = handleServerResponse
        this.isConnected = false
        this.isSignedIn = false
        this.isTryingToConnect = false
        this.socket = null
      }
      handleConntion() {
        if (!this.isConnected && !this.isTryingToConnect) {
            this.addSnackBar("Trying To Connect...", "info")
            this.isTryingToConnect = true
            try {
                this.socket = new WebSocket('ws://192.168.35.1:7000')
                this.socket.onopen = (e) => {
                    //console.log(e.eventPhase == e.BUBBLING_PHASE)
                    //console.log("[open] Connection established");
                    //console.log("Sending to server");
                    this.isTryingToConnect = false
                    this.handleConnected()
                    
                };
                
                this.socket.onmessage = (event) => {
                    //console.log(event.data)
                    try {
                        let response = JSON.parse(event.data)
                        //console.log(`[message] Data received from server: ${event.data}`);
                        this.handleServerResponse(response)
                    } catch {
                        //console.log("can't handle message")
                        //console.log(event.data)
                    }
                };
                
                this.socket.onclose = (event) => {
                    if (event.wasClean) {
                        this.handleDisconnected(true)
                        //console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
                    } else {
                        this.handleDisconnected(false)
                    // e.g. server process killed or network down
                    // event.code is usually 1006 in this case
                    // console.log('[close] Connection died');
                    }
                    console.log("socket closed")
                    this.isTryingToConnect = false
                };
                this.socket.onerror = (error) => {
                    //this.addSnackBar(`[error] ${error.message}`);
                    if (this.isConnected){
                        this.handleConnectionError()
                    } else{
                        this.handleUnableToConnect()
                    }
                    console.log("connection error")
                    this.isTryingToConnect = false
                };
            } catch (e) {
                this.addSnackBar(e)
                this.isTryingToConnect = false
                if (this.isConnected){
                    this.handleConnectionError()
                } else{
                    this.handleUnableToConnect()
                }
            }
            
        }else{
            this.addSnackBar("Already Connected", "success")
        }
    }
      handleConnected() {
          this.addSnackBar("Connected", "success")
          this.isConnected = true
      }
      handleDisconnected(clean){
        if (clean) {
            this.addSnackBar("Disconnected", "warning")
            this.isConnected = false
            this.isSignedIn = false
            this.handleSignOut()
        }else{
            this.addSnackBar("Disconnected", "error")
            this.isConnected = false
            this.isSignedIn = false
            this.handleSignOut()
        }  
    }
      handleUnableToConnect(){
        this.addSnackBar("Unable To Connect", "error")
        this.isConnected = false
        this.isSignedIn = false
        this.handleSignOut()
    }
      handleConnectionError(){
        this.addSnackBar("Connection Error", "error")
        this.isConnected = false
        this.isSignedIn = false
        this.handleSignOut()
    }
      
    handleSignUp(){
        if (!this.isConnected) {
            this.this.connect()
        }
        if (signUp.data.password !== signUp.data.confirmPassword){
            setSignUp(signUp => ({...signUp, 
                                            alerts:{...signUp.alerts, 
                                            password:{  status:true, 
                                                        message:"Both Passwords Are Not The Same", 
                                                        variant:"error"}, 
                                            confirmPassword:{   status:true, 
                                                                message:"Both Passwords Are Not The Same", 
                                                                variant:"error"}}}))
        }
        if (validateEmail(signUp.data.email) === null) {
            setSignUp(signUp => ({...signUp, 
                                        alerts:{...signUp.alerts, 
                                            email:{ status:true, 
                                                    message:"Invalied Email", 
                                                    variant:"error"},}}))
        }
        if (signUp.data.username === "") {
            setSignUp (signUp => ({...signUp, 
                                                            alerts:{...signUp.alerts, 
                                                                username:{ status:true, 
                                                                        message:"Invalied username", 
                                                                        variant:"error"},}}))
        }
        if (signUp.data.password === signUp.data.confirmPassword && 
            validateEmail(signUp.data.email) !== null && 
            signUp.data.username !== "") {
            this.socket.send(JSON.stringify({function: "signUp", data: {  username: signUp.data.username,
                                                                            email: signUp.data.email,
                                                                            firstName: signUp.data.firstName,
                                                                            lastName: signUp.data.lastName,
                                                                            password: signUp.data.password}}));
        }
    }

    onSignUp(serverResponse){
        if (serverResponse.status === true) {
            this.addSnackBar("Signed Up successfully", "success")
        }else{
            this.addSnackBar("Fiald To Sign Up", "error")
        }
    }

    handleSignIn(){
        if (this.isConnected && !this.isSignedIn) {
            this.socket.send(JSON.stringify({function: "signIn", data: {  username: signIn.data.username,
                                                                            password: signIn.data.password}}));
        }else{
            this.connect()
        }
    }

    onSignIn(response){
        if (response.status === true) {
            this.addSnackBar("Signed In Successfully", "success")
            setSignIn(this.defaultData.input.signIn)    
        }else{
            this.addSnackBar(response.data.message, "error")
        }
    }

    handleSignOut(){
        this.socket.send(JSON.stringify({function: "signOut", data: {}}))
        this.addSnackBar("Signed Out", "warning")
    }

    onSignOut(){
        this.socket.send(JSON.stringify({function: "signOut", data: {}}))
        console.log(this.user)
        this.addSnackBar("Signed Out", "warning")
    }

    connect(){
        if (!this.isTryingToConnect) {
            this.handleConntion()
        }
        else{
            this.addSnackBar("Already Trying To Connect", "info")
        }
    }
    }
  
const mdTheme = createTheme();
    
export default function Main() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const snackBarRef = React.useRef(null)
  const { enqueueSnackbar } = useSnackbar();
  const addSnackBar = (msg, variant) => {
    enqueueSnackbar(msg, { variant: variant });
};
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const [currentpage, setCurrentpage] = useState("Home")
  const [lidarBitMap, setLidarBitMap] = useState()

  const [user, setUser] = useState(new User(addSnackBar))
  const test = () => {

  }
  const mainProps = { user,
                      currentpage,
                      setCurrentpage, 
                      test, 
                      addSnackBar,
                      lidarBitMap}

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={drawerOpen}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(drawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {currentpage}
            </Typography>
            <IconButton color="inherit" onClick={() => {user.connect()}}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={drawerOpen}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <RobotView/>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

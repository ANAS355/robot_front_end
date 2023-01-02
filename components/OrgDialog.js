import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ServiceCard from './ServiceCard';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrgDialog(props) {
  const { openDialog, handleOpenDialog, handleCloseDialog, dialogData, selectedOrg, selectedService, currentLocation } = props
  return (
    <Dialog
      fullScreen
      open={openDialog}
      onClose={handleCloseDialog}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'sticky', bgcolor: '#f69435' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography dir="rtl" sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {selectedOrg}
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ServiceCard services={dialogData[selectedOrg]} selectedService={selectedService} currentLocation={currentLocation} />
      </List>
    </Dialog>
  );
}
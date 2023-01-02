import * as React from 'react';
import Home from './home';
import { SnackbarProvider } from "notistack";


export default function Index() {
  return (  
    <SnackbarProvider maxSnack={2} preventDuplicate>
       <Home />
    </SnackbarProvider>
  );
}

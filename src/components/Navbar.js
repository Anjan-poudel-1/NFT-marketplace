import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function Navbar({account,connectFunction}) {
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{backgroundColor:"#353535"}}>
            <Toolbar>
             
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Krypto-Market
              </Typography>
              <Button color="inherit" onClick={account?connectFunction:()=>{}}>{
                  account ?
                  account:
                  "Connect"
              }</Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default Navbar
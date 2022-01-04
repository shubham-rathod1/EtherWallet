import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import SendEther from './SendEther';
import { CreateWallet } from './CreateWallet';

function Wallet() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [wallet, setWallet] = useState({});

  const walletAddressFn = (address) => {
    setAddress(address);
  };
  const getBalanceFn = (balance) => {
    setBalance(balance);
  };
  const walletFn = (userWallet) => {
    setWallet(userWallet);
  };

  return (
    <div
      style={{
        display: 'flex',
        margin: '20px 0 0 20px',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{ margin: '0 0 50px 0', textAlign: 'center' }}
        variant='h2'
      >
        Welcome to your Etherium wallet
      </Typography>
      <Grid container>
        <Grid item lg={8}>
          <CreateWallet
            walletAddress={walletAddressFn}
            myBalance={getBalanceFn}
            walletFn={walletFn}
          />
        </Grid>
        <Grid item lg={3}>
          <Paper elevation={3} sx={{ padding: '40px', width:"100%" }}>
            <Typography sx={{textAlign: 'center'}} color="teal" variant='h5'>Your Wallet Info</Typography>
            <Typography sx={{ paddingRight: "40px"}} variant='caption'> {address}</Typography>
            <Typography variant='subtitle1'>Balance is: {balance}</Typography>
            <SendEther wallet={wallet} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export { Wallet };

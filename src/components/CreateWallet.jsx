import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Grid, Typography, Button, TextField, Paper } from '@mui/material';

function CreateWallet({ walletAddress, myBalance, walletFn }) {
  const [privateKey, setPrivateKey] = useState('');
  const [wallet, setWallet] = useState({});
  const [walletState, setWalletState] = useState(false);
  const provider = ethers.getDefaultProvider('rinkeby');

  const handleChange = (e) => {
    const value = e.target.value;
    setPrivateKey(value);
  };

  const walletBalance = async () => {
    await wallet
      ?.getBalance()
      .then((res) => ethers.utils.formatEther(res))
      .then((res) => myBalance(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    walletState && walletBalance();
    walletState && walletFn(wallet);
  }, [wallet]);

  const handleImport = () => {
    try {
      const myWallet = new ethers.Wallet(privateKey, provider);
      setWallet(myWallet);
      setWalletState(true);
      walletAddress(myWallet.address);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCreate = () => {
    try {
      const myWallet = ethers.Wallet.createRandom().connect(provider);
      setWallet(myWallet);
      setWalletState(true);
      console.log(myWallet);
      walletAddress(myWallet.address);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <Typography sx={{ marginLeft: '40px' }} color='teal' variant='h4'>
          Start by Importing or Creation a new Wallet...
        </Typography>
      </div>
      <Grid container>
        <Grid item sx={{ margin: '40px' }}>
          <Paper elevation={3} sx={{ padding: '40px' }}>
            <Typography variant='h6' sx={{ marginBottom: '30px' }}>
              create a new wallet
            </Typography>
            <Button variant='contained' onClick={handleCreate}>
              Create a new Wallet
            </Button>
          </Paper>
        </Grid>
        <Grid
          item
          style={{ display: 'flex', flexDirection: 'column', margin: '40px' }}
        >
          <Paper elevation={3} sx={{ padding: '40px' }}>
            <Typography variant='h6' sx={{ marginBottom: '30px' }}>
              Already have one? Import now
            </Typography>
            <TextField
              sx={{ width: '100%' }}
              variant='outlined'
              label='Your Private Key'
              type='text'
              onChange={handleChange}
              value={privateKey}
            />
            <br />
            <Button
              sx={{ marginTop: '10px', width: '100%' }}
              variant='contained'
              disabled={!privateKey}
              onClick={handleImport}
            >
              Import Wallet
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export { CreateWallet };

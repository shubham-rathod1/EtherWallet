import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Typography, TextField, Button, Box } from '@mui/material';
// import { myWallet } from './CreateWallet';
// 0x9E13B7374C0660C5d922349eFC2E316e78bdA58A

export default function SendEther({ wallet }) {
  //   console.log(myWallet);
  const [recepientAddress, setRecepientAddress] = useState('');
  const [isAddressVerified, setIsAddressVerified] = useState(false);
  const [etherValue, setEtherValue] = useState('0');
  const [transactionRes, setTransactionRes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionSent, setTransactionSent] = useState(false);

  const tx = {
    to: wallet && recepientAddress,
    value: wallet && ethers.utils.parseEther(etherValue),
  };
  console.log(wallet);
  const sendEtherFn = async () => {
    setIsLoading(true);
    setTransactionSent(true);
    try {
      const response = await wallet?.sendTransaction(tx);
      const confirm = await response
        .wait()
        .then((res) => setTransactionRes(res))
        .catch((err) => console.log(err))
        .finally((msg) => setIsLoading(false));
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setRecepientAddress(value);
  };

  const verifyAddressFn = () => {
    try {
      const result = ethers.utils.getAddress(recepientAddress);
      if (result === recepientAddress) {
        setIsAddressVerified(true);
        alert('Address is verified');
      } else {
        alert('invalid address');
      }
    } catch (err) {
      console.log(err);
      alert('please enter valid address');
      setRecepientAddress('');
    }
  };

  const handleValue = (e) => {
    const value = e.target.value;
    setEtherValue(value);
  };

  return (
    <div>
      <div>
        <div>
          <TextField
            sx={{ width: '100%', marginTop: '20px' }}
            variant='outlined'
            label='wallet Address'
            type='text'
            onChange={handleChange}
            value={recepientAddress}
          />
          <Button
            variant='contained'
            sx={{ marginTop: '10px', width: '100%' }}
            onClick={verifyAddressFn}
          >
            verify Address
          </Button>
        </div>
        {!isAddressVerified ? (
          <Typography variant='subtitle2'>
            Please verify your address
          </Typography>
        ) : (
          <Box>
            <Typography> address is verified</Typography>
          </Box>
        )}
        <div>
          {isAddressVerified ? (
            <TextField
              sx={{ width: '100%', marginTop: '20px' }}
              variant='outlined'
              label='Amount'
              value={etherValue}
              onChange={handleValue}
            />
          ) : null}
        </div>

        <br />
        <Button
          variant='contained'
          sx={{ width: '100%' }}
          disabled={!isAddressVerified}
          onClick={sendEtherFn}
        >
          send Ether
        </Button>
        <br />
        {transactionSent ? (
          <Typography variant='subtitle2'>
            {isLoading
              ? 'Loading...'
              : `transaction successfull and block no is ${transactionRes.blockNumber}`}
          </Typography>
        ) : null}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  TextField,
} from '@material-ui/core';
import styled from 'styled-components';

import api from 'services/api';

const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: url(filters.svg#filter) blur(4px) saturate(150%);
  }
`;

function Register({ modalRegister, handleClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function register() {
    try {
      await api.post('users/register', { email: email, password: password });
      let res = await api.post('users/authenticate', {
        email: email,
        password: password,
      });

      localStorage.setItem('token', JSON.stringify(res.data.data));
      dispatch({
        type: 'SET_USER_STATE',
        payload: {
          userData: true,
        },
      });

      history.push('/video-catalog');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <StyledDialog open={modalRegister} onClose={handleClose}>
      <DialogTitle id="create-account-modal">Create a account</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={register}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={register} color="secondary" autoFocus>
          Register
        </Button>
      </DialogActions>
    </StyledDialog>
  );
}

export default Register;

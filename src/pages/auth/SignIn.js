import React, { useState } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from 'formik';
import { connect } from 'react-redux';

import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  Button as MuiButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import { userService } from '../../service';
import { login } from '../../redux/reducers/userReducer'

const Button = styled(MuiButton)(spacing);

const Wrapper = styled(Paper)`
  padding: ${props => props.theme.spacing(6)}px;

  ${props => props.theme.breakpoints.up("md")} {
    padding: ${props => props.theme.spacing(10)}px;
  }
`;

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${props => props.theme.spacing(5)}px;
`;

function SignIn({ login, history }) {
  const [isSigning, setIsSigning] = useState(false);
  const [text, setText] = useState("Sign in");
  const [errMessage, setErrMessage] = useState("");

  const user = new userService();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      setIsSigning(true);
      setText("Loading ...");
      user.login(values.email, values.password).then((response) => {
        return response.json();
      }).then((data) => {
        if (!data.error) {
          login(data);
          history.replace('/')
        } else {
          setIsSigning(false);
          setText("Sign in");
          setErrMessage(data.error);
        }
      }).catch((err) => {
        setErrMessage(err);
      })
    }
  });
  const handleChange = (e) => {
    setErrMessage("");
    formik.handleChange(e);
  };

  return (
    <Wrapper>
      <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-2.jpg" />
      <Typography component="h2" variant="body1" align="center">
        Sign in to your account to continue
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="email">Email Address</InputLabel>
          <Input id="email" name="email" autoComplete="email" onChange={handleChange} autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
        </FormControl>
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {errMessage && <Typography color="error" component="h2" variant="body1" align="center" paragraph={true}>
          The email and password do not match, please try again.
        </Typography>}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          mb={2}
          type="submit"
          disabled={isSigning}
        >
          {text}
        </Button>
        <Button
          component={Link}
          to="/auth/reset-password"
          fullWidth
          color="primary"
        >
          Forgot password
        </Button>
      </form>
    </Wrapper>
  );
}
const mapStatetoProps = null;
const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => {
      dispatch(login(payload));
    }
  }
}
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(SignIn));

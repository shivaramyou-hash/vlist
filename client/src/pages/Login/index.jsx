import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './login.css';
import useLogin from './useLogin';

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '1rem',
});

const StyledInputContainer = styled('div')({
  marginBottom: '1rem',
});

const StyledButtonContainer = styled('div')({
  marginTop: '1rem',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const { userLogin, userLoginData, loading } = useLogin();

  // const database = [
  //   {
  //     email: 'user1@example.com',
  //     password: 'Pass1@',
  //   },
  //   {
  //     email: 'user2@example.com',
  //     password: 'Pass2@',
  //   },
  // ];

  const validateEmail = (input) => {
    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(input);
  };

  const validatePassword = (input) => {
    // Password validation: at least one capital letter and one symbol
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(input);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      toast.error('Invalid email format!');
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        'Password must contain at least one capital letter and one symbol!'
      );
      return;
    }
    const variables = {
      email: email,
      password: password,
      orgId: 1,
    };
    userLogin({ variables });
  };
  useEffect(() => {
    if (
      userLoginData?.userLogin?.token !== null &&
      userLoginData?.userLogin?.userData !== null &&
      !!userLoginData
    ) {
      toast.success(userLoginData?.userLogin?.message);
    } else if (
      (userLoginData?.userLogin?.token === null ||
        userLoginData?.userLogin?.token === undefined) &&
      (userLoginData?.userLogin?.userData === null ||
        userLoginData?.userLogin?.userData === undefined) &&
      !!userLoginData
    ) {
      toast.error(userLoginData?.userLogin?.message || 'Login failed');
    }
  }, [userLoginData]);

  return (
    <Container component="main" maxWidth="xs">
      <div className="app">
        <div className="login-form">
          <Typography component="h1" variant="h5" className="title">
            Sign In
          </Typography>
          <StyledForm onSubmit={handleLogin}>
            <StyledInputContainer>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="outlined-password-input"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </StyledInputContainer>
            <StyledInputContainer>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="pass"
                label="Password"
                type={!showPassword ? 'text' : 'password'}
                id="pass"
                size="small"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </StyledInputContainer>
            <StyledButtonContainer>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </StyledButtonContainer>
          </StyledForm>
          {/* {<div>User is successfully logged in</div>} */}
        </div>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Login;

import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
  createMuiTheme,
  withStyles,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Logo from "../assets/images/login-logo.svg";
import { history } from "../utils/history";
import { setToken } from "../utils/localStorageHandler";
import loginBG from '../assets/images/login-bg.png'
import errorMessage from '../assets/images/errorMessage.svg'

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0E7D7D" },
  },
});

const useStyles = makeStyles({
  loginPage: {
    height: '1080px',
    backgroundImage: `url(${loginBG})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom left',
  },
  loginContainer: {
    maxWidth: 561,
    width: "100%",
    margin: "100px auto 0 auto",
    boxSizing: "border-box",
    padding: "60px 80px 168px 80px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    border: "1px solid #DADADA",
    boxShadow: "none",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0E7D7D",
    lineHeight: 1,
    marginBottom: 25,
    fontFamily: "Open Sans",
    textAlign: "center",
  },
  logo: {
    marginBottom: 22,
    height: 60,
  },
  button: {
    width: "100%",
    background: "#0E7D7D",
    textTransform: "none",
    padding: "11px 13px",
    boxSizing: "border-box",
    color: "#fff",
    fontWeight: 600,
    transition: "all .2s ease-in",
    marginBottom: 7,
    "&:hover": {
      background: "#0E7D7D",
      opacity: 0.7,
    },
  },
  input: {
    width: "100%",
    borderRadius: 3,
    fontSize: 14,
    marginBottom: 20,
  },
  inputMargin: {
    marginBottom: 10
  }
});

const StyledInput = withStyles({
  "@global": {
    ".MuiOutlinedInput-input": {
      padding: '13.5px 14px',
    },
    ".MuiInputLabel-outlined": {
      transform: 'translate(14px, 14px) scale(1)',
    }
  },
})(TextField);

const Login = ({ setIsAuth }) => {
  const classes = useStyles();
  const testEmail = "test@email.com";
  const testPassword = "qweasd";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const ClickHandler = () => {
    if (email === testEmail && password === testPassword) {
      setIsAuth(true);
      setToken();
      history.push("/");
    } else setError('error')
  };

  const emailHandler = (value) => {
    setEmail(value);
    setError('')
  }

  const passwordHandler = (value) => {
    setPassword(value);
    setError('')
  }

  return (
    <Paper className={classes.loginPage}>
      <Paper className={classes.loginContainer}>
        <img src={Logo} alt="logo" className={classes.logo} />
        <Typography className={classes.heading}>Log in</Typography>
        <ThemeProvider theme={theme}>
          <StyledInput
            variant="outlined"
            className={classes.input}
            label="Email address"
            onChange={(e) => emailHandler(e.target.value)}
          />
          <StyledInput
            type="password"
            variant="outlined"
            className={`${classes.input} ${classes.inputMargin}`}
            label="Password"
            onChange={(e) => passwordHandler(e.target.value)}
          />
        </ThemeProvider>
        <Button className={classes.button} onClick={ClickHandler}>
          Sign in
        </Button>
        {error && <img src={errorMessage} alt="error" className={classes.logo} style={{transform: 'scale(0.8)'}}/>}
      </Paper>
    </Paper>
  );
};

export default Login;

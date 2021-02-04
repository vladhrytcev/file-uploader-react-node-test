import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import Logo from "../assets/images/login-logo.svg";
import { history } from "../utils/history";
import { setToken } from "../utils/localStorageHandler";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0E7D7D" },
  },
});

const useStyles = makeStyles({
  loginContainer: {
    maxWidth: 561,
    width: "100%",
    margin: "100px auto 0 auto",
    boxSizing: "border-box",
    padding: "60px 80px 134px 80px",
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
    padding: "13px",
    boxSizing: "border-box",
    color: "#fff",
    fontWeight: 600,
    transition: "all .2s ease-in",
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
    "&:last-child": {
      marginBottom: 15,
    },
  },
});

const Login = ({ setIsAuth }) => {
  const classes = useStyles();
  const testEmail = "test@email.com";
  const testPassword = "qweasd";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ClickHandler = () => {
    if (email === testEmail && password === testPassword) {
      setIsAuth(true);
      setToken();
      history.push("/");
    }
  };

  return (
    <Paper className={classes.loginContainer}>
      <img src={Logo} alt="logo" className={classes.logo} />
      <Typography className={classes.heading}>Log in</Typography>
      <ThemeProvider theme={theme}>
        <TextField
          variant="outlined"
          className={classes.input}
          label="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          variant="outlined"
          className={classes.input}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </ThemeProvider>
      <Button className={classes.button} onClick={ClickHandler}>
        Sign in
      </Button>
    </Paper>
  );
};

export default Login;

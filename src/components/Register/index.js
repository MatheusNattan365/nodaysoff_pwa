import React, { useState } from 'react';
import { Link } from 'react-router-dom'


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Importar os módulos do firebase {core e configs}
import firebase from 'firebase'
import '../../firebaseConfig'

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '90vh',
    margin: '0',
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  linkText: {
    textDecoration: 'none'
  },
  card: {
    minWidth: 275,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',

  },
  cardConntent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 14,
  },

}));



export default function Login() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  //Register with firebase
  const newUser = () => {
    const {email, password} = values
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        alert('Bem vindo ' + email);
      })
      .catch(function (error) {
        console.error(error.code);
        console.error(error.message);
        alert('Falha ao cadastrar, verifique o erro no console.')
      });
  }


  return (
    <>
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.cardConntent}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Register with firebase
        </Typography>
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              onChange={handleChange('email')}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              onChange={handleChange('password')}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
            />
          </CardContent>
          <CardActions>
            <Button size="small" onClick={newUser}>Register</Button>
          </CardActions>
        </Card>
        <br/>
        <Typography variant="subtitle2" gutterBottom>
          If you have an account, please 
          <Link className={classes.linkText} to="/login"> Login</Link>
          .</Typography>
      </div>


    </>
  );
}


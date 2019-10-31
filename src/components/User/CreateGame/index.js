import React from 'react';
import { Redirect } from 'react-router-dom'

import firebase from 'firebase'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
}
  from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  card: {

    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  media: {
    width: '100%',
    paddingTop: '56.25%', // 16:9
    // filter: "blur(1px)"
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
    color: '#FFF',
    filter: 'none'
  },
}));

export default function CreateGame() {
  const classes = useStyles();
  const [eventInfo, setEventInfo] = React.useState({
    event_photo: '',
    event_name: '',
    instagram_link: '',
    event_about: '',
    date_init: new Date('2014-08-18'),
    date_end: new Date('2014-08-18')
  });
  const handleChange = name => event => {
    setEventInfo({ ...eventInfo, [name]: event.target.value });
  };
  const handleDateChangeInit = date => {
    setEventInfo({ ...eventInfo, date_init: date.toString() });
  };
  const handleDateChangeEnd = date => {
    setEventInfo({ ...eventInfo, date_end: date.toString() });
  };

  const cadastrar_event = async () => {
    // // const email = firebase.auth().currentUser.email;
    // // const userId = firebase.auth().currentUser.uid;

    if (img) {
      // Referenciar o Storage
      // O nome da IMG usa o email do Currrent User
      // quando é feito um novo upload de IMG a IMG nova sobrepõe 
      // a IMG antiga 
      const storageRef = firebase.storage().ref(`events_photo/${eventInfo.event_name}`);

      // Enviar o arquivo && Setar imagem do Perfil no DB
      // faz o Store da IMG do perfil no firebase e seta a DownloadURL
      // da IMG para a variável perfil que será persistida 
      // com as principais informações do usuário
      await storageRef.put(img).then(
        res => res.ref.getDownloadURL()
      ).then(res => eventInfo.event_photo = res);
    };

    // Enviar dados para o perfil
    // O método SET persiste um novo dado e atualiza se já exixtente
    // a referência toma como caminho {users/ + userId} que é obtido 
    // quando o usuário faz seu registro. Dessa forma as informações 
    // de cada usuário é persistida/atualizada sem prejudicar 
    // a harmonia do DB.
    firebase.database().ref(`events/${eventInfo.event_name}`).set(eventInfo);
  }

  const [imgPreview, setImgPreview] = React.useState();
  const [img, setImg] = React.useState();
  function previewFile() {
    let file = document.querySelector('input[type=file]').files[0];

    setImg(file)

    let reader = new FileReader();

    reader.onloadend = function () {
      setImgPreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      eventInfo.event_photo = '';;
    }
  }
  // function previewFile() {
  //   let file = document.querySelector('input[type=file]').files[0];
  //   let reader = new FileReader();

  //   reader.onloadend = function () {
  //     setImg(reader.result);
  //   }

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     setImg('');;
  //   }
  // }

  // RouteGuard
  if (!firebase.auth().currentUser) return <Redirect to="/login" />

  return (
    <>
      <br />
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={10} sm={8} md={8} lg={8}>
          <Card className={classes.card}>
            <CardMedia
              id="img"
              className={classes.media}
              image={imgPreview ? imgPreview : "https://source.unsplash.com/random"}
            >
              <input
                accept="image/*"
                className={classes.input}
                id="outlined-button-file"
                type="file"
                onChange={() => previewFile()}
              />
              <label htmlFor="outlined-button-file">
                <Button
                  variant="outlined"
                  color="inherit"
                  component="span"
                  className={classes.button}
                >
                  Upload
                </Button>
              </label>
            </CardMedia>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                Informações do Evento
            </Typography>
              <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid item xs={12} sm={12} md={10} >
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.textField}
                    id="event_name"
                    onChange={handleChange('event_name')}
                    label="Nome do evento"
                    autoFocus
                  />
                  <br />
                  <br />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.textField}
                    id="instagram_link"
                    onChange={handleChange('instagram_link')}
                    label="Instagram"
                    autoFocus
                  />
                  <br />
                  <br />
                  <TextField
                    id="event_about"
                    label="About Event"
                    multiline
                    rows="5"
                    fullWidth
                    className={classes.textField}
                    onChange={handleChange('event_about')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>

                <Grid container
                  direction="column"
                  justify="center"
                  alignItems="center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date_init"
                        label="Start Date"
                        value={eventInfo.date_init}
                        onChange={handleDateChangeInit}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date_end"
                        label="End Date"
                        value={eventInfo.date_end}
                        onChange={handleDateChangeEnd}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>

                </Grid>

              </Grid >
              <br />
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={cadastrar_event}>
                Criar Evento
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <br />
      </Grid>
    </>

  );
}

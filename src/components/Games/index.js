import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../Utils/axios'


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '300px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    flex: 1,
    paddingTop: '56.25%', // 16:9
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();
  // const [events, setEvents] = useState([])

  // Altera o state da store no REDUX
  const dispatch = useDispatch();

  // Pegar da Store
  const events = useSelector(state => state.events_store);

  function setaEventos(arrayEventos) {
    return { type: 'SETAR_EVENT', arrayEventos }
  }

  async function fetchItems() {
    const arrayFinal = []
    // eslint-disable-next-line
    const eventsarray = await axios.get("/events.json")
      .then(res => res.data)
      .then(event => {
        for (let x in event) {
          arrayFinal.push(event[x])
        }
      })
    dispatch(setaEventos(arrayFinal))
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hook do React Router DOM
  let history = useHistory();
  const maisInfo = eventName => {
    history.push(`/eventos/${eventName}`);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
              <Typography component="h4" variant="h5" align="center" color="textPrimary" gutterBottom>
                <strong>Sign up</strong> for receive all  <strong>notifications</strong> of the next events.
            </Typography>
            </Grid>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  SignUp
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* //  ----------  Cards  ----------   */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {events.map((card) => (

                <Grid item key={card.event_name} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.event_photo}
                      title="Image title"
                    >
                    </CardMedia>
                    <Button onClick={() => maisInfo(card.event_name)}
                      variant="contained" color="primary"
                    >
                      More Informations
                      </Button>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Container>
      </main>

    </React.Fragment>
  );
}
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';


import firebase from 'firebase'


const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    media: {
        width: '100%',
        paddingTop: '56.25%', // 16:9
    },
    input: {
        display: 'none',
    },
    button: {
        margin: theme.spacing(1),
        color: '#FFF',
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [foto_perfil, setFoto_perfil] = React.useState();
    const [imgPreview, setImgPreview] = React.useState();
    const [disable, setDisable] = React.useState(true);
    const [perfil, setPerfil] = React.useState({
        first_name: '',
        last_name: '',
        address: '',
        photo_URL: ''
    })

    // Verificar se o perfil já tem informações cadastradas 
    // e se tiver carregar as informações nos inputs 
    // Acessa o state da store no REDUX
    const user_infos = useSelector(state => state.current_user_info);
    useEffect(() => {
        setPerfil(user_infos);
    }, [user_infos]);


    // Função do editButton DISABLE ? on : off
    const allow_changes = () => {
        setDisable(!disable);
    };

    const cadastrar_perfil = async () => {

        const email = firebase.auth().currentUser.email;
        const userId = firebase.auth().currentUser.uid;

        if (foto_perfil) {
            // Referenciar o Storage
            // O nome da IMG usa o email do Currrent User
            // quando é feito um novo upload de IMG a IMG nova sobrepõe 
            // a IMG antiga 

            const storageRef = firebase.storage().ref(`perfil_photo/${email}`);

            // Enviar o arquivo && Setar imagem do Perfil no DB
            // faz o Store da IMG do perfil no firebase e seta a DownloadURL
            // da IMG para a variável perfil que será persistida 
            // com as principais informações do usuário
            await storageRef.put(foto_perfil).then(
                res => res.ref.getDownloadURL()
            ).then(res => perfil.photo_URL = res);
        };

        // Enviar dados para o perfil
        // O método SET persiste um novo dado e atualiza se já exixtente
        // a referência toma como caminho {users/ + userId} que é obtido 
        // quando o usuário faz seu registro. Dessa forma as informações 
        // de cada usuário é persistida/atualizada sem prejudicar 
        // a harmonia do DB.
        firebase.database().ref('users/' + userId).set(perfil);
    }

    const handleChange = name => event => {
        setPerfil({ ...perfil, [name]: event.target.value });
    };

    //Img live Preview && set Img para a variável
    function previewFile() {
        let file = document.querySelector('input[type=file]').files[0];

        setFoto_perfil(file)

        let reader = new FileReader();

        reader.onloadend = function () {
            setImgPreview(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            perfil.photo_URL = '';;
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container justify="center" alignItems="center">
                    <CardMedia
                        className={classes.media}
                        image={imgPreview ? imgPreview : perfil.photo_URL }
                    >
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="outlined-button-file"
                            disabled={disable}
                            type="file"
                            onChange={() => previewFile()}
                        />
                        <label htmlFor="outlined-button-file">
                            <Button variant="outlined"
                                color="inherit"
                                component="span"
                                disabled={disable}
                                className={classes.button}>
                                Upload
                            </Button>
                        </label>
                    </CardMedia>
                </Grid>
                <form className={classes.form} noValidate>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                disabled={disable}
                                value={perfil.first_name}
                                onChange={handleChange('first_name')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                disabled={disable}
                                value={perfil.last_name}
                                onChange={handleChange('last_name')}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                autoComplete="address"
                                disabled={disable}
                                value={perfil.address}
                                onChange={handleChange('address')}

                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={allow_changes}
                        fullWidth
                        variant="contained"
                        color="default"
                        className={classes.submit}
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={cadastrar_perfil}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Salvar
                    </Button>

                </form>
            </div>
        </Container>
    );
}

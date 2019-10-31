import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';



// Importar o módulo do firebase {core}
import firebase from 'firebase'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


// CSS no component
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navLink: {
        color: `#ffffff`,
        animation: `none`,
        textDecoration: `none`,
    },
    bigAvatar: {
        margin: 10,
        width: 45,
        height: 45,
    },
}));

export default function ButtonAppBar() {
    // stateHook do React
    const [anchorEl, setAnchorEl] = useState(null);

    // Acessa o state da store no REDUX
    const user_photo = useSelector(state => state.current_user_info.photo_URL)

    // Altera o state da store no REDUX
    const dispatch = useDispatch();

    // Hook do React Router DOM
    let history = useHistory();

    // Chama as propriedades do CSS
    const classes = useStyles();

    // Funçao logout do firebase juntamente com o dispatch do REDUX
    const singOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function () {
                alert('Você se deslogou');

                // Finalidade desse dispatch é zerar o state do perfil
                // quando efetuado o logout
                dispatch({ type: 'SETAR_CURRENT_USER_INFO', user_info: {} })
                
                // historyHook para redireccionar a rota
                history.push(`/login`);
            }, function (error) {
                console.error(error);
            });
    }

    const navBarMethods = {
        // Login Button
        loginBtn: () => {
            return (
                <Link className={classes.navLink} to="/login">
                    <Button color="inherit">Login</Button>
                </Link>
            )
        },
        // LogOut Button
        logOutBtn: () => {
            return (
                <Button color="inherit" onClick={singOut}>Logout</Button>
            )
        },

        // Create Event Button
        createEvent: () => {
            let userID = firebase.auth().currentUser.uid
            return (
                <Link className={classes.navLink} to={`/createevent/${userID}`}>
                    <Button color="inherit">Create an Event</Button>
                </Link>
            )
        }
    }

    // Menu Usuário
    const perfilUser = () => {
        // Profile Route
        // Cria a Rota individual para o perfil do usuário
        const profileRoute = () => {
            let userID = firebase.auth().currentUser.uid
            history.push(`/users/${userID}`);
        }
        const handleClick = event => {
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        return (
            <>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <Avatar alt="Remy Sharp" src={user_photo} className={classes.bigAvatar} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={profileRoute}>Profile</MenuItem>
                    <MenuItem >My Events</MenuItem>
                    <MenuItem onClick={singOut}>SingOut</MenuItem>
                </Menu>
            </>
        )
    }


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {user_photo ? perfilUser() : null}
                    </Typography>


                    {user_photo ? navBarMethods.createEvent() : null}
                    <Link className={classes.navLink} to="/eventos">
                        <Button color="inherit">Events</Button>
                    </Link>

                    {/* Operações lógicas com componentes */}
                    {!user_photo ? navBarMethods.loginBtn() : navBarMethods.logOutBtn()}

                </Toolbar>
            </AppBar>
        </div>
    );
}



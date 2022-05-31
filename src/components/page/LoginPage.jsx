import React from 'react'
import Button from "@material-ui/core/Button";
import Header from "../Header";
import axios from "axios";
import config from "../../config";
import {Box, Container, Grid, Paper, Stack} from "@mui/material";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        top: "50%",

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 24,
    },
    error: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
    field: {
        marginBottom: 15
    }
});

const headers = {
    'Content-Type': 'application/json',
}

class LoginPage extends React.Component{
    state = {
        data: {
            username: '',
            password: ''
        },
        error: '',
        token: '',
        errorAlert: false
    }

    onChangeLoginInput = e => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            error: ''
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({errorAlert: false});
    };



    onLogin = e => {
        e.preventDefault()
        this.setState({errorAlert: false})
        const file = new FormData()
        file.append("username", this.state.data.username)
        file.append("password", this.state.data.password)
        axios
            .post(config.apiJavaUrl + '/login',
                {
                username: this.state.data.username,
                password: this.state.data.password
            }).then(({ data }) => {
            this.setState({
                token: data.token
            })
            localStorage.setItem('access_token', data.token)
            this.props.onLogin()
        })
            .catch(e => {
                this.setState({error: 'Invalid username or password!'})
                this.setState({errorAlert: true})
            })
    }

    render(){
        const { classes } = this.props;
        return (
            <div className="wrapper">
                <div className="box">
                    <Container className="main-container">
                        <Header onLogout={() => this.props.onLogout()}/>
                    </Container>
                    <Grid container spacing={3}>
                        <Grid item xs>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={4}>
                                <Paper className="paper"
                                       sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 10 } }}
                                >
                                    <Box component="form" noValidate sx={{ mt: 1 }}>
                                        <Stack className="stack" spacing={7}>
                                            <Box>
                                                <Typography className={classes.title}>Логин</Typography>
                                                <input
                                                    className="signUp-input"
                                                    required
                                                    id="username"
                                                    autoComplete="username"
                                                    autoFocus
                                                    name="username"
                                                    value={this.state.data.username}
                                                    onChange={this.onChangeLoginInput}
                                                />
                                            </Box>
                                            <Box>
                                                <Typography className={classes.title}>Пароль</Typography>
                                                <input
                                                    className="signUp-input"
                                                    type="password"
                                                    id="password"
                                                    autoComplete="current-password"
                                                    name="password"
                                                    value={this.state.data.password}
                                                    onChange={this.onChangeLoginInput}
                                                />
                                            </Box>
                                            <div className="signInButton-container">
                                                <div className="signInButton-center">
                                                    <Button
                                                        disableRipple
                                                        className="signInButton"
                                                        onClick={this.onLogin}
                                                    >
                                                        Войти
                                                    </Button>
                                                </div>
                                            </div>
                                        </Stack>
                                    </Box>
                                </Paper>
                                {this.state.errorAlert ? (
                                    <Paper className="paper-error">
                                        <Typography className={classes.error}>Проверьте правильность написания введенных данных</Typography>
                                    </Paper>
                                ): (
                                    <div>

                                    </div>
                                )}
                            </Stack>
                        </Grid>
                        <Grid item xs>
                        </Grid>
                    </Grid>
                </div>

            </div>
        );
    }
}

export default withStyles(useStyles)(LoginPage);
import React from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import App from "../App";
import {Box, Container, Link, Stack} from "@mui/material";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import mainLogo from "../../images/Group 43.png"
import mainImage from "../../images/Group 40.png"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class HomePage extends React.Component{
    state = {
        isStarting: false
    }

    componentDidMount() {
        if (localStorage.getItem("isStarting") === "true"){
            this.setState({
                isStarting: true
            })
        }
    }

    onStart = () =>{
        this.setState({
            isStarting: true
        })
        localStorage.setItem("isStarting", "true")
    }

    onLogout = () => {
        this.setState({
            isStarting: false
        })
        localStorage.removeItem("isStarting")
    }

    render(){
        if(this.state.isStarting){
            return(
                <BrowserRouter>
                    <Route path = "/">
                        <App onLogout={this.onLogout}/>
                    </Route>
                </BrowserRouter>
            )
        }else{
            return(
                <BrowserRouter>
                    <Route path = "/">
                        <div className="wrapper">
                            <Container className="header-container">
                                <div >
                                    <AppBar position="static" color="inherit" style={{background: 'transparent', boxShadow: "none", marginTop: "30px"}}>
                                        <Toolbar className="main-toolbar" sx={{ justifyContent: 'space-between'}}>
                                            <Box  />
                                            <Link
                                                underline="none"
                                                color="inherit"
                                                href="/premium-themes/onepirate/"
                                                className="text-logo"
                                            >
                                                <img src={mainLogo} alt="Kitty Katty!" className="user-image image-block"/>
                                            </Link>
                                        </Toolbar>
                                    </AppBar>
                                </div>
                            </Container>
                            <Container id="main-container" className="main-home-container">

                                <div>
                                    <Stack spacing={20} justifyContent="flex-end"
                                           alignItems="center" className="home-stack" direction="row">
                                        <div className="main-text-container">
                                            <Typography className="main-text">Информационно-</Typography>
                                            <Typography className="main-text">справочная система</Typography>
                                            <div className="main-title">
                                                <Typography className="main-text-title">по дисциплине «Проектирование </Typography>
                                                <Typography className="main-text-title">и архитектура программных систем»</Typography>
                                            </div>
                                            <Button
                                                disableRipple
                                                className="startButton"
                                                onClick={this.onStart}
                                            >
                                                Войти
                                            </Button>
                                        </div>
                                        <div className="main-image-container">
                                            <img src={mainImage} alt="Kitty Katty!" className="user-image image-block"/>
                                        </div>
                                    </Stack>
                                </div>
                            </Container>
                        </div>
                    </Route>
                </BrowserRouter>

            )
        }
    }
}

export default HomePage;
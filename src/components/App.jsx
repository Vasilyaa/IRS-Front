import React from 'react'
import axios from 'axios'
import {BrowserRouter, Route} from "react-router-dom";
import MainPage from './page/MainPage';
import LoginPage from "./page/LoginPage";

class App extends React.Component{
    state = {
        isAuth: false
    }

    componentDidMount() {
        if(localStorage.getItem('access_token')){
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token')
            this.setState({isAuth: true})
        }
    }


    onLogin = () => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
        this.setState({
            isAuth: true
        })
    }

    onLogout = () =>{
        localStorage.removeItem("access_token")
        delete axios.defaults.headers.common['Authorization']
        this.setState({isAuth: false})
    }

    render(){
        if(this.state.isAuth){
            return(
                <BrowserRouter>
                    <Route path = "/">
                        <MainPage onLogout={this.onLogout} isAuth={this.state.isAuth}/>
                    </Route>
                </BrowserRouter>
            )
        }else{
            return(
                <BrowserRouter>
                    <Route path = "/">
                        <LoginPage onLogout={this.props.onLogout} onLogin={this.onLogin}/>
                    </Route>
                </BrowserRouter>
            )
        }
    }
}

export default App;
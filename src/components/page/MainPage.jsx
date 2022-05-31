import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Header from '../Header';
import Typography from "@material-ui/core/Typography";
import {Container, Popover, Stack} from "@mui/material";
import logo1 from "./../../images/Ikonka_4.png"
import logo2 from "../../images/Ikonka_3.png";
import axios from "axios";
import config from "../../config";
import ThemeTable from "../blocks/ThemeTable";
import Button from "@mui/material/Button";
import {Dropdown} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import ArticlePage from "./ArticlePage";


const useStyles  = theme =>({
    root: {
        flexGrow: 1,
        margin: '50px'
    },
    button: {
        backgroundColor: ""
    },
    logo: {
        width: "16px",
        height: "16px"
    },
    menu: {
        width: "90%"
    }
})

class MainPage extends React.Component{
    state = {
        currentUser: null,
        themes: [],
        anchorEl: null,
        themeData: {
            name: null
        },
        errorAlert: false,
        changingId: null,
        isStudent: false,
        isOpen: false,
        openedArticle: null,
        findValue: null
    }

    componentDidMount() {

        this.getUserInfo()
        this.getAllThemes()
        if(localStorage.getItem("isOpen")){
            this.setState({
                isOpen : true
            })
        }
    }

    handleClick = (event) => {
        console.log(event)
        this.setState({
            anchorEl: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    };


    getUserInfo = () => {
        return axios
            .get(config.apiJavaUrl + '/user/info')
            .then(res => {
                this.setState({
                    currentUser: res.data,
                    isStudent: res.data.roleName === "Студент"
                })
            })
            .catch(e => {
                this.setState({
                    currentUser: null
                })
            })
    }

    getAllThemes = () => {
        axios
            .get(config.apiJavaUrl + '/header/all')
            .then(res => {
                this.setState({
                    themes: res.data,
                })
            })
            .catch(e => {
                this.setState({
                    themes: null
                })
            })
    }

    onAddNewTheme = () => {
        this.setState({errorAlert: false})
        axios
            .post(config.apiJavaUrl + '/header/add',
                {
                    name: this.state.themeData.name,
                }).then(({ data }) => {
            this.setState({
                themes: [...this.state.themes, data]
            })
        })
            .catch(e => {
                this.setState({errorAlert: true})
            })
    }

    onChangeThemeInput = e => {
        console.log(this.state.themeData.name)
        this.setState({
            themeData: {
                ...this.state.themeData,
                [e.target.name]: e.target.value
            },
            error: ''
        })
    }

    onDelete = id => {
        console.log(id)
        const themes = this.state.themes
        themes.splice(id, 1)
        console.log(themes)
        this.setState({
            themes: themes
        })
    }

    onOpenArticle = (id) => {
        this.setState({
            isOpen: true,
            openedArticle: id
        })
        localStorage.setItem("isOpen", true)
        localStorage.setItem("openedArticle", id)

    }

    onCloseArticle = () => {
        this.setState({
            isOpen: false
        })
        localStorage.removeItem("isOpen")
        localStorage.removeItem("openedArticle")
    }

    onChangeFindInput = e => {
        console.log(this.state.findValue)
        if(e.target.value === null || e.target.value.length === 0){
            this.getAllThemes()
        }else{
            this.setState({
                [e.target.name]: e.target.value,
                error: ''
            })
            axios
                .get(config.apiJavaUrl + '/header/all/' + e.target.value)
                .then(res => {
                    this.setState({
                        themes: res.data,
                    })
                })
                .catch(e => {
                    this.setState({
                        themes: null
                    })
                })

        }

    }

    onChange = (i, name) => {
        const newThemes = this.state.themes
        newThemes[i].name = name
        this.setState({
            themes: newThemes
        })
    }



    render(){
        const { pageProps } = this.props
        return (
            <div className="wrapper">
                {!this.state.isOpen ? (
                    <Container id="main-container" className="main-container">
                        <div>
                            <Header onLogout={this.props.onLogout}/>
                        </div>
                        <div>
                            <Stack className="user-info-div">
                                <div>
                                    <img src={logo1} alt="Kitty Katty!" className="user-image image-block"/>
                                    <Typography className="text-header image-block">Пользователь: {this.state.currentUser ? this.state.currentUser.fullName : ""}</Typography>
                                </div>
                                <div>
                                    <img src={logo2} alt="Kitty Katty!" className="user-image image-block"/>
                                    <Typography className="text-header image-block">Статус: {this.state.currentUser ? this.state.currentUser.roleName : ""}</Typography>
                                </div>
                            </Stack>
                            <div className="content-div">
                                <Typography className="text-content">СОДЕРЖАНИЕ</Typography>
                            </div>
                            <input
                                className="search-input"
                                required
                                placeholder="Введите ключевое слово, чтобы найти нужную лекцию"
                                id="findValue"
                                autoComplete="findValue"
                                name="findValue"
                                onChange={this.onChangeFindInput}
                            />

                        </div>
                        {!this.state.isStudent ? (
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <Button
                                        id="basic-button"
                                        aria-haspopup="true"
                                        className="add-theme-div"
                                    >
                                        <Typography className="text-theme">Добавить новую тему</Typography>
                                    </Button>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dropdown-theme">
                                    <Stack direction="row" className="dropdown-container">
                                        <Container className="add-theme-field-container">
                                            <input
                                                className="add-theme-input"
                                                required
                                                id="name"
                                                autoComplete="name"
                                                name="name"
                                                value={this.state.themeData.name}
                                                onChange={this.onChangeThemeInput}
                                            />
                                        </Container>
                                        <Container className="add-theme-button-container">
                                            <DropdownItem
                                                as="button"
                                                className="dropdown-item MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root add-theme-button css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                                                onClick={this.onAddNewTheme}
                                                disabled={this.state.themeData.name === null || this.state.themeData.name.length <= 0}
                                            >
                                                Сохранить
                                            </DropdownItem>
                                        </Container>

                                    </Stack>
                                </Dropdown.Menu>
                            </Dropdown>
                        ): ("")}
                        <div>
                            <ThemeTable onChange={this.onChange} onOpenArticle={this.onOpenArticle} isStudent={this.state.isStudent} onDelete={this.onDelete} themes={this.state.themes}/>
                        </div>
                    </Container>
                ): (
                    <ArticlePage
                        {...pageProps}
                        onClose={this.onCloseArticle}
                        currentUser={this.state.currentUser}
                        openedArticle={this.state.openedArticle}
                    >

                    </ArticlePage>
                )}
            </div>
        );
    }
}

export default withStyles(useStyles)(MainPage);
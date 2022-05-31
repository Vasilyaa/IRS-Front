import React from 'react'
import {withStyles} from '@material-ui/core/styles';
import Header from '../Header';
import Typography from "@material-ui/core/Typography";
import {Box, Container, Grid, ImageList, Input, Popover, Stack, styled} from "@mui/material";
import logo1 from "./../../images/Ikonka_4.png"
import logo2 from "../../images/Ikonka_3.png";
import axios from "axios";
import config from "../../config";
import ThemeTable from "../blocks/ThemeTable";
import Button from "@mui/material/Button";
import {Dropdown} from "react-bootstrap";
import DropdownItem from "react-bootstrap/DropdownItem";
import ArticleImage from "../blocks/ArticleImage";


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

const AddInput = styled('input')({
    display: 'none',
});

class ArticlePage extends React.Component{
    state = {
        article: null
    }

    componentDidMount() {
        const id = localStorage.getItem("openedArticle")
        axios
            .get(config.apiJavaUrl + '/article/get/' + id)
            .then(res => {
                this.setState({
                    article: res.data
                })
            })
            .catch(e => {
                this.setState({
                    article: null
                })
            })
    }

    onAddImage = (e) => {

        var file = document.getElementById("contained-button-file").files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ((e) => {
            return (f) => {
                axios
                    .post(config.apiJavaUrl + '/image/add',
                        {
                            articleId: this.state.article.id,
                            imageBase64: reader.result
                        }).then(({ data }) => {
                            const article = this.state.article
                            article.images.push(data)
                            this.setState({
                                article: article
                            })
                })
                    .catch(e => {
                        this.setState({errorAlert: true})
                    })
            };
        })(file);
    }

    onDeleteImage = (index) => {
        const newArticle = this.state.article;
        newArticle.images.splice(index, 1)
        this.setState({
            article: newArticle
        })
    }

    onDeleteAll = () => {
        axios
            .get(config.apiJavaUrl + '/image/deleteAll')
            .then(res => {
                const newArticle = this.state.article;
                newArticle.images = []
                this.setState({
                    article: newArticle
                })
            })
    }

    onSwapImages = (firstId, secondId) => {
        console.log("FirstId" + firstId + "SecondId" + secondId)
        if(firstId >= 0 && secondId >= 0 && firstId < this.state.article.images.length && secondId < this.state.article.images.length){
            const newArticle = this.state.article
            console.log(newArticle)
            const temp = newArticle.images[secondId]
            console.log(temp)
            newArticle.images[secondId] = newArticle.images[firstId]
            newArticle.images[firstId] = temp
            console.log(newArticle)
            this.setState({
                article: newArticle
            })
        }
    }


    render(){
        return (
            <div className="article-box">
                <Container id="main-container" className="main-container">
                    <div>
                        <Header onLogout={this.props.onClose}/>
                    </div>
                    <div>
                        <Stack className="user-info-div">
                            <div>
                                <img src={logo1} alt="Kitty Katty!" className="user-image image-block"/>
                                <Typography className="text-header image-block">Пользователь: {this.props.currentUser ? this.props.currentUser.fullName : ""}</Typography>
                            </div>
                            <div>
                                <img src={logo2} alt="Kitty Katty!" className="user-image image-block"/>
                                <Typography className="text-header image-block">Статус: {this.props.currentUser ? this.props.currentUser.roleName : ""}</Typography>
                            </div>
                        </Stack>
                        <div className="content-div">
                            <Typography className="text-content">{this.state.article ? this.state.article.headerTitle : ""}</Typography>
                        </div>

                    </div>
                    {this.props.currentUser && this.props.currentUser.roleName === "Преподаватель" ? (
                        <Stack direction="row" spacing={4} >
                            <label htmlFor="contained-button-file">
                                <AddInput
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple type="file"
                                    onChange={this.onAddImage}
                                />
                                <Button
                                    component="span"
                                    type="submit"
                                    className="add-theme-div"
                                >
                                    <Typography className="text-theme">Загрузить фотографию</Typography>
                                </Button>

                            </label>
                            <div>
                                <Button
                                    id="basic-button"
                                    aria-haspopup="true"
                                    className="add-theme-div"
                                    onClick={this.onDeleteAll}
                                >
                                    <Typography className="text-theme">Удалить все фотографии </Typography>
                                </Button>
                            </div>
                        </Stack>
                    ): ("")}

                    {this.state.article ? (

                        <ImageList cols={4} gap={80}>
                            {this.state.article.images.map((image, index) => (
                                <ArticleImage onSwapImages={this.onSwapImages} onDelete={this.onDeleteImage} index={index} image={image}/>
                            ))}
                        </ImageList>
                    ): ("")}
                </Container>
            </div>
        );
    }
}

export default withStyles(useStyles)(ArticlePage);
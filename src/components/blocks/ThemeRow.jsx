import React, {memo, useEffect} from 'react'
import Typography from "@material-ui/core/Typography";
import {Container, IconButton, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import config from "../../config";
import DropdownItem from "react-bootstrap/DropdownItem";
import ThemeChange from "./ThemeChange";
import CloseIcon from '@mui/icons-material/Close';
import ThemeDelete from "./ThemeDelete";




const ThemeRow = props => {
    const [isActive, setIsActive] = React.useState(false);
    const [isDelete, setIsDelete] = React.useState(false);
    const [isChange, setIsChange] = React.useState(true);
    const [name, setName] = React.useState(props.theme.name ? props.theme.name : "")
    const [commentaries, setCommentaries] = React.useState(props.theme.commentaries ? props.theme.commentaries : [])

    const handleClickChange = () => {
        setIsActive(true);
        setIsChange(true);
        props.handleChanging(props.index)
    };

    const handleClickAdd = () => {
        setIsActive(true);
        setIsChange(false)
        props.handleChanging(props.index)
    };

    const handleClickDelete = () => {
        setIsDelete(true);
        props.handleDeleting(props.index)
    };

    useEffect(() => {
        setName(props.theme.name)
        if(props.changingId !== null && props.changingId !== props.index){
            setIsActive(false);
            setIsDelete(false)
        }

        if(props.deletingId !== null && props.deletingId !== props.index){
            setIsDelete(false)
            setIsActive(false)
        }
    })

    const onDelete = () =>{
        axios
            .get(config.apiJavaUrl + '/header/delete/' + props.theme.id)
            .then(res => {
                setIsDelete(false)
                props.onDelete(props.index - 1)
            })
            .catch(e => {
                this.setState({
                    themes: null
                })
            })
    }

    const onChange = (name) =>{
        axios
            .post(config.apiJavaUrl + '/header/update', {
                id: props.theme.id,
                newName: name
            })
            .then(res => {
                setName(res.data.name)
                setIsActive(false)
                props.onChange(props.index - 1, name)
            })
            .catch(e => {

            })

    }

    const onAddComment = (comment) => {
        axios
            .post(config.apiJavaUrl + '/commentary/add', {
                text: comment,
                headerId: props.theme.id,
            })
            .then(res => {
                setCommentaries([...commentaries, res.data])
                setIsActive(false)
            })
            .catch(e => {

            })
    }

    const onDeleteComment = (id, index) => {
        axios
            .get(config.apiJavaUrl + '/commentary/delete/' + id)
            .then(res => {
                const newCommentaries = commentaries;
                newCommentaries.splice(index, 1)
                setCommentaries(newCommentaries)
                setIsActive(true)
                setIsActive(false)
            })
            .catch(e => {

            })
    }

    const onOpen = () => {
        props.onOpenArticle(props.theme.articleId)
    }

    return (
        <div className="table-row">
            {isActive ? (
                <ThemeChange onAddComment={onAddComment} onChange={onChange} type={isChange} name={name}/>
            ): ("")}

            {isDelete ? (
                <ThemeDelete onDelete={onDelete} name={name}/>
            ): ("")}

            <div className="table-data trow-id"><p className="tdata-id">{props.index? props.index : ""}</p></div>
            <div className="table-data trow-theme">
                <Button
                    id="basic-button"
                    aria-haspopup="true"
                    className="theme-button"
                    onClick={onOpen}
                >
                    <p className="tdata-theme">{name}</p>
                </Button>

            </div>
            <div className="table-data trow-com">
                {commentaries.map((comment, i) => (
                        <Stack className="comment-stack" direction="row"
                               justifyContent="space-between"
                               alignItems="center"
                               spacing={2}>
                            {i + 1}.{comment.content}
                            {!props.isStudent ? (
                                <IconButton
                                    aria-label="Example"
                                    onClick={() => onDeleteComment(comment.id, i)}
                                >
                                    <CloseIcon color="action" fontSize="small"/>
                                </IconButton>
                            ): ("")}
                        </Stack>
                    ))}
            </div>
            <div className="table-data trow-date">{props.theme.createTime ? props.theme.createTime : ""}</div>
            {!props.isStudent ? (
                <div className="table-data trow-action">
                    <Stack
                        className="table-action"
                        direction="row"
                        spacing={3}
                    >
                        <Button
                            id="basic-button"
                            aria-haspopup="true"
                            className="theme-button"
                            onClick={handleClickChange}
                        >
                            <Typography className="text-theme">изменить</Typography>
                        </Button>
                        <Button
                            id="basic-button"
                            aria-haspopup="true"
                            className="theme-button"
                            onClick={handleClickDelete}

                        >
                            <Typography className="text-theme">удалить</Typography>
                        </Button>
                    </Stack>
                    <Button
                        id="basic-button"
                        aria-haspopup="true"
                        className="theme-button"
                        onClick={handleClickAdd}
                    >
                        <Typography className="text-theme">добавить заметку</Typography>
                    </Button>

                </div>
            ) : ("")}
        </div>
    );
}

export default memo(ThemeRow);
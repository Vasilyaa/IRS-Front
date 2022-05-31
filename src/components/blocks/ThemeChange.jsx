import React from 'react'
import {Container, Stack} from "@mui/material";
import DropdownItem from "react-bootstrap/DropdownItem";


const ThemeChange = props => {
    const [name, setName] = React.useState(props.name)
    const [commentary, setCommentary] = React.useState(null)

    const onChangeNameInput = e => {
        console.log(name)
        setName(e.target.value)
    }

    const onChangeCommentaryInput = e => {
        console.log(commentary)
        setCommentary(e.target.value)
    }

    const onChange = () => {
        props.onChange(name)
    }

    const onAddComment = () => {
        props.onAddComment(commentary)
    }


    return (
        <div className="theme-change-block">
            {props.type ? (
                <Stack direction="row" className="dropdown-container">
                    <Container className="add-theme-field-container">
                        <input
                            className="add-theme-input"
                            required
                            id="name"
                            autoComplete="name"
                            name="name"
                            value={name}
                            onChange={onChangeNameInput}
                        />
                    </Container>
                    <Container className="add-theme-button-container">
                        <DropdownItem
                            disabled={!props.type}
                            as="button"
                            className="dropdown-item MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root add-theme-button css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            onClick={onChange}
                        >
                            Сохранить
                        </DropdownItem>
                    </Container>

                </Stack>
            ): (
                <Stack direction="row" className="dropdown-container">
                    <Container className="add-theme-field-container">
                        <input
                            className="add-theme-input"
                            required
                            id="name"
                            autoComplete="name"
                            name="name"
                            value={commentary}
                            onChange={onChangeCommentaryInput}
                        />
                    </Container>
                    <Container className="add-theme-button-container">
                        <DropdownItem
                            disabled={props.type}
                            as="button"
                            className="dropdown-item MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButtonBase-root add-theme-button css-1e6y48t-MuiButtonBase-root-MuiButton-root"
                            onClick={onAddComment}
                        >
                            Добавить
                        </DropdownItem>
                    </Container>

                </Stack>
            )}
        </div>
    );
}

export default ThemeChange;
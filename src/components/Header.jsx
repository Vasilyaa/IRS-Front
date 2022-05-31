import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Box, Link} from "@mui/material";
import mainLogo from "../images/Group 43.png";

const useStyles  = theme =>({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        fontSize: '30px'
    },
    contacts: {
        paddingLeft: '779px',
        fontSize: '24px'
    },
    about: {
        fontSize: '24px'
    },
    bar: {
        paddingLeft: "0px"
    }
})



class Header extends React.Component{
    state = {
        isOpenMenu: false,
        isOpenStats: false
    }

    onLogout = () => {
        this.props.onLogout();
    }

    render() {
        const { classes } = this.props;
        return (
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
                        <Box sx={{ flex: 8, display: 'flex', justifyContent: 'flex-end' }}>
                            <Link
                                color="inherit"
                                underline="none"
                                className="text-header"
                            >
                                ИИС
                            </Link>
                        </Box>
                        <Box sx={{ flex: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Link
                                color="inherit"
                                underline="none"
                                className="text-header"
                            >
                                ПиАПС
                            </Link>
                        </Box>
                        <Box sx={{ flex: 3, display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                disableRipple
                                className="signInButton"
                                onClick={this.onLogout}
                            >
                                Выйти
                            </Button>
                        </Box>

                    </Toolbar>
                </AppBar>
        </div>
        );
    }
}

export default withStyles(useStyles)(Header);
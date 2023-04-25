import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {AppBar, Hidden, Toolbar} from "@material-ui/core";
import * as classNames from 'classnames';
//import AdvancedLink from "../elements/util/AdvancedLink";
import FooterLink from "../elements/util/FooterLink";
import {Facebook, Instagram, Reddit, Telegram, Twitter} from "mdi-material-ui";

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flex: '1 1 auto',
    },
    containerBar: {
        backgroundColor:
            theme.palette.type === 'light' ? "white" : theme.palette.background.default,
        color: theme.typography.body2.color,
        padding: 20,
        minHeight: 100
    },
    bar: {
        justifyContent: "center",
        minHeight: "3em"
    },
    socialBar: {
        margin: 2 * theme.spacing.unit
    },
    copyrightText: {
        fontSize: "0.8em"
    },
    socialIcon: {
        height: "3rem",
        width: "3rem"
    }
});

class Footer extends React.Component {

    constructor() {
        super();
    }

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.root}>

                <AppBar elevation={0} position="static" className={classes.containerBar}>
                    <Toolbar className={classes.bar}>

                        <FooterLink to="/my-pepes" className={classes.headerButton}>My Pepes</FooterLink>
                        <FooterLink to="/marketplace">Marketplace</FooterLink>
                        <FooterLink to="/convert-dpep">Convert DPEP</FooterLink>
                        <FooterLink to="/mining-stats">Mining Stats</FooterLink>

                        <Hidden smDown>
                            <FooterLink to="/faq">FAQ</FooterLink>
                            <FooterLink to="/about">About us</FooterLink>
                        </Hidden>
                    </Toolbar>
                    <Hidden mdUp>
                        <Toolbar className={classes.bar}>
                            <FooterLink to="/faq">FAQ</FooterLink>
                            <FooterLink to="/about">About us</FooterLink>
                        </Toolbar>
                    </Hidden>

                    <Toolbar className={classNames(classes.bar, classes.socialBar)}>
                        <FooterLink external to="https://twitter.com/cryptopepes"><Twitter className={classes.socialIcon}/></FooterLink>
                        <FooterLink external to="https://reddit.com/r/cryptopepe"><Reddit className={classes.socialIcon}/></FooterLink>
                        <FooterLink external to="https://t.me/cryptopepes"><Telegram className={classes.socialIcon}/></FooterLink>
                        <FooterLink external to="https://www.facebook.com/cryptopepes/"><Facebook className={classes.socialIcon}/></FooterLink>
                        <FooterLink external to="https://www.instagram.com/cryptopepes/"><Instagram className={classes.socialIcon}/></FooterLink>
                    </Toolbar>

                    <Toolbar className={classes.bar}>

                        {/*<FooterLink to="/terms" variant="caption">Terms of use</FooterLink>*/}
                        {/*<FooterLink to="/privacy" variant="caption">Privacy policy</FooterLink>*/}

                        <Hidden smDown>
                            {/*<FooterLink variant="caption">|</FooterLink>*/}

                            <FooterLink to="/" className={classes.copyrightText} variant="caption">Copyright &copy; 2023 CryptoPepes.lol</FooterLink>
                        </Hidden>
                    </Toolbar>

                    <Hidden mdUp>
                        <Toolbar className={classes.bar}>
                            <FooterLink to="/" className={classes.copyrightText} variant="caption">Copyright &copy; 2023 CryptoPepes.lol</FooterLink>
                        </Toolbar>
                    </Hidden>

                </AppBar>

            </div>
        );
    }
}


export default withStyles(styles)(Footer);

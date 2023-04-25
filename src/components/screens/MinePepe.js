import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import {Grid, Typography, Button} from '@material-ui/core';
import Web3Utils from 'web3-utils';
import Web3StatusRedirector from "./Web3StatusRedirector";

const styles = theme => ({
    root: {
        minHeight: "80vh",
    },
    heading: {
        margin: (theme.spacing.unit * 4) + "px 0",
    },
    claimSection: {
        padding: theme.spacing.unit * 4,
    },
    input: {
        width: "80px",
        height: "40px",
        marginRight: "20px",
        paddingLeft: "8px",
        paddingRight: "3px",
        borderRadius: "0.25rem",
        border: "1px solid #ced4da"
    }
});

class MinePepe extends Component {

    constructor(props) {
        super(props);

        this.state = {
          buttonClicked: false,
          amount: 1
        };

        this._handleUpdate = this._handleUpdate.bind(this);
    }

    componentDidMount() {
        const {contracts, wallet} = this.props;
        if(contracts.GenesisActTwo) {
            this.address = Object.keys(wallet)[0];
            const {callID, thunk} = contracts.GenesisActTwo.methods.mined.cacheCall({});
            this.callID = callID;
            this.props.dispatch(thunk);
        }
    }

    _handleUpdate(e) {
      if (e.target.validity.valid) {
        this.setState({ amount: e.target.value });
      }
    }

    claimPepe = () => {
        const {contracts, wallet} = this.props;
        const amount = new Web3Utils.BN(this.state.amount);
        const price = new Web3Utils.BN("100000000000000000");
        const value = price.mul(amount);
        console.log("props:", this.props)

        const {txID, thunk} = contracts.GenesisActTwo.methods.birth.trackedSend(
            {from: Object.keys(wallet)[0], value: value},
            amount
        );

        this.setState({
            txTrackingId: txID,
        });

        this.props.dispatch(thunk);

        this.setState({
            buttonClicked: true
        });
    };

    render() {
        const {classes, data} = this.props;

        let mined = undefined;
        let mineable = 1100;
        let mineableRemaining = undefined;
        if(data[this.callID] && data[this.callID].value) {
            mined = data[this.callID].value[0];
            mineableRemaining = mineable - mined;
        }
        return(
            <div className={classes.root}>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Typography gutterBottom className={classes.heading} align="center" variant="display3">
                            The Birth of a Pepe
                        </Typography>

                        <Typography gutterBottom align="center">
                            You can receive a Reborn CryptoPepe (CPRE) with 0.1 ETH. Only 1100 Gen 0 CPREs can be created.
                        </Typography>

                        <Typography variant="subheading" className={classes.claimSection} align="center">
                            Pepes Remaining: {(mineableRemaining !== undefined && mineableRemaining !== null) ? mineableRemaining : "Loading"} <br />
                            {mineableRemaining > 0 && (<>
                              <br />
                              <input type="number" value={this.state.amount} onChange={this._handleUpdate} step="any" className={classes.input} min={0}/>
                              <Button onClick={this.claimPepe} size="large" variant="contained" color="secondary" className={classes.button}>
                                {this.state.amount > 1 ? "Claim Pepes" : "Claim Pepe"}
                            </Button>
                          </>)}
                        </Typography>

                        {this.state.buttonClicked && (
                            <Typography variant="subheading" align="center">Confirm the transaction in MetaMask or click again to claim another CryptoPepe.</Typography>
                        )}
                    </Grid>
                </Grid>
            </div>
        )
    }

}


const styledMinePepe = withStyles(styles)(MinePepe);
const ConnectedMinePepe = connect(
    state => ({
        contracts: state.redapp.contracts,
        data: state.redapp.tracking.calls,
        wallet: state.redapp.tracking.accounts.wallet
    })
)(styledMinePepe);


const ConnectedMinePepeWeb3Checked = () => {
    const dpepConvertCreator = () => <ConnectedMinePepe/>;
    // web3 needs to be active, and there needs to be an account available.
    return <Web3StatusRedirector dstAddrOk={dpepConvertCreator}/>;
};


export default ConnectedMinePepeWeb3Checked;

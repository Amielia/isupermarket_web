import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "firebase/storage";
import "firebase/firestore";

class ShowBeacon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beacon: [],
            key: ''

        };
    }
    componentDidMount() {
        const ref = firebase.firestore().collection('beacon').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    beacon: doc.data(),
                    key: doc.id,
                    isloading: false
                });

            } else {
                console.log("No such document here!")
            }
        });
    }
    /////////delete data ///////////////
    delete(id)
    {
        //var desertRef = firebase.storage().refFromURL(this.state.beacon.url)
        firebase.firestore().collection('beacon').doc(id).delete().then(()=>{
            console.log("Beacon is successfully deleted");
            alert("Beacon is successfully deleted");
            this.props.history.push("/app3")
        }).catch((error)=>
        {
            console.error("Error is", error);
        });
        // desertRef.delete().then(function(){
        //     console.log('file deleted')
        // }).catch(function()
        // {
        //     console.log('error while deleting the file')
        //     alert("Error deleting beacon");
        // });
    }
    render() {

        const cardStyles = {
            width: '60rem',
            height: 'auto',
            backgroundColor: 'white',
            margin: 'auto',
            // display: 'block',
            marginTop: '60px',
            opacity: 500,
            paddingTop: '10px',
            paddingLeft: '20px',
            // paddingRight: '20px',
            // borderStyle: 'outset',
            // borderLeft: '50px solid pink',
        }
        return (

            <div>
                <Card style={cardStyles}>

                    {/* <div class="panel panel-heading">
                        <h3 class = "Panel Heading">Show beacon</h3>
                    </div> */}
                    <div>
                        <Link to="/app3">
                            <button class="Edit-Button" variant='flat' size='small'>Back</button>
                        </Link>
                        <br></br>
                    </div>

                    <div className="container">
                        <div class="panel-body">
                            <br></br>
                            <dl>
                                <dt>Beacon Name:</dt>
                                <dd>{this.state.beacon.beaconName}</dd>
                            </dl>

                            <dl>
                                <dt>Beacon Id:</dt>
                                <dt>{this.state.beacon.beaconId}</dt>
                            </dl>

                            <dl>
                                <dt>Major:</dt>
                                <dd>{this.state.beacon.major}</dd>
                            </dl>
                            <dl>
                                <dt>Minor:</dt>
                                <dd>{this.state.beacon.minor}</dd>
                            </dl>

                            <div className="Buttons">
                                <Link to={`/edit3/${this.state.key}`} class="btn btn-success">Edit </Link> &nbsp;
                                <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>


                            </div>
                        </div>
                    </div>
                </Card>

            </div>
        )
    }
}
export default ShowBeacon
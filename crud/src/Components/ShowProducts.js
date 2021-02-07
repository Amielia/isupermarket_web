import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "firebase/storage";
import "firebase/firestore";

class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            key: ''

        };
    }
    componentDidMount() {
        const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    product: doc.data(),
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
        firebase.firestore().collection('Products').doc(id).delete().then(()=>{
            console.log("Product is successfully deleted");
            alert("Product is successfully deleted");
            this.props.history.push("/app")
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
                        <h3 class = "Panel Heading">Show Product</h3>
                    </div> */}

                    <Link to="/">
                        <button class="Edit-Button" variant='flat' size='small'>Back</button>
                    </Link>

                    <div className="upload-data">
                        <img src={this.state.product.url} height="200" width="200" />
                    </div>

                    <div className="container">
                        <center>

                        <div class="panel panel-default">
                            
                            <h3 class="panel-title">{this.state.product.name}</h3>
                           
                        </div>
                        </center>
                        <div class="panel-body">

                            <dl>
                                <dt>Beacon Name:</dt>
                                <dd>{this.state.product.beaconName}</dd>
                            </dl>

                            <dl>
                                <dt>Promotion:</dt>
                                <dd>{this.state.product.promotion}</dd>
                            </dl>

                            <dl>
                                <dt>Shelves:</dt>
                                <dd>{this.state.product.shelves}</dd>
                            </dl>

                            <dl>
                                <dt>Category:</dt>
                                <dd>{this.state.product.category}</dd>
                            </dl>

                            <dl>
                                <dt>Name:</dt>
                                <dd>{this.state.product.name}</dd>
                            </dl>

                            <dl>
                                <dt>Price:</dt>
                                <dd>RM {this.state.product.price}</dd>
                            </dl>

                            <dl>
                                <dt>Description:</dt>
                                <dd>{this.state.product.description}</dd>
                            </dl>



                            <div className="Buttons">
                               <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit </Link>&nbsp;
                            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
                            </div>
                           
                        </div>
                        
                    </div>
                </Card>

            </div>
        )
    }
}
export default Show
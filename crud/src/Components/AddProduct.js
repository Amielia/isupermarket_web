import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "firebase/storage";
import "firebase/firestore";



class AddProduct extends React.Component {
    constructor(props) {
        super(props);
        const lop = firebase.firestore().collection('Products').doc().id;
        this.ref = firebase.firestore().collection('Products');

        this.state = {
            beaconName: '',
            shelves: '',
            category: '',
            id: lop,
            description: '',
            name: '',
            price: 0.00,
            promotion: '',
            url: '',

            image: null,
            check: 0
        }
    }


    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    handleChange = (e) => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
        console.log(e.target.files[0]);
    }
    handleUpload = () => {
        this.setState({ check: 1 });
        const { image } = this.state;
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot) => { console.log('snapshot') },
            (error) => { console.log(error); },
            () => { firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => { this.setState({ url }) }) })
    }
    onSubmit = (e) => {
        if (this.state.check == 1) {
            e.preventDefault();
            const { id, beaconName, category, description, name, price, promotion, shelves } = this.state;
            this.ref.add({
                beaconName,
                category,
                description,
                id,
                name,
                price: parseFloat(this.state.price),
                promotion,
                shelves,
                url: this.state.url


            }).then((docRef) => {
                this.setState({
                    beaconName: '',
                    category: '',
                    description: '',
                    id: '',
                    name: '',
                    price: parseFloat(this.state.price),
                    promotion: '',
                    shelves: '',
                    url: ''
                });
                alert("Product Successfully Added")
                this.props.history.push("/app")

            })
                .catch((error) => {
                    console.error("Error adding document:", error);
                });
            this.setState({ check: 0 })
        } else {
            alert("Please upload your image first")
        }
    }
    render() {
        const { name, description } = this.state;
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
            paddingRight: '20px',
            // borderStyle: 'outset',
            // borderLeft: '50px solid pink',
        }
        return (
            <div>
                <Card style={cardStyles}>

                    <div>

                        <Link to="/">
                            <button class="Edit-Button" variant='flat' size='small'>Back</button>
                        </Link>

                        <div class="panel panel-heading">
                            <h3 class="Panel Heading">Add Product</h3>
                        </div>

                        <div className="upload-data">
                            <img src={this.state.url} height="200" width="200" />
                        </div>

                        <div className="upload-btn-wrapper">
                            <button class="file-btn">Choose a File</button>
                            <input type="file" onChange={this.handleChange} />
                        </div>

                        <div className="Buttons">
                            <button class="Submit-Button" onClick={this.handleUpload}>After CHOOSE A FILE, Please Click Here First!</button>
                        </div>

                        <div class="form-group"></div>
                        <label for="beaconName">Beacon Name:</label>
                        <input type="text" class="form-control" name="beaconName" onChange={this.onChange} placeholder="Example: Groceries"></input>

                        <div class="form-group"></div>
                        <label for="promotion">Promotion:</label>
                        <input type="text" class="form-control" name="promotion" onChange={this.onChange} placeholder="Example: Yes"></input>

                        <div class="form-group"></div>
                        <label for="shelves">Shelves:</label>
                        <input type="text" class="form-control" name="shelves" onChange={this.onChange} placeholder="Example: Rack S3, Stack 5"></input>

                        <div class="form-group"></div>
                        <label for="category">Category:</label>
                        <input type="text" class="form-control" name="category" onChange={this.onChange} placeholder="Example: Grocery"></input>


                        <div class="form-group"></div>
                        <label for="name">Name:</label>
                        <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Example: Beras Sejati"></input>


                        <div class="form-group"></div>
                        <label for="price">Price: </label>
                        <input type="text" class="form-control" name="price" onChange={this.onChange} placeholder="Example: 29.99 (PLEASE DO NOT INSERT SINGLE DIGIT OR .00)"></input>


                        <div class="form-group"></div>
                        <label for="description">Description:</label>
                        <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Example: Beras Sejati berkualiti dan terbaik" cols="80" rows="3">{description}</textArea>





                        <button class="Submit-Button" onClick={this.onSubmit}>Add</button>



                    </div>

                </Card>

            </div>
        )
    }
}
export default AddProduct
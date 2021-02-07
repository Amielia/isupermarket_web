import React from 'react';
import '../App.css';
import firebase from '../Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "firebase/storage";
import "firebase/firestore";

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            id: '',
            beaconName: '',
            promotion: '',
            shelves: '',
            category: '',
            name: '',
            description: '',
            price: 0.00,
            description: '',
            url: '',
            image: null
        }
    }
    componentDidMount() {
        const ref = firebase.firestore().collection('Products').doc(this.props.match.params.id);

        ref.get().then((doc) => {
            if (doc.exists) {
                const document = doc.data();
                this.setState({
                    key: doc.id,
                    id: doc.id,
                    beaconName: document.beaconName,
                    promotion: document.promotion,
                    shelves: document.shelves,
                    category: document.category,
                    name: document.name,
                    price: document.price,
                    description: document.description,
                    url: document.url

                });

            } else {
                console.log("No such document here!")
            }
        });
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
        const { image, url } = this.state;
        var desertRef = firebase.storage().refFromURL(url)
        const uploadTask = firebase.storage().ref(`images/${image.name}`).put(this.state.image)
        uploadTask.on('state_changed', (snapshot) => { console.log('snapshot') },
            (error) => { console.log(error); },
            () => { firebase.storage().ref('images').child(image.name).getDownloadURL().then(url => { this.setState({ url }) }) })

        desertRef.delete().then(function () {
            console.log('file deleted')
        }).catch(function (error) {
            console.log('error while deleting the file')
        });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ document: state });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { id, beaconName, promotion, shelves, category, name, price, description, url } = this.state;
        const updateRef = firebase.firestore().collection('Products').doc(this.state.key);
        updateRef.set({
            id,
            beaconName,
            promotion,
            shelves,
            category,
            name,
            price :  parseFloat(this.state.price),
            description,
            url

        }).then((docRef) => {
            this.setState({
                key: '',
                id: '',
                beaconName: '',
                promotion: '',
                shelves: '',
                category: '',
                name: '',
                price: parseFloat(this.state.price),
                description: '',
                url: ''
            });
            alert("Product Successfully Edited")
            this.props.history.push("/show/" + this.props.match.params.id)

        })
            .catch((error) => {
                console.error("Error Updating the document:", error);
            });
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
            paddingRight: '20px',
            // borderStyle: 'outset',
            // borderLeft: '50px solid pink',
        }
        return (
            <div>
                <Card style={cardStyles}>
                    {/* <div className = "Buttons">
                        <Link to = "/">
                        <button class= "Edit-Button" variant = 'flat' size = 'small'>Menu</button>
                        </Link>
                    </div>  */}
                    <Link to="/">
                        <button class="Edit-Button" variant='flat' size='small'>Products</button>
                    </Link>

                    <div class="panel panel-heading">
                        <h3 class="Panel Heading">Edit Product</h3>
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
                    <div className="container">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <form onSubmit={this.onSubmit}>

                                    {/* <div>
                            <div class="form-group"></div>
                            <label for="name">Promotion</label>
                            <RadioGroup onChange={this.onChange} horizontal>
                            <RadioButton value={this.state.promotion} onChange={this.onChange}>Yes</RadioButton>
                            <RadioButton value={this.state.promotion} onChange={this.onChange}>No</RadioButton>
                            </RadioGroup>
                            </div> */}


                                    {/* <div class="radio-button">
                            <label for="promotion">Promotion</label>
                                <input type="radio" name="promotion" value="promotion" onChange={this.handleChange}>{this.state.promotion}</input>
                            </div> */}

                                    <div class="form-group"></div>
                                    {/* <label for="id">ID</label> */}
                                    <input type='hidden' class="form-control" name="id" value={this.state.id} onChange={this.onChange} placeholder="Please Enter ID"></input>

                                    <div class="form-group"></div>
                                    <label for="beaconName">Beacon Name</label>
                                    <textArea class="form-control" name="beaconName" onChange={this.onChange} placeholder="Example: Groceries" cols="80" rows="1">{this.state.beaconName}</textArea>

                                    <div class="form-group"></div>
                                    <label for="promotion">Promotion</label>
                                    <textArea class="form-control" name="promotion" onChange={this.onChange} placeholder="Example: Yes" cols="80" rows="1">{this.state.promotion}</textArea>

                                    <div class="form-group"></div>
                                    <label for="shelves">Shelves</label>
                                    <textArea class="form-control" name="shelves" onChange={this.onChange} placeholder="Example: Rack S3, Stack 5" cols="80" rows="1">{this.state.shelves}</textArea>

                                    <div class="form-group"></div>
                                    <label for="category">Category</label>
                                    <textArea class="form-control" name="category" onChange={this.onChange} placeholder="Example: Grocery" cols="80" rows="1">{this.state.category}</textArea>

                                    <div>
                                        <div class="form-group"></div>
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Example: Beras Sejati"></input>
                                    </div>

                                    <div class="form-group"></div>
                                    <label for="price">Price</label>
                                    <textArea class="form-control" name="price" onChange={this.onChange} placeholder="Example: 29.99 (PLEASE DO NOT INSERT SINGLE DIGIT OR .00)" cols="80" rows="1">{this.state.price}</textArea>

                                    <div class="form-group"></div>
                                    <label for="description">Description</label>
                                    <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Example: Beras Sejati berkualiti dan terbaik" cols="80" rows="3">{this.state.description}</textArea>

                                    <br></br>
                                    <button type="submit" class="btn btn-success">Submit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>)
    }
}
export default EditProduct
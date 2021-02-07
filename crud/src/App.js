import React from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class App extends React.Component{
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection("Products")
    this.unsubscribe = null;
    this.state = {
      products : []
      
    };
  }
  handleLogout = () => {
    firebase.auth().signOut();
};
  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) =>{
    const products = [];
    querySnapshot.forEach((doc)=>{
      const {promotion, category, name, price, description, url} = doc.data();
      products.push({
        key: doc.id,
        doc,
        promotion,
        category,
        name,
        price,
        description,
        url
      });
    });
    this.setState({
      products
    });
  }
render(){
  const cardStyles = {
      
    width: '80rem',
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
  return(
    <div>
      <Card style = {cardStyles}>
        {/* <div className = "Buttons">
          <Link to = "/create">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Add </button>
          </Link>
        </div> */}

        {/* <div className = "Buttons">
          <Link to = "/show/:id">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Edit</button>
          </Link>
        </div> */}
         <div className = "Buttons1">
          <Link to = "/app3">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Beacon</button>
          </Link>
          &nbsp;
          {/* <Link to = "/app2">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Promotion</button>
          </Link> */}
          <Link to = "/">
          <button class= "Add-Button" onClick={this.handleLogout} variant = 'flat' size = 'small'>Logout</button>
          </Link>
         
          {/* <Link to = "/show/:id">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Promotion</button>
          </Link> */}
        </div>
      
        <div class="container">
          <div class="panel panel-heading">
            <h3 class = "Panel Heading">Product Details</h3>
          </div>
        </div>
        <div class = 'panel-body'>
          <table class = "table table-stripe">
            <thead>
              <tr>
                <th>Promotion</th>
                <th>Category</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Add</th>
                <th>Edit</th>
                
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(product =>
              <tr>
                 <td>{product.promotion}</td>
                <td>{product.category}</td>
                <td><img src = {product.url} width="100px" height="100px" alt=""></img></td>
                <td>{product.name}</td>
                {/* <td><Link to = {`/show/${product.key}`}>{product.name}</Link></td> */}
                <td>RM {product.price}</td>
                <td>{product.description}</td>
                <td> <Link to = "/create">
          <button class= "Add-Button" variant = 'flat' size = 'very small'>Add </button>
          </Link></td>
                <td><Link to = {`/show/${product.key}`}>{product.image}
          <button class= "Add-Button" variant = 'flat' size = 'small'>Edit</button>
          </Link></td>
               
              </tr>
          
              )
              }
            </tbody>
          </table>
        </div>
       
      </Card>
    </div>
  )
 }
}
export default App;
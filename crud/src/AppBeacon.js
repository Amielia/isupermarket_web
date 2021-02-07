import React from 'react';
import './App.css';
import firebase from './Config';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from 'react-dom';
import { Card } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class AppBeacon extends React.Component{
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection("beacon")
    this.unsubscribe = null;
    this.state = {
      beacon : []
      
    };
  }
  handleLogout = () => {
    firebase.auth().signOut();
};
  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  onCollectionUpdate = (querySnapshot) =>{
    const beacon = [];
    querySnapshot.forEach((doc)=>{
      const { beaconName, beaconId, major, minor} = doc.data();
      beacon.push({
        key: doc.id,
        doc,
        beaconId,
        beaconName,
        major,
        minor,
      });
    });
    this.setState({
      beacon
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
          <Link to = "/">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Products</button>
          </Link> &nbsp;
          <Link to = "/">
          <button class= "Add-Button" onClick={this.handleLogout} variant = 'flat' size = 'small'>Logout</button>
          </Link>
          {/* <Link to = "/app2">
          <button class= "Add-Button" variant = 'flat' size = 'small'>Promotion</button>
          </Link> */}
          {/* <Link to = "/show/:id">
          <button class= "Add-Button" variant = 'flat' size = 'small'>beacon</button>
          </Link> */}
        </div>
      
        <div class="container">
          <div class="panel panel-heading">
            <h3 class = "Panel Heading">Beacon Details</h3>
          </div>
        </div>
        <div class = 'panel-body'>
          <table class = "table table-stripe">
            <thead>
              <tr>
                <th>Beacon Name</th>
                <th>Beacon Id</th>
                <th>Major</th>
                <th>Minor</th>
                <th>Add</th>
                
              </tr>
            </thead>
            <tbody>
              {this.state.beacon.map(beacon =>
              <tr>
                 <td><Link to = {`/show3/${beacon.key}`}>{beacon.beaconName}</Link></td>
                {/* <td>{beacon.beaconId}</td> */}
                <td>{beacon.beaconId}</td>
                {/* <td><Link to = {`/show/${beacon.key}`}>{beacon.name}</Link></td> */}
                <td>{beacon.major}</td>
                <td>{beacon.minor}</td>
                <td> <Link to = "/create3">
          <button class= "Add-Button" variant = 'flat' size = 'very small'>Add </button>
          </Link></td>
                {/* <td><Link to = {`/show3/${beacon.key}`}> {beacon.}
          <button class= "Add-Button" variant = 'flat' size = 'small'>Edit</button>
          </Link></td> */}
               
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
export default AppBeacon;
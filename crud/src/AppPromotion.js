// import React from 'react';
// import './App.css';
// import firebase from './Config';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { render } from 'react-dom';
// import { Card } from 'react-bootstrap';
// import {Link} from 'react-router-dom';

// class AppPromotion extends React.Component{
//   constructor(props){
//     super(props);
//     this.ref = firebase.firestore().collection("promotion")
//     this.unsubscribe = null;
//     this.state = {
//       promotion : []
      
//     };
//   }
//   componentDidMount(){
//     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
//   }
//   onCollectionUpdate = (querySnapshot) =>{
//     const promotion = [];
//     querySnapshot.forEach((doc)=>{
//       const { name, price, description, url, beaconId} = doc.data();
//       promotion.push({
//         key: doc.id,
//         doc,
//         beaconId,
//         name,
//         price,
//         description,
//         url
//       });
//     });
//     this.setState({
//       promotion
//     });
//   }
// render(){
//   const cardStyles = {
//     width: 'auto',
//     height: 'auto',
//     backgroundColor: 'white',
//     margin: 'auto',
//     display: 'block',
//     marginTop: '60px',
//     opacity: 0.5,
//     paddingTop: '10px',
//     paddingLeft: '20px',
//     paddingRight: '20px',
//     borderStyle: 'outset',
//     borderLeft: '50px solid black',
//     borderRadius: '20px'
//   }
//   return(
//     <div>
//       <Card style = {cardStyles}>
//         {/* <div className = "Buttons">
//           <Link to = "/create">
//           <button class= "Add-Button" variant = 'flat' size = 'small'>Add </button>
//           </Link>
//         </div> */}

//         {/* <div className = "Buttons">
//           <Link to = "/show/:id">
//           <button class= "Add-Button" variant = 'flat' size = 'small'>Edit</button>
//           </Link>
//         </div> */}
//          <div className = "Buttons1">
//           <Link to = "/">
//           <button class= "Add-Button" variant = 'flat' size = 'small'>Products</button>
//           </Link>
//           <Link to = "/app3">
//           <button class= "Add-Button" variant = 'flat' size = 'small'>Beacon</button>
//           </Link>
//           {/* <Link to = "/show/:id">
//           <button class= "Add-Button" variant = 'flat' size = 'small'>Promotion</button>
//           </Link> */}
//         </div>
      
//         <div class="container">
//           <div class="panel panel-heading">
//             <h3 class = "Panel Heading">Promotion Details</h3>
//           </div>
//         </div>
//         <div class = 'panel-body'>
//           <table class = "table table-stripe">
//             <thead>
//               <tr>
//                 <th>Beacon Id</th>
//                 <th>Image</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Description</th>
//                 <th>Add</th>
//                 <th>Edit</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.promotion.map(promotion =>
//               <tr>
//                 <td>{promotion.beaconId}</td>
//                 <td><img src = {promotion.url} width="100px" height="100px" alt=""></img></td>
//                 <td>{promotion.name}</td>
//                 {/* <td><Link to = {`/show/${promotion.key}`}>{promotion.name}</Link></td> */}
//                 <td>{promotion.price}</td>
//                 <td>{promotion.description}</td>
//                 <td> <Link to = "/create2">
//           <button class= "Add-Button" variant = 'flat' size = 'very small'>Add </button>
//           </Link></td>
//                 <td><Link to = {`/show2/${promotion.key}`}>{promotion.image}
//           <button class= "Add-Button" variant = 'flat' size = 'small'>Edit</button>
//           </Link></td>
               
//               </tr>
          
//               )
//               }
//             </tbody>
//           </table>
//         </div>
       
//       </Card>
//     </div>
//   )
//  }
// }
// export default AppPromotion;
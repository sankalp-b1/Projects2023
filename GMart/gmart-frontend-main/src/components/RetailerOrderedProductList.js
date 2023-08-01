import React, { useState, useEffect,useContext } from 'react';
import Footer from './Footer';
import RetailerService from '../services/retailer.service';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import { UserContext } from './UserContext';

function OrderedProductsList() {
  const [orderedProducts, setOrderedProducts] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {

    if (user) {
      if (user.role === 'retailer') {
        // Fetch ordered products data from database here
        RetailerService.getOrders(user.id).then((response) => {
          console.log(response.data);
          setOrderedProducts(response.data);

        }).catch(error => {
          console.log(error);

        });
      }
      else {
        navigate('/retailer/login');
      }
    } else {
      navigate('/retailer/login');
    }


  }, []);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <div className="container">
        <h2 className="my-4">My Orders</h2>
        <table className="table">
          <thead>
            <tr>
              
              <th>Order Date</th>
              <th>Details</th>
              <th>Track</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderedProducts.map(order => (
               <tr key={order.id}>  
                <td>{order.orderDate}</td>
                <td><button className="btn btn-primary">Details</button></td>
                <td><button className="btn btn-primary">Track</button></td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

export default OrderedProductsList;

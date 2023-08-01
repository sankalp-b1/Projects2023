import { useEffect, useState,useContext } from 'react';
import User from '../models/retailer';
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RetailerService from '../services/retailer.service';
//../../images/nearby.jpg
//import '../css/register.page.css';
import '../css/style.css';
import '../lib/animate/animate.min.css';
import '../css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import { UserContext,CartContext } from './UserContext';


const RetailerLogin = () => {

    const { user, setUser } = useContext(UserContext);

    const [retailer, setRetailer] = useState(new User('', ''));
    const [username, setUsername] = useState(retailer.username);
    const [password, setPassword] = useState(retailer.password);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const location = useLocation();
    const {cart, setCart} = useContext(CartContext);


    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            console.log("use effect" + user.username);
          navigate('/retailer/'+ user.id +'/home');
        }
      }, [user, navigate]);

    // //mounted
    // useEffect(() => {
    //     //console.log(currentRetailer.id);
    //     if (localStorage.getItem(currentRetailer.username) !== '') {
    //         //navigate
    //         navigate('/retailer/home');
    //     }
    // }, []);

    function handleUsernameChange(event) {
        setUsername(event.target.value);
        setRetailer(new User(event.target.value, password));
        //console.log(retailer);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        setRetailer(new User(username, event.target.value));
       // console.log(retailer);
    }

    const addedInCart = (product) => {
        //console.log(product);
        let flag = false;
        cart.forEach(element => {
          // console.log(element.product.id);
          // console.log(product.id);
          if(element.product.id === product.id ) {
            //console.log("in if condition");
            flag = true;
          }
        });
        return flag;
      };

    const handleLogin = (e) => {
      e.preventDefault();

      setSubmitted(true);
      if (!retailer.username || !retailer.password) {
          return;
      }

      setLoading(true);
      
      
      RetailerService.login(retailer).then(response => {
          console.log("login success "+response.data)
          const retailerId = response.data;

          sessionStorage.setItem('user', JSON.stringify({ username: retailer.username, role: 'retailer',id:retailerId }));
          setUser({ username: retailer.username, role: 'retailer',id:retailerId });
          //set retailer in session.
          //dispatch(setCurrentRetailer(response.data));
        //  console.log("after dispatch");
       
        if(location.state){
            if(location.state.from === "homeBuyNow"){
                if(!addedInCart(location.state.prod)){
                    const newCart = [...cart, {product:location.state.prod, quantity:1}];
                    sessionStorage.setItem('cart', JSON.stringify(newCart));
                    setCart(newCart);
                  }
                navigate('/retailer/'+user.id+'/cart'); //add retailerId in this endpoint
            }
            
        }else{
            navigate('/retailer/'+user.id+'/home');
        }
          
         
      }).catch(error => {
         console.log(error);
         setErrorMessage('username or password is not valid.');
         setLoading(false);
      });
    };
  

    return (
        <div className="container-fluid callback my-5 pt-5">

            <div className="col-lg-7 mx-auto">
                <div className="bg-white border rounded p-4 p-sm-5 wow fadeInUp mx-auto" data-wow-delay="0.5s">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>

                        <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
                        <h1 className="display-5 mb-5">Retailer Login</h1>
                        {errorMessage &&
                            <div className="alert alert-danger">
                                {errorMessage}
                            </div>
                        }

                        <form
                            onSubmit={(e) => handleLogin(e)}
                            noValidate
                            className={submitted ? 'was-validated' : ''}
                        >
                            <div className="g-3 m-1 mx-auto">
                                <div className="col-sm-6 col-md-8 mx-auto m-4">
                                    <div className="form-floating">

                                        <input
                                            type="text"
                                            name="username"
                                            className="form-control"
                                            placeholder="Enter Username"
                                            value={username}
                                            onChange={handleUsernameChange}
                                            required
                                        />
                                        <label htmlFor="username">Username:</label>
                                        <div className="invalid-feedback">
                                            User name is required.
                                        </div>
                                    </div>
                                </div>




                                <div className="col-sm-6 col-md-8 mx-auto m-4">
                                    <div className="form-floating">

                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        <label htmlFor="password">Password:</label>
                                        <div className="invalid-feedback">
                                            Password is required.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <div className="col-12 text-center">
                                <button className="btn btn-primary w-50 py-3" disabled={loading} >Login</button>
                            </div>

                        </form>

                        <Link to="/signup/retailer" className="btn btn-link" style={{ color: 'darkgray' }}>
                            Create Account!
                        </Link>

                    </div>

                </div>
            </div >
        </div >
    );
};

export { RetailerLogin };

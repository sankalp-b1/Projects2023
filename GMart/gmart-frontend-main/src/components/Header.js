import React from 'react';
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../lib/animate/animate.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { CartContext, UserContext } from './UserContext';
import Feed from '../models/Feed';
import { Modal, Button } from 'react-bootstrap';
import FeedbackService from '../services/feedback.service';

function Header() {

  const [feed, setFeed] = useState(new Feed('', '', '', '', '', ''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [show, setShow] = useState(false);

    //common method to handle changes in all fields
    const handleChange = (e) => {
      const { name, value } = e.target;

      setFeed((prevState) => {
      return {
          ...prevState,
          [name]: value,
      };
      });
  };

  const handleRegister = (e) => {
      e.preventDefault();

      setSubmitted(true);
      console.log(feed);

      if (
      !feed.name ||
      !feed.description ||
      !feed.emailId ||
      !feed.role ||
      !feed.rating ||
      !feed.phoneNo
      ) {
      return;
      }

      setLoading(true);

      FeedbackService.register(feed)
      .then((_) => {
          setShow(false);
          setFeed({
              name: '',
              emailId: '',
              phoneNo: '',
              role: '',
              rating: '',
              description: ''
            });
      })
      .catch((error) => {
          console.log(error);
          setLoading(false);
      });
  };        

  const handleClose = () => {
      setShow(false);
      setFeed({
          name: '',
          emailId: '',
          phoneNo: '',
          role: '',
          rating: '',
          description: ''
        });
  };
  const handleShow = () => setShow(true);

  //----------------------------------------------------

  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  const renderCategory = (value) => {
    //event.preventDefault();
    //console.log(value);
    navigate('/category/' + value);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    console.log('User logged out');
    navigate('/home');
  };


  const handleLogoutConfirmation = (confirm) => {
    setShowLogoutConfirmation(false);
    if (confirm) {
      handleLogout();
    }
  };

  //console.log(window.location.pathname);
  const currentPath = window.location.pathname;
  useEffect(() => {
    //console.log(currentRetailer.id);
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      // console.log("hello");
      //console.log(link.getAttribute('href'));
      //console.log(link.getAttribute('href') === currentPath);
      if (link.getAttribute('href') === currentPath) {
        if (!link.classList.contains('active')) {
          link.className += ' active';
        }
      } else {
        link.classList.remove('active');
      }
    });


  }, []);



  return (
    <div>

      {/* ----------------------- */}
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>FEEDBACK FORM</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={(e) => handleRegister(e)}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" onChange={(e) => handleChange(e) } value={feed.name} required/>
                                        <label htmlFor="name" required>Your Name</label>
                                    </div>
                                    
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="email" name="emailId" className="form-control" id="mail" placeholder="Your Email" onChange={(e) => handleChange(e)} value={feed.emailId} required/>
                                        <label htmlFor="mail">Your Email</label>
                                    </div>
                                    
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        <input type="text" name="phoneNo" className="form-control" id="mobile" placeholder="Your Mobile" onChange={(e) => handleChange(e)} value={feed.phoneNo} required/>
                                        <label htmlFor="mobile">Your Mobile</label>
                                    </div>
                                    
                                </div>
                                
                                <div className="col-sm-6">
                                    <div className="form-floating">
                                        
                                        <select name="role" id="role_enum" className="form-control" onChange={(e) => handleChange(e)} value={feed.role} >
                                            <option value="">Choose your role</option>
                                            <option value="OTHER">Customer</option>
                                            <option value="RETAILER">Retailer</option>
                                            <option value="COMPANY">Company</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                    <h5>How would you like to rate our website?</h5>
                                    
                                            <div className="rate" >
                                                <input type="radio" id="star5" name="rating" value="5" onChange={(e) => handleChange(e) } />
                                                <label htmlFor="star5" title="text">5 stars</label>
                                                <input type="radio" id="star4" name="rating" value="4" onChange={(e) => handleChange(e)} />
                                                <label htmlFor="star4" title="text">4 stars</label>
                                                <input type="radio" id="star3" name="rating" value="3" onChange={(e) => handleChange(e)}/>
                                                <label htmlFor="star3" title="text">3 stars</label>
                                                <input type="radio" id="star2" name="rating" value="2" onChange={(e) => handleChange(e)}/>
                                                <label htmlFor="star2" title="text">2 stars</label>
                                                <input type="radio" id="star1" name="rating" value="1" onChange={(e) => handleChange(e)} />
                                                <label htmlFor="star1" title="text">1 star</label>
                                            </div>
                                    </div>                                                      
                                </div>
                                <div className="col-12">
                                    <div className="form-floating">
                                        <textarea className="form-control" name='description' placeholder="Leave a message here" id="message" style={{height:'100px'}} onChange={(e) => handleChange(e)}  value={feed.description}/>
                                        <label htmlFor="message">Message</label>
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                <button className="btn btn-primary w-100 py-3" type="submit" disabled={loading}>Submit your Feed</button>
                                </div>
                            </div>
                            </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

{/* ---------------------------------------------------------------------- */}

      <div className="container-fluid fixed-top px-0 wow fadeIn" data-wow-delay="0.1s">

        <nav className="navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn" data-wow-delay="0.1s">
          <a href="/" className="navbar-brand ms-4 ms-lg-0">
            <h1 className="display-5 text-primary m-0">GMart</h1>
          </a>
          <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto p-4 p-lg-0">
              <a href="/home" className="nav-item nav-link">Home</a>
              <a href="/about" className="nav-item nav-link">About</a>
              {user === null ? <a href="/partnerus" className="nav-item nav-link">PartnerWithUs</a> : ''}
              {user !== null && user.role === 'retailer' ? <a href={`/retailer/${user.id}/productList`} className="nav-item nav-link">Orders List</a> : ''}
              {user !== null && user.role === 'retailer' ? <a href={`/retailer/${user.id}/myaccount`} className="nav-item nav-link">My Account</a> : ''}
              {user !== null && user.role === 'company' ? <a href={`/company/${user.id}/myaccount`} className="nav-item nav-link">My Account</a> : ''}
              {user !== null && user.role === 'retailer' ? <a href={`/retailer/${user.id}/cart`} className="nav-item nav-link">Cart <span id="cart-badge" className="badge rounded-pill bg-danger">{cart.length}</span></a> : ''}
              {user === null ? <div className="nav-item dropdown">
                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Categories</a>
                <div className="dropdown-menu border-light m-0">
                  <a onClick={() => renderCategory("GROCERY_STAPLES")} value="GROCERY_STAPLES" className="dropdown-item">Grocery Staples</a>
                  <a onClick={() => renderCategory("DAILY_ESSENTIALS")} value="DAILY_ESSENTIALS" className="dropdown-item">Daily Essential</a>
                  <a onClick={() => renderCategory("ELECTRONICS")} value="ELECTRONICS" className="dropdown-item">Electronics</a>
                  <a onClick={() => renderCategory("PERSONAL_CARE")} value="PERSONAL_CARE" className="dropdown-item">Personal Care</a>
                  <a onClick={() => renderCategory("BED_BATH")} value="BED_BATH" className="dropdown-item">Bed and Bath</a>
                  <a onClick={() => renderCategory("HOME_APPLIANCES")} value="HOME_APPLIANCES" className="dropdown-item">Home Appliances</a>
                  <a onClick={() => renderCategory("CROCKERY")} value="CROCKERY" className="dropdown-item">Crockery</a>
                  <a onClick={() => renderCategory("FOOTWEAR")} value="FOOTWEAR" className="dropdown-item">Footwear</a>
                  <a onClick={() => renderCategory("LUGGAGE")} value="LUGGAGE" className="dropdown-item">Luggage</a>
                  <a onClick={() => renderCategory("TOYS_GAMES")} value="TOYS_GAMES" className="dropdown-item">Toys and Games</a>
                  <a onClick={() => renderCategory("KID_APPAREL")} value="KID_APPAREL" className="dropdown-item">Kids Apparel</a>
                  <a onClick={() => renderCategory("WOMEN_APPAREL")} value="WOMEN_APPAREL" className="dropdown-item">Women Apparel</a>
                  <a onClick={() => renderCategory("MEN_APPAREL")} value="MEN_APPAREL" className="dropdown-item">Men Apparel</a>
                  <a onClick={() => renderCategory("PLASTIC_CONTAINERS")} value="PLASTIC_CONTAINERS" className="dropdown-item">Plastics and Container</a>
                  <a onClick={() => renderCategory("DAIRY_FROZEN")} value="DAIRY_FROZEN" className="dropdown-item">Daily Frozen</a>
                </div>
              </div> : ''}
              <a href="#foot" className="nav-item nav-link">Contact</a>
              <a className="nav-item nav-link" onClick={handleShow}>Feedback</a>


            </div>
            {user === null ? <div><a href="/login"><button className="btn btn-primary h-50">Login</button></a>&nbsp;&nbsp;&nbsp;&nbsp;</div> : ''}

            {user === null ? <a href="/signup"><button className="btn btn-primary h-50">Sign Up</button></a> : ''}

            {user !== null ? <button className="btn btn-primary h-50" onClick={() => setShowLogoutConfirmation(true)}>Logout</button> : ''}
          </div>
        </nav>
      </div>
      {showLogoutConfirmation && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Log out confirmation</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => handleLogoutConfirmation(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => handleLogoutConfirmation(false)}>No</button>
                <button type="button" className="btn btn-primary" onClick={() => handleLogoutConfirmation(true)}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    // <Navbar bg="light" expand="lg">
    //   <Navbar.Brand href="/">My Website</Navbar.Brand>
    //   <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //   <Navbar.Collapse id="basic-navbar-nav">
    //     <Nav classNameName="mr-auto">
    //       <Nav.Link href="/">Home</Nav.Link>
    //       <Nav.Link href="/about">About</Nav.Link>
    //       <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //         <NavDropdown.Item href="#">Action</NavDropdown.Item>
    //         <NavDropdown.Item href="#">Another action</NavDropdown.Item>
    //         <NavDropdown.Item href="#">Something</NavDropdown.Item>
    //         <NavDropdown.Divider />
    //         <NavDropdown.Item href="#">Separated link</NavDropdown.Item>
    //       </NavDropdown>
    //     </Nav>
    //     <Nav classNameName="ml-auto">
    //       <Nav.Link href="/contact">Contact</Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse>
    // </Navbar>
  );
}

export default Header;

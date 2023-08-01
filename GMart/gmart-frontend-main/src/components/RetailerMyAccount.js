import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./RetailerMyAccount.css";
//--------------------
import User from '../models/retailer';
import '../css/bootstrap.min.css';
import '../css/style.css';
import RetailerService from '../services/retailer.service';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Header from "./Header";
import Footer from "./Footer";
import { UserContext } from "./UserContext";


const RetailerMyAccount = () => {

  const {user, setUser} = useContext(UserContext);
  const [addresses, setAddresses] = useState([]);
  const [addressId, setAddressId] = useState([]);
  //------------------------------------------------
  const [retailer, setRetailer] = useState(new User('', '', '', '', '', ''));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddr, setIsEditingAddr] = useState(false);
  const [showAddr, setShowAddr] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [showAddrConfirmationPopup, setShowAddrConfirmationPopup] = useState(false);
  //---------------------------------------

  const handleDeletePopupClose = () => {
    setShowDeletePopup(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDeleteConfirmClick = () => {
    console.log(retailer.password);
    console.log(retailer);

    if (password === retailer.password) {
      setShowConfirmationPopup(true);
    } else {
      setDeleteConfirmed(true);
    }
  };

  const handleConfirmationYesClick = () => {
    RetailerService.deleteAccount(user.id).then((_) => {
      setUser(null);
      sessionStorage.removeItem('user');
      navigate('/home');
    })
      .catch((error) => {
        console.log(error);
      });
    setShowConfirmationPopup(false);
  };

  const handleConfirmationNoClick = () => {
    setShowConfirmationPopup(false);
  };

  const handleAddrConfirmationYesClick = () => {


    RetailerService.deleteAddress(addressId.id, user.id)
      .then((_) => {
        setAddresses(addresses.filter(address => (address.id === addressId.id)));
        setShowAddrConfirmationPopup(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddrConfirmationNoClick = () => {
    setShowAddrConfirmationPopup(false);
  };


  const deleteAccount = () => {
    // delete the retailer's account
  };




  //-----------------------------------------


  const handleChange = (e) => {
    const { name, value } = e.target;
    setRetailer((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressId((prevaddressId) => ({
      ...prevaddressId,
      [name]: value,
    }));
  };
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleAddrEditClick = () => {
    setIsEditingAddr(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };


  const handleRegister = (e) => {
    e.preventDefault();

    setSubmitted(true);
    console.log(retailer);

    if (
      !retailer.username ||
      !retailer.password ||
      !retailer.fullName ||
      !retailer.contactNumber ||
      !retailer.email ||
      !retailer.alternateMobNumber
    ) {
      return;
    }

    setLoading(true);

    RetailerService.update(retailer)
      .then((_) => {
        setShow(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleClose = () => {
    setShow(false);

  };
  const handleShow = () => {
    setShow(true);
    handleEditClick();
  };
  //---------------------------------------



  const handleDeleteButtonClick = () => {
    setShowConfirmationPopup(true);
  };

  // fetch retailer data from backend API
  useEffect(() => {
    axios
      .get('http://localhost:9090/retailer/'+ user.id +'/myAccount')
      .then((res) => {
        const data = res.data;
        setRetailer(data);
        console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  // fetch addresses data from backend API
  useEffect(() => {
    axios
      .get('http://localhost:9090/retailer/'+ user.id +'/listOfAddress')
      .then((res) => {
        const data = res.data;
        console.log(data);
        setAddresses(data);

      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteAccount = () => {
    // TODO: add delete account functionality
  };

  // function to edit address
  const handleEditAddress = (addressId) => {
    setAddressId(addressId);
    setShowAddr(true);
    handleAddrEditClick();
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();

    setSubmitted(true);
    console.log(addressId);

    if (
      !addressId.streetName ||
      !addressId.locality ||
      !addressId.shopNo ||
      !addressId.city ||
      !addressId.state ||
      !addressId.pincode
    ) {
      return;
    }
    console.log(loading);
    setLoading(true);
    console.log(loading);
    RetailerService.editAddress(addressId,user.id)
      .then((_) => {
        setAddresses(addresses.map((address) => {
          if (address.id === addressId.id) {
            return addressId;
          }
          else {
            return address;
          }
        }));
        setShow(false);
      })
      .catch((error) => {
        console.log(error);
        //setLoading(false);
      });
  };


  const handleAddrClose = () => {
    setShowAddr(false);
  };

  // function to remove address
  const handleRemoveAddress = (addressId) => {
    setAddressId(addressId);
    setShowAddrConfirmationPopup(true);
  };

  // function to add new address
  const handleAddNewAddress = () => {
    // TODO: add new address functionality
  };


  return (
    <div>
      <Header />
        <br />
        <br />
        <br />
      <div className="mt-5 container emp-profile">

        <form method="">
          <div className="mt-2 row">

            <div className="col-md-3">
              <div className="profile-img">
                <img src="../../images/myProfile.jpg" alt="retailer img" />
              </div>
            </div>
            <div className="col-md-5">
              <h5>{retailer.username}</h5>
              <h6>{retailer.email}</h6>

              <ul className="nav nav-tabs mt-2">
                <li className="nav-item">
                  <a className="nav-link fw-semi-bold active" id="nav-story-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-story" type="button" role="tab" aria-controls="nav-story"
                    aria-selected="true">Profile</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-semi-bold" id="nav-mission-tab" data-bs-toggle="tab"
                    data-bs-target="#nav-mission" type="button" role="tab" aria-controls="nav-mission"
                    aria-selected="false">Show All Address</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2">
              <input type="button" className="profile-edit-btn" name="btnAddMore" onClick={handleShow} value="Edit Profile" />
            </div>
            <div className="col-md-2">
              <input type="button" className="profile-delete-btn" name="btnAddMore" onClick={handleDeleteButtonClick} value="Delete Profile" />
            </div>
            <div className="row">
              <div className="mt-5 ml-4  col-md-3">

              </div>
              <div className="col-md-8 pl-5 about-info">
                <div className="tab-content profile-tab" id="myTabContent">

                  <div className="tab-pane fade show" id="profile" role="tabpanel" aria-labelledby="home-tab">
                  </div>
                  <div className="tab-pane fade show active" id="nav-story" role="tabpanel"
                    aria-labelledby="nav-story-tab">

                    <div className="row">
                      <div className="col-md-6">
                        <label>Username: </label>
                      </div>
                      <div className="col-md-6">
                        <p>{retailer.username}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Full Name: </label>
                      </div>
                      <div className="col-md-6">
                        <p>{retailer.fullName}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Email: </label>
                      </div>
                      <div className="col-md-6">
                        <p>{retailer.email}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Mobile No: </label>
                      </div>
                      <div className="col-md-6">
                        <p>{retailer.contactNumber}</p>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6">
                        <label>Alternate Mobile Number: </label>
                      </div>
                      <div className="col-md-6">
                        <p>{retailer.alternateMobNumber}</p>
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-mission" role="tabpanel"
                    aria-labelledby="nav-mission-tab">
                    <div className="address-list">
                      {addresses.map(address => {
                        return (
                          <div key={`${address.shopNo}-${address.pincode}`} className="row">
                            <hr />
                            <div className="col-md-2 mt-3">
                              <label>{address.isDefault ? 'Default Address:' : 'Address:'}</label>
                            </div>
                            <div className="col-md-6 mt-3">
                              <p>{`${address.shopNo}, ${address.streetName}, ${address.locality}, ${address.city}, ${address.state}, ${address.pincode}`}</p>
                            </div>
                            <div className="col-md-4 mt-3">
                              <label>{address.isDefault ? (<button className="btn btn-info ml-3" type="button" style={{ backgroundColor: 'DodgerBlue', color: 'white' }} onClick={() => handleEditAddress(address)}>Edit</button>)
                                : (
                                  <div>
                                    <button className="btn btn-info ml-3" type="button" style={{ backgroundColor: 'DodgerBlue', color: 'white' }} onClick={() => handleEditAddress(address)}>Edit</button>&nbsp;&nbsp;
                                    <button className="btn btn-danger" type="button" onClick={() => handleRemoveAddress(address)}>Remove</button>
                                  </div>
                                )}</label>
                            </div>
                            <hr />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/*-----------------------------------------------------*/}
        <div>
          {showDeletePopup && (
            <div className="delete-popup">
              <h3>Confirm Delete</h3>
              <p>Please enter your password to confirm delete.</p>
              <input type="password" value={password} onChange={handlePasswordChange} />
              <div className="delete-popup-buttons">
                <button onClick={handleDeletePopupClose}>Cancel</button>
                <button onClick={handleDeleteConfirmClick}>Delete Account</button>
              </div>
              {deleteConfirmed && <p>Please enter the correct password.</p>}
            </div>
          )}
          {showConfirmationPopup && (
            <div className="delete-popup">
              <h3>Are you sure you want to delete your account?</h3>
              <div className="delete-popup-buttons">
                <button onClick={handleConfirmationYesClick}>Yes</button>
                <button onClick={handleConfirmationNoClick}>No</button>
              </div>
            </div>
          )}
          {showAddrConfirmationPopup && (
            <div className="delete-popup">
              <h3>Are you sure you want to remove this address?</h3>
              <div className="delete-popup-buttons">
                <button onClick={handleAddrConfirmationYesClick}>Yes</button>
                <button onClick={handleAddrConfirmationNoClick}>No</button>
              </div>
            </div>
          )}

        </div>
        {/*-----------------------------------------------------*/}
        <Modal show={showAddr} onHide={handleAddrClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT YOUR ADDRESS</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={(e) => handleAddressUpdate(e)}>
              <div className="row g-3">
                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="streetName"
                      name="streetName"
                      placeholder="Street Name"
                      onChange={handleAddressChange}
                      value={addressId.streetName}
                      required
                      disabled={!isEditingAddr}
                    />
                    <label htmlFor="streetName">Street Name:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="locality"
                      name="locality"
                      placeholder="Locality"
                      onChange={handleAddressChange}
                      value={addressId.locality}
                      required
                      disabled={!isEditingAddr}
                    />
                    <label htmlFor="locality">Locality:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="shopNo"
                      className="form-control"
                      id="shopNo"
                      placeholder="Shop No"
                      onChange={handleAddressChange}
                      value={addressId.shopNo}
                      required
                      disabled={!isEditingAddr}
                    />
                    <label htmlFor="shopNo">Shop No:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      id="city"
                      placeholder="City"
                      onChange={handleAddressChange}
                      value={addressId.city}
                      required
                      disabled={!isEditingAddr}
                    />
                    <label htmlFor="city">City:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      id="state"
                      placeholder="State"
                      onChange={handleAddressChange}
                      value={addressId.state}
                      required
                      disabled={!isEditingAddr}
                    />
                    <label htmlFor="state">State:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      id="pincode"
                      placeholder="Pincode"
                      onChange={handleAddressChange}
                      value={addressId.pincode}
                      required
                      disabled={!isEditingAddr}
                    />
                    <label htmlFor="pincode">Pincode:</label>
                  </div>
                </div>

                <div className="col-12 text-center">
                  <button
                    className="btn btn-primary w-100 py-3"
                    type="submit"

                    onClick={handleAddrClose}
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAddrClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/*-----------------------------------------------------*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>EDIT YOUR PROFILE</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <form onSubmit={(e) => handleRegister(e)}>
              <div className="row g-3">
                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="Username"
                      name="username"
                      placeholder="username"
                      onChange={handleChange}
                      value={retailer.username}
                      required
                      disabled={isEditing}
                    />
                    <label htmlFor="Username" required>
                      username:
                    </label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="fullName"
                      placeholder="Your Name"
                      onChange={handleChange}
                      value={retailer.fullName}
                      required
                      disabled={!isEditing}
                    />
                    <label htmlFor="name" required>
                      Full Name:
                    </label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="mail"
                      placeholder="Your Email"
                      onChange={handleChange}
                      value={retailer.email}
                      required
                      disabled={!isEditing}
                    />
                    <label htmlFor="mail">Email:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="contactNumber"
                      className="form-control"
                      id="mobile"
                      placeholder="Your Mobile"
                      onChange={handleChange}
                      value={retailer.contactNumber}
                      required
                      disabled={!isEditing}
                    />
                    <label htmlFor="mobile">Mobile No:</label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="text"
                      name="alternateMobNumber"
                      className="form-control"
                      id="alter_mobile"
                      placeholder="Alternate Mobile Number"
                      onChange={handleChange}
                      value={retailer.alternateMobNumber}
                      required
                      disabled={!isEditing}
                    />
                    <label htmlFor="alternateMobile">
                      Alternate Mobile Number:
                    </label>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="form-floating">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="password"
                      onChange={handleChange}
                      value={retailer.password}
                      required
                      disabled={!isEditing}
                    />
                    <label htmlFor="password">password</label>
                  </div>
                </div>

                <div className="col-12 text-center">
                  <button className="btn btn-primary w-100 py-3" type="submit" onClick={handleClose}>UPDATE</button>
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
      </div>
        <br />
        <br />
      <Footer />
    </div>
  );
};

export default RetailerMyAccount;

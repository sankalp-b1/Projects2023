import React, { useContext, useEffect, useState, } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/style.css';
import Footer from './Footer';
import Header from './Header';
import { UserContext } from './UserContext';
import User from '../models/company';
import "./RetailerMyAccount.css";
//--------------------
import '../css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import companyService from '../services/company.service';

const RetailerHomePage = () => {

    const { user,setUser } = useContext(UserContext);
    const [company, setCompany] = useState(new User('', '', '', '', '', '', { streetName: '', locality: '', city: '', state: '', pincode: '' }));
    const { companyId } = useParams();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(true);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    //common method to handle changes in all fields
    function handleChange(event) {
        const { name, value } = event.target;
        setCompany(prevUser => ({
            ...prevUser,
            [name]: value,
            address: {
                ...prevUser.address,
                [name]: value,
            },
        }));
    }


    const handleRegister = (e) => {
        e.preventDefault();

        setSubmitted(true);
        console.log(company);

        if (
            !company.companyName ||
            !company.username ||
            !company.contactNumber ||
            !company.email ||
            !company.alternateMobNumber ||
            !company.address.city ||
            !company.address.locality ||
            !company.address.streetName ||
            !company.address.pincode ||
            !company.address.state
        ) {
            return;
        }

        setLoading(true);

        companyService.updateDetails(companyId, company)
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

    const handleConfirmationNoClick = () => {
        setShowConfirmationPopup(false);
    };


    const handleDeleteButtonClick = () => {
        setShowConfirmationPopup(true);
    };


    const handleConfirmationYesClick = () => {
        companyService.deleteDetails(companyId).then((_) => {
            setUser(null);
            sessionStorage.removeItem('user');
            navigate('/home');

        })
            .catch((error) => {
                console.log(error);
            });
        setShowConfirmationPopup(false);
    };





    useEffect(() => {

        companyService.getDetails(companyId).then((res) => {
            const data = res.data;
            setCompany(data);
            console.log(data)
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);



    return (
        <div>
            <Header />
            <br></br>
            <div className="mt-5 container emp-profile">
                <form method="">
                    <div className="mt-5 row">

                        <div className="col-md-3">
                            <div className="profile-img">
                                <img src="../../images/myProfile.jpg" alt="retailer img" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h5>{company.username}</h5>
                            <h6>{company.email}</h6>

                            <ul className="nav nav-tabs mt-2">
                                <li className="nav-item">
                                    <a className="nav-link fw-semi-bold active" id="nav-story-tab" data-bs-toggle="tab"
                                        data-bs-target="#nav-story" type="button" role="tab" aria-controls="nav-story"
                                        aria-selected="true">Profile</a>
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
                                                <p>{company.username}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Company Full Name: </label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{company.companyName}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Email: </label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{company.email}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Mobile No: </label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{company.contactNumber}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Alternate Mobile Number: </label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{company.alternateMobNumber}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Address:</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{`${company.address.streetName}, ${company.address.locality}, ${company.address.city}, ${company.address.state}, ${company.address.pincode}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="nav-mission" role="tabpanel"
                                        aria-labelledby="nav-mission-tab">
                                        <div className="address-list">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


            </div>

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
                                        value={company.username}
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
                                        id="companyName"
                                        name="companyName"
                                        placeholder="Your Name"
                                        onChange={handleChange}
                                        value={company.companyName}
                                        required
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="companyName" required>
                                        Company Name:
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
                                        value={company.email}
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
                                        value={company.contactNumber}
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
                                        value={company.alternateMobNumber}
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
                                        type="text"
                                        name="streetName"
                                        className="form-control"
                                        id="streetName"
                                        placeholder="Your Street Name"
                                        onChange={handleChange}
                                        value={company.address.streetName}
                                        required
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="street">Street Name:</label>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        name="locality"
                                        className="form-control"
                                        id="locality"
                                        placeholder="Your Locality"
                                        onChange={handleChange}
                                        value={company.address.locality}
                                        required
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="locality">Locality:</label>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        id="city"
                                        placeholder="Your City"
                                        onChange={handleChange}
                                        value={company.address.city}
                                        required
                                        disabled={!isEditing}
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
                                        placeholder="Your State"
                                        onChange={handleChange}
                                        value={company.address.state}
                                        required
                                        disabled={!isEditing}
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
                                        placeholder="Your Pincode"
                                        onChange={handleChange}
                                        value={company.address.pincode}
                                        required
                                        disabled={!isEditing}
                                    />
                                    <label htmlFor="pincode">Pincode:</label>
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


            {showConfirmationPopup && (
                <div className="delete-popup">
                    <h3>Are you sure you want to delete your account?</h3>
                    <div className="delete-popup-buttons">
                        <button onClick={handleConfirmationYesClick}>Yes</button>
                        <button onClick={handleConfirmationNoClick}>No</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>

    );
}

export default RetailerHomePage;
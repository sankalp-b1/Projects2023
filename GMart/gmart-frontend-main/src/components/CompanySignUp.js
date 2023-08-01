import { useState } from 'react';
import User from '../models/company';
//import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CompanyService from '../services/company.service';
//../../images/nearby.jpg
//import '../css/register.page.css';
import '../css/style.css';
import '../lib/animate/animate.min.css';
import '../css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FloatingLabel } from 'react-bootstrap';


const CompanySignUp = () => {

    const [user, setUser] = useState(new User('', '', '', '', '', '', { streetName: '', locality: '', city: '', state: '', pincode: '' }));
    const [username, setUsername] = useState(user.username);
    const [companyName, setCompanyName] = useState(user.companyName);
    const [password, setPassword] = useState(user.password);
    const [email, setEmail] = useState(user.email);
    const [contactNumber, setContactNumber] = useState(user.contactNumber);
    const [alternateMobNumber, setAlternateMobNumber] = useState(user.alternateMobNumber);
    const [address, setAddress] = useState(user.address);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    // //mounted
    // useEffect(() => {
    //     if (currentUser?.id) {
    //         //navigate
    //         navigate('/profile');
    //     }
    // }, []);

    //<input name="x" value="y" onChange=(event) => handleChange(event)>

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handleCompanyNameChange(event) {
        setCompanyName(event.target.value);

    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);

    }
    function handleContactNoChange(event) {
        setContactNumber(event.target.value);

    }
    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handleAltContactChange(event) {
        setAlternateMobNumber(event.target.value);
    }
    function handleAddressChange(newAddress) {
        setAddress(newAddress);
        setUser(new User( username, password, companyName, contactNumber, email, alternateMobNumber, address));

    }

    // const handleChange = (e) => {
    //   const {name, value} = e.target;

    //   setAddress((prevState => {
    //     //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
    //     return {
    //         ...prevState,
    //         [name]: value
    //     };
    // }));


    //   setUser((prevState => {
    //       //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
    //       return {
    //           ...prevState,
    //           [name]: value
    //       };
    //   }));
    // };

    const handleRegister = (e) => {

        e.preventDefault();

        setSubmitted(true);
        //console.log(user);
        //console.log(address);

        console.log(user);
        if (!user.companyName || !user.username || !user.password || !user.email || !user.contactNumber) {
            return;
        }
        if (!address.locality || !address.city || !address.streetName || !address.state || !address.pincode) {
            return;
        }

        setLoading(true);

        CompanyService.register(user).then(_ => {
            navigate('/login/company');
        }).catch(error => {
            console.log(error);
            if (error?.response?.status === 409) {
                setErrorMessage('Username or Company Name already exists!!!');
            } else {
                setErrorMessage('Unexpected error occurred!!');
            }
            setLoading(false);
        });
    };

    return (
        <div className="container-fluid callback my-5 pt-5">
            <div className="container pt-5">
                <div className="col-lg-7 mx-auto">
                    <div className="bg-white border rounded p-4 p-sm-5 wow fadeInUp mx-auto" data-wow-delay="0.5s">
                        <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>

                            <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />
                            <h1 className="display-5 mb-5">Company Sign Up</h1>
                            {errorMessage &&
                                <div className="alert alert-danger">
                                    {errorMessage}
                                </div>
                            }

                            <form
                                onSubmit={(e) => handleRegister(e)}
                                noValidate
                                className={submitted ? 'was-validated' : ''}
                            >
                                <div className="row g-3 m-1">
                                    <div className="col-sm-6">
                                        <div className="form-floating">

                                            <input
                                                type="text"
                                                name="fullName"
                                                className="form-control"
                                                placeholder="Enter Company Name"
                                                value={companyName}
                                                onChange={handleCompanyNameChange}
                                                maxLength="40"
                                                required
                                            />
                                            <label htmlFor="companyName">Company Name:</label>
                                            <div className="invalid-feedback">
                                                Company Name is required.
                                            </div>
                                        </div>
                                    </div>




                                    <div class="col-sm-6">
                                        <div className="form-floating">

                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control"
                                                placeholder="Enter Username"
                                                value={username}
                                                onChange={handleUsernameChange}
                                                minLength="6"
                                                maxLength="40"
                                                pattern="^[a-zA-Z][-a-zA-Z0-9_]*$"
                                                required
                                            />
                                            <label htmlFor="username">Username:</label>
                                            <div className="invalid-feedback">
                                            User name is required, length should be between 6 and 40 characters and should contain only alphabets,numbers, (-/_) and first charater should be alphabet.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row g-3 m-1">
                                    <div class="col-sm-6">
                                        <div className="form-floating">

                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter Password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                maxLength="100"
                                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                                required
                                            />
                                            <label htmlFor="password">Password:</label>
                                            <div className="invalid-feedback">
                                                Password is required, maxLength 100, must be at least 8 characters long, must contain at least one letter (uppercase or lowercase), one digit and can contain the following special characters: @$!%*#?& 
                                            </div>
                                        </div>
                                    </div>


                                    <div class="col-sm-6">
                                        <div className="form-floating">

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                value={email}
                                                onChange={handleEmailChange}
                                                maxLength="40"
                                                required
                                            />
                                            <label htmlFor="email">Email:</label>
                                            <div className="invalid-feedback">
                                                Email is required.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row g-3 m-1">
                                    <div class="col-sm-6">
                                        <div className="form-floating">

                                            <input
                                                type="text"
                                                name="contactNumber"
                                                className="form-control"
                                                placeholder="Enter Contact Number"
                                                value={contactNumber}
                                                onChange={handleContactNoChange}
                                                minLength="10"
                                                maxLength="10"
                                                pattern="[1-9]\d{9}"
                                                required
                                            />
                                            <label htmlFor="contactNumber">Contact Number:</label>
                                            <div className="invalid-feedback">
                                            Contact Number is required should contain 10 digits only
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-6">
                                        <div className="form-floating">

                                            <input
                                                type="text"
                                                name="alternateMobNumber"
                                                className="form-control"
                                                placeholder="Enter Alternate Contact Number"
                                                value={alternateMobNumber}
                                                onChange={handleAltContactChange}
                                               
                                                
                                            />
                                            <label htmlFor="alternateMobNumber">Alternate Contact Number:</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="container pt-5">
                                    <h6 style={{ float: 'left', fontWeight: 'bold' }}>Address</h6>
                                    <br />

                                    <div class="row g-3 m-1">

                                        <div class="col-sm-6">
                                            <div className="form-floating">

                                                <input
                                                    type="text"
                                                    name="streetName"
                                                    className="form-control"
                                                    placeholder="Enter Street Name"
                                                    value={address.streetName}
                                                    onChange={(event) => handleAddressChange({ ...address, streetName: event.target.value })}
                                                    required
                                                    maxLength="50"
                                                />
                                                <label htmlFor="streetName">Street Name:</label>
                                                <div className="invalid-feedback">
                                                Street Name is required.
                                            </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div className="form-floating">

                                                <input
                                                    type="text"
                                                    name="locality"
                                                    className="form-control"
                                                    placeholder="Enter Locality"
                                                    value={address.locality}
                                                    onChange={(event) => handleAddressChange({ ...address, locality: event.target.value })}
                                                    required
                                                    maxLength="50"
                                                />
                                                <label htmlFor="locality">Locality:</label>
                                                <div className="invalid-feedback">
                                                Locality is required.
                                            </div>
                                            </div>
                                        </div>

                                        
                                    </div>

                                    <div class="row g-3 m-1">
                                        

                                        <div class="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    placeholder="Enter City"
                                                    value={address.city}
                                                    onChange={(event) => handleAddressChange({ ...address, city: event.target.value })}
                                                    required
                                                    maxLength="50"
                                                />
                                                <label htmlFor="city">City:</label>
                                                <div className="invalid-feedback">
                                                City is required.
                                            </div>
                                            </div>
                                        </div>

                                        <div class="col-sm-6">
                                            <div className="form-floating">

                                                <input
                                                    type="text"
                                                    name="state"
                                                    className="form-control"
                                                    placeholder="Enter State"
                                                    value={address.state}
                                                    onChange={(event) => handleAddressChange({ ...address, state: event.target.value })}
                                                    required
                                                    maxLength="50"
                                                />
                                                <label htmlFor="state">State:</label>
                                                <div className="invalid-feedback">
                                                State is required.
                                            </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div class="row g-3 m-1">
                                        


                                        <div class="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    className="form-control"
                                                    placeholder="Enter Pincode"
                                                    value={address.pincode}
                                                    onChange={(event) => handleAddressChange({ ...address, pincode: event.target.value })}
                                                    required
                                                    minLength="6"
                                                    maxLength="6"
                                                    pattern="^[1-9][0-9]{5}$"
                                                />
                                                <label htmlFor="pincode">Pincode:</label>
                                                <div className="invalid-feedback">
                                                Pincode is required and should be of 6 digits
                                            </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <br />
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary w-75 py-3" disabled={loading} >Sign Up</button>
                                </div>

                            </form>

                            <Link to="/login/company" className="btn btn-link" style={{ color: 'darkgray' }}>
                                I have an Account!
                            </Link>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export { CompanySignUp };

import { useState, useContext, useEffect } from "react";
import { CartContext, UserContext } from './UserContext';
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import RetailerService from '../services/retailer.service';
import RAddressDto from "../models/RAddressDto";


const Checkout = () => {

    const { retailerId } = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { cart, setCart } = useContext(CartContext);

    const [address, setAddress] = useState(new RAddressDto('', '', '', '', '', '',null));
    const [eaddress, setEaddress] = useState(new RAddressDto('', '', '', '', '', '', null));
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        if (!user) {
            navigate('/home')
        }
        if (user.role === 'company') {
            navigate('/login/retailer')
        }
        if(!cart || cart.length === 0){
            navigate('/retailer/' + user.id + '/home');
        }
        if (user.role === 'retailer') {
            RetailerService.getAddress(retailerId).then((response) => {
                setAddresses(response.data);
                //console.log(response.data);
            }).catch(error => {
                console.log(error);

            });
        }

        //fetchAddresses(); //get address from backend
    }, []);

    const saveAddress = (e) => {
        e.preventDefault();

        // console.log(address);

        if (!address.shopNo || !address.streetName || !address.locality || !address.city || !address.state || !address.pincode) {
            return;
        }
        // //no field validation errs , proceed to saving a product

        RetailerService.saveAddress(retailerId, address).then(response => {
            //no errs in saving basic product details --proceed to image upload
            console.log("saved address " + response.data);

            setShowModal(false);
            setAddresses([...addresses, address]);

            setAddress(new RAddressDto('', '', '', '', '', ''));

        }).catch(err => {
            console.log(err);
        });
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setAddress((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleSelectAddress = (event) => {
        setSelectedAddress(event.target.value);
    };


    // const handlePayment = () => {
    //     // navigate('/retailer/payment'); //navigate to payment
    // }

    const backToCart = () => {
        navigate('/retailer/' + user.id + '/cart');
    }

    const handlePayment = () => {
        //handle payment option
        RetailerService.order(retailerId, cart).then(response => {
            //no errs in saving basic product details --proceed to image upload
            console.log("saved address " + response.data);

            alert("Your order has been placed successfully");

            setCart([]);
            sessionStorage.removeItem('cart');
            navigate('/retailer/' + user.id + '/home');

        }).catch(err => {
            console.log(err);
        });
    };

    const getMrp = () => {
        let mrp = 0;
        cart.map((item) => {
            mrp += item.product.mrp * item.quantity;
        });
        return mrp;
    };

    const getDiscount = () => {
        let discount = 0;
        cart.map((item) => {
            discount += (item.product.discount / 100) * item.product.mrp * item.quantity;
        });
        return discount;
    }
    const getTotalPrice = () => {
        let totalPrice = getMrp() - getDiscount();
        return totalPrice;
    };

    function handleShowModal() {
        setShowModal(true);
    }
    function handleCloseModal() {
        setShowModal(false);
    }

    const editAddress = (e) => {
        e.preventDefault();

        console.log(eaddress);

        if (!eaddress.id || !eaddress.shopNo || !eaddress.streetName || !eaddress.locality || !eaddress.city || !eaddress.state || !eaddress.pincode) {
            return;
        }
        
        const element = document.querySelector(`#msg`);     

        RetailerService.editAddress(retailerId, eaddress).then(response => {
            //no errs in saving basic product details --proceed to image upload
            console.log("updated address ");


            setMessage("Data Updated Successfully");
           

            // const modal = document.querySelector(`#exampleModal${eaddress.id}`); 
            // modal.style.display = 'none';
            // modal.classList.remove('show');
            // modal.classList.remove('fade');
            // //modal.classList.add('hide');
            // modal.removeAttribute('aria-modal');
            // modal.setAttribute("aria-hidden", "true");
            // console.log(modal.classList);

            setAddresses(addresses.map((address) => {
                if (address.id === eaddress.id) {
                  return eaddress;
                } else {
                  return address;
                }
              }));

              element.innerHTML = message;

            //const element = document.querySelector(`#exampleModal${eaddress.id}`); 
            //element.style.display = 'none';
            
            //setShowModal(false);        

        }).catch(err => {
            console.log(err);
            setMessage(err.message);
            element.innerHTML = message;
        });
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        //console.log("in handleEditChange");
        //console.log(eaddress);
        setEaddress((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
       // console.log(eaddress);
    };

    //const temp = cart.map((cartItem) => console.log(cartItem));

    return (
        <div>
            <Header />
            <br />
            <br />
            <br />
            <div className="container">
                <div className="text-center mx-auto">
                    <h1 className="mx-auto">Checkout</h1>
                </div>
                <div className="container">
                    <div className="row">

                        <div className="col-md-7 mx-auto p-2 m-2 border rounded">
                            <div className="text-center">
                                <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Checkout</p>
                            </div>

                            <div className="border rounded p-2">
                                <div className="row">
                                    <h4 className="col-9">Choose your delivery address:</h4>
                                    <button onClick={handleShowModal} className="btn btn-primary col-2" style={{ float: 'right' }}>Add Address</button>
                                    <div className={`modal fade ${showModal ? 'show' : ''}`} id="addProduct" tabIndex={-1} role="dialog" style={{ display: showModal ? 'inherit' : 'none' }} aria-labelledby="addProductLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-scrollable" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title fs-5" id="addProductLabel">Address Details</h5>
                                                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close">

                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <form onSubmit={(e) => saveAddress(e)}>
                                                        <div className="mb-1 form-group">
                                                            <label htmlFor="shopNo" className="col-form-label">Shop No:</label>
                                                            <input
                                                                type="text"
                                                                name="shopNo"
                                                                placeholder="Shop No"
                                                                className="form-control"
                                                                value={address.shopNo}
                                                                onChange={(e) => handleChange(e)}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                Shop No is required.
                                                            </div>
                                                        </div>
                                                        <div className="mb-1 form-group">
                                                            <label htmlFor="streetName" className="col-form-label">Street Name:</label>
                                                            <input
                                                                type="text"
                                                                name="streetName"
                                                                placeholder="Street Name"
                                                                className="form-control"
                                                                value={address.streetName}
                                                                onChange={(e) => handleChange(e)}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                Street Name is required
                                                            </div>
                                                        </div>
                                                        <div className="mb-1 form-group">
                                                            <label htmlFor="locality" className="col-form-label">Locality:</label>
                                                            <input
                                                                type="text"
                                                                name="locality"
                                                                placeholder="Locality"
                                                                className="form-control"
                                                                value={address.locality}
                                                                onChange={(e) => handleChange(e)}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                Locality is required
                                                            </div>
                                                        </div>
                                                        <div className="mb-1 form-group">
                                                            <label htmlFor="city" className="col-form-label">City:</label>
                                                            <input
                                                                type="text"
                                                                name="city"
                                                                placeholder="City"
                                                                className="form-control"
                                                                value={address.city}
                                                                onChange={(e) => handleChange(e)}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                City is required
                                                            </div>
                                                        </div>
                                                        <div className="mb-1 form-group">
                                                            <label htmlFor="state" className="col-form-label">State:</label>
                                                            <input type="text"
                                                                name="state"
                                                                placeholder="State"
                                                                className="form-control"
                                                                value={address.state}
                                                                onChange={(e) => handleChange(e)}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                State is required.
                                                            </div>
                                                        </div>
                                                        <div className="mb-1 form-group">
                                                            <label htmlFor="pincode" className="col-form-label">Pincode:</label>
                                                            <input type="text"
                                                                name="pincode"
                                                                placeholder="Pincode"
                                                                className="form-control"
                                                                value={address.pincode}
                                                                onChange={(e) => handleChange(e)}
                                                                required
                                                            />
                                                            <div className="invalid-feedback">
                                                                State is required.
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                                            <button type="submit" className="btn btn-primary">Add Address</button>
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {addresses.map((address) => (
                                    <Card key={address.id} className="my-2">
                                        <Card.Body>
                                            <div className="row d-flex align-items-center ">
                                                <div className="col-1 text-center h-50">
                                                    <input
                                                        type="radio"
                                                        name="address"
                                                        value={address.id}
                                                        onChange={handleSelectAddress}
                                                    />
                                                </div>
                                                <div className="col-10">
                                                    <div className="row">
                                                        <div className="col-10">
                                                            <Card.Text>{address.shopNo}, {address.streetName}, {address.locality}</Card.Text>
                                                            <Card.Text>{address.city}, {address.state}, {address.pincode}</Card.Text>



                                                        </div>
                                                        <div className="col-2">
                                                            <Card.Text><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#exampleModal${address.id}`} onClick={() => setEaddress(address)}>Edit</button></Card.Text>

                                                            <div className="modal fade" id={`exampleModal${address.id}`} tabIndex={-1} role="dialog" aria-labelledby={`exampleModalLabel${address.id}`} aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-scrollable" role="document">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5 className="modal-title fs-5" id={`exampleModalLabel${address.id}`}>Edit Address</h5>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                                                            </button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <form onSubmit={(e) => editAddress(e)}>
                                                                                <div className="mb-1 form-group text-info" id="msg"></div>
                                                                                <div className="mb-1 form-group">
                                                                                    <label htmlFor="shopNo" className="col-form-label">Shop No:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        name="shopNo"
                                                                                        placeholder="Shop No"
                                                                                        className="form-control"
                                                                                        value={eaddress.shopNo}
                                                                                        onChange={(e) => handleEditChange(e)}
                                                                                        required
                                                                                    />
                                                                                    <div className="invalid-feedback">
                                                                                        Shop No is required.
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-1 form-group">
                                                                                    <label htmlFor="streetName" className="col-form-label">Street Name:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        name="streetName"
                                                                                        placeholder="Street Name"
                                                                                        className="form-control"
                                                                                        value={eaddress.streetName}
                                                                                        onChange={(e) => handleEditChange(e)}
                                                                                        required
                                                                                    />
                                                                                    <div className="invalid-feedback">
                                                                                        Street Name is required
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-1 form-group">
                                                                                    <label htmlFor="locality" className="col-form-label">Locality:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        name="locality"
                                                                                        placeholder="Locality"
                                                                                        className="form-control"
                                                                                        value={eaddress.locality}
                                                                                        onChange={(e) => handleEditChange(e)}
                                                                                        required
                                                                                    />
                                                                                    <div className="invalid-feedback">
                                                                                        Locality is required
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-1 form-group">
                                                                                    <label htmlFor="city" className="col-form-label">City:</label>
                                                                                    <input
                                                                                        type="text"
                                                                                        name="city"
                                                                                        placeholder="City"
                                                                                        className="form-control"
                                                                                        value={eaddress.city}
                                                                                        onChange={(e) => handleEditChange(e)}
                                                                                        required
                                                                                    />
                                                                                    <div className="invalid-feedback">
                                                                                        City is required
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-1 form-group">
                                                                                    <label htmlFor="state" className="col-form-label">State:</label>
                                                                                    <input type="text"
                                                                                        name="state"
                                                                                        placeholder="State"
                                                                                        className="form-control"
                                                                                        value={eaddress.state}
                                                                                        onChange={(e) => handleEditChange(e)}
                                                                                        required
                                                                                    />
                                                                                    <div className="invalid-feedback">
                                                                                        State is required.
                                                                                    </div>
                                                                                </div>
                                                                                <div className="mb-1 form-group">
                                                                                    <label htmlFor="pincode" className="col-form-label">Pincode:</label>
                                                                                    <input type="text"
                                                                                        name="pincode"
                                                                                        placeholder="Pincode"
                                                                                        className="form-control"
                                                                                        value={eaddress.pincode}
                                                                                        onChange={(e) => handleEditChange(e)}
                                                                                        required
                                                                                    />
                                                                                    <div className="invalid-feedback">
                                                                                        State is required.
                                                                                    </div>
                                                                                </div>
                                                                                <div className="modal-footer">
                                                                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                                                                    <button type="submit" className="btn btn-primary">Update Product</button>
                                                                                </div>
                                                                            </form>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                            <div className="border rounded p-2 mt-2">
                                <h4>Order Summary:</h4>
                                <div className="card m-1">
                                    <div className="card-body">
                                        <div className="row">
                                            <p className="card-text col-8"><span className="ml-6" style={{ float: 'left' }}>MRP: </span></p>
                                            <p className="card-text col-4"><span className="mr-6" style={{ float: 'right' }}>Rs. {getMrp()}</span></p>
                                        </div>
                                        <div className="row">
                                            <p className="card-text col-8"><span className="ml-6" style={{ float: 'left' }}>Product Discount: </span></p>
                                            <p className="card-text col-4"><span className="mr-6" style={{ float: 'right' }}>Rs. {getDiscount()}</span></p>
                                        </div>
                                        <div className="row">
                                            <p className="card-text col-8"><span className="ml-6" style={{ float: 'left' }}>Delivery Fee: </span></p>
                                            <p className="card-text col-4"><span className="mr-6" style={{ float: 'right' }}>{getTotalPrice() > 1000 ? <span className="text-success">Free</span> : 'Rs. 50'}</span></p>
                                        </div>

                                        <hr />
                                        <div className="row">
                                            <h5 className="card-text text-dark col-8"><span className="ml-6" style={{ float: 'left' }}>Total Price (<span>{cart.length} items</span>): </span></h5>
                                            <p className="card-text col-4"><span style={{ float: 'right' }}>Rs. {getTotalPrice()}</span></p>
                                        </div>

                                        <hr />
                                        <p className="card-text text-success"><span style={{ float: 'left' }}>You will save Rs. {getDiscount()} on the order.</span></p>
                                        <button onClick={backToCart} className="btn btn-warning w-25" style={{ float: 'right' }}>Go Back to Cart</button>
                                    </div>

                                </div>
                            </div>
                            <br />
                            <div className="text-center">
                                <button className="btn btn-primary w-50" onClick={handlePayment}>Proceed to Order</button>
                            </div>

                        </div>
                        <div className="col-md-4 mx-auto text-center p-2 m-2 border rounded" style={{ maxHeight: '400px' }}>
                            <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Price Details</p>
                            <div className="card m-1">
                                <div className="card-body">
                                    <div className="row">
                                        <p className="card-text col-8"><span className="ml-6" style={{ float: 'left' }}>MRP: </span></p>
                                        <p className="card-text col-4"><span className="mr-6" style={{ float: 'right' }}>Rs. {getMrp()}</span></p>
                                    </div>
                                    <div className="row">
                                        <p className="card-text col-8"><span className="ml-6" style={{ float: 'left' }}>Product Discount: </span></p>
                                        <p className="card-text col-4"><span className="mr-6" style={{ float: 'right' }}>Rs. {getDiscount()}</span></p>
                                    </div>
                                    <div className="row">
                                        <p className="card-text col-8"><span className="ml-6" style={{ float: 'left' }}>Delivery Fee: </span></p>
                                        <p className="card-text col-4"><span className="mr-6" style={{ float: 'right' }}>{getTotalPrice() > 1000 ? <span className="text-success">Free</span> : 'Rs. 50'}</span></p>
                                    </div>

                                    <hr />
                                    <div className="row">
                                        <h5 className="card-text text-dark col-8"><span className="ml-6" style={{ float: 'left' }}>Total Price: </span></h5>
                                        <p className="card-text col-4"><span style={{ float: 'right' }}>Rs. {getTotalPrice()}</span></p>
                                    </div>

                                    <hr />
                                    <p className="card-text text-success"><span style={{ float: 'left' }}>You will save Rs. {getDiscount()} on the order.</span></p>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Checkout;
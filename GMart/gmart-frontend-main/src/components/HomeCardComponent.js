import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryService from '../services/category.service';
import { Modal, Button } from 'react-bootstrap';
const HomeCardComponent = () => {
    //D:\Project\gmart\public\images\carousel-1.jpg

    const [addresses,setAddresses] = useState([]);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    //const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
        
    };

    const handleRetailer = () => {
        navigate('/signup/retailer');
    }

    const handleCompany = () => {
        navigate('/signup/company');
    }

    const handleNearby = async () => {
        try {
            const pincode = prompt("Please Enter Pincode");
            const response = await CategoryService.getNearby(pincode);
            if (response.data.length === 0) {
                alert('No nearby stores available for this pincode');
            } else {
                setAddresses(response.data);
                setShow(true);
            }
        } catch (error) {
            console.log(error);
            alert('Some error occurred');
        }
    };
    

    
    return (

        <div className="container">

            {/* ----------------------- */}
      <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Nearby Store</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {addresses.map((address) => <div key={address.id}>Address: {address.shopNo}, {address.streetName}, {address.locality}, {address.city}, {address.state}, {address.pincode}</div>)}
                            
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>

{/* ---------------------------------------------------------------------- */}
            <div className="row m-2">
                <div className="card col-md-5 w-50 h-50 retail" onClick={handleRetailer}>
                    <img className="card-img-top" src="..\..\images\rs1.jpg" alt="Card image cap"></img>
                    <div className="card-img-overlay">
                        <h5 className="card-title">Login as Retail Store Owner</h5>
                        
                    </div>
                </div>
                <div className="col-md-2"></div>
                <div className="col-md-5 w-25 h-100">
                    <div className="card m-1 w-100" onClick={handleCompany}>
                        <img className="card-img-top" src="..\..\images\i1.jpg" alt="Card image cap"></img>
                        <div className="card-img-overlay">
                            <h5 className="card-title">Login as Company</h5>
                            
                        </div>
                    </div>
                    <div className="card m-1 w-100 " onClick={handleNearby}>
                        <img className="card-img-top" src="..\..\images\n2.jpg" alt="Card image cap"></img>
                        <div className="card-img-overlay">
                            <h5 className="card-title">Nearby Store</h5>
                           
                        </div>
                    </div>
                </div>
            </div>
            </div>
       
        // <div className="home-card">
        //     <div className="home-card-content">
        //         
        //             <div className="card bg-dark text-white col-md-3">

        //                 <img className="card-img" src="..\..\images\carousel-1.jpg" alt="Background image"></img>
        //                 <div className="card-img-overlay">
        //                     <h5 className="card-title">Card title</h5>
        //                     <p className="card-text">Some example text.</p>
        //                 </div>
        //             </div>
        //             <div className="card bg-dark text-white col-md-3">

        //                 <img className="card-img" src="..\..\images\carousel-1.jpg" alt="Background image"></img>
        //                 <div className="card-img-overlay">
        //                     <h5 className="card-title">Card title</h5>
        //                     <p className="card-text">Some example text.</p>
        //                 </div>
        //             </div>
        //             <div className="card bg-dark text-white col-md-3">

        //                 <img className="card-img" src="..\..\images\carousel-1.jpg" alt="Background image"></img>
        //                 <div className="card-img-overlay">
        //                     <h5 className="card-title">Card title</h5>
        //                     <p className="card-text">Some example text.</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default HomeCardComponent;
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../css/style.css';

function AddressPopup({ onClose, onSave, title, address }) {
  const [city, setCity] = useState(address?.address_city || "");
  const [locality, setLocality] = useState(address?.address_locality || "");
  const [pinCode, setPinCode] = useState(address?.address_pin_code || "");
  const [shopNo, setShopNo] = useState(address?.address_shop_no || "");
  const [state, setState] = useState(address?.address_state || "");
  const [street, setStreet] = useState(address?.address_street || "");

  useEffect(() => {
    setCity(address?.address_city || "");
    setLocality(address?.address_locality || "");
    setPinCode(address?.address_pin_code || "");
    setShopNo(address?.address_shop_no || "");
    setState(address?.address_state || "");
    setStreet(address?.address_street || "");
  }, [address]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAddress = {
      address_city: city,
      address_locality: locality,
      address_pin_code: pinCode,
      address_shop_no: shopNo,
      address_state: state,
      address_street: street,
    };
    onSave(newAddress);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="locality">Locality</label>
            <input
              type="text"
              id="locality"
              value={locality}
              onChange={(event) => setLocality(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code</label>
            <input
              type="text"
              id="pinCode"
              value={pinCode}
              onChange={(event) => setPinCode(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shopNo">Shop Number</label>
            <input
              type="text"
              id="shopNo"
              value={shopNo}
              onChange={(event) => setShopNo(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(event) => setState(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
          </div>
          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddressPopup.propTypes = {
    onClose: PropTypes.func.isRequired, // function to close the popup
    onSave: PropTypes.func.isRequired, // function to save the new address
    title: PropTypes.string.isRequired, // title for the popup
    address: PropTypes.shape({
    address_city: PropTypes.string,
    address_locality: PropTypes.string,
    address_pin_code: PropTypes.string,
    address_shop_no: PropTypes.string,
    address_state: PropTypes.string,
    address_street: PropTypes.string,
    }), // object containing the current address data, with optional properties
    };
    
    export default AddressPopup;
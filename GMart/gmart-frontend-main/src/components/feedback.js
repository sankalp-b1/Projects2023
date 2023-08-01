import { useState } from 'react';
import React from 'react';
import Feed from '../models/Feed';
import '../css/bootstrap.min.css';
import '../css/style.css';
import FeedbackService from '../services/feedback.service';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Feedback() {
    const [feed, setFeed] = useState(new Feed('', '', '', '', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    //common method to handle changes in all fields
    const handleChange = (e) => {
        const {name, value} = e.target;
  
        setFeed ((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
      };

    const handleRegister = (e) => {

        e.preventDefault();

      setSubmitted(true);
      console.log(feed);

      if (!feed.name ||!feed.description|| !feed.emailId || !feed.role || !feed.rating || !feed.phoneNo) {
          return;
      }

      setLoading(true);
      
      FeedbackService.register(feed).then(_ => {
        navigate('/');
      }).catch(error => {
         console.log(error);
         setLoading(false);
      });

    };


    return(
 <div>
    <Header/>

    <br/>
    <br/>
    <div className="container pt-5">
        <div className="row justify-content-center">
            <div className="col-lg-7">
                <div className="bg-white border rounded p-4 p-sm-5 wow fadeInUp" data-wow-delay="0.5s" style={{visibility:'visible',animationDelay:'0.5s',animationName: 'fadeInUp'}}>
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{maxWidth:'600px',visibility:'visible',animationDelay:'0.1s',animationName: 'fadeInUp'}}>
                        <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Get In Touch
                        </p> 
                         <h1 className="display-5 mb-5">FEEDBACK</h1>
                    </div>
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
                </div>
            </div>
        </div>
    </div>
    <Footer/>
        </div>
    );
}
export default Feedback;
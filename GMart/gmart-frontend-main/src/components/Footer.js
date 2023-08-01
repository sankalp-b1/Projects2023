import '../css/style.css';
//import image1 from '../img/about.jpg'; 
import '../lib/animate/animate.min.css';
import 'bootstrap/dist/css/bootstrap.css';
const Footer = () => {
    return (
        <div id="foot">
            <div className="container-fluid bg-dark text-light footer mt-2 py-2 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-6 col-md-6">
                            <h4 className="text-white mb-4">Contact Us</h4>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>CDAC, Pune</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <h4 className="text-white mb-4">Quick Links</h4>
                            <a className="btn btn-link" href="/about">About Us</a>
                            <a className="btn btn-link" href="/home">Home</a>
                            <a className="btn btn-link" href="/partnerus">Partner With Us</a>
                            
                        </div>
                       
                    </div>
                </div>
            </div>

            <div className="container-fluid copyright py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">G-Mart</a>, All Right Reserved.
                        </div>
                        <div className="col-md-6 text-center text-md-end">

                            Designed By Group_19
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;
import '../css/style.css';
import '../css/bootstrap.min.css';
import '../lib/animate/animate.min.css';
import '../lib/owlcarousel/assets/owl.carousel.min.css'
import Header from './Header';
import Footer from './Footer';
const SelectLoginRole = () => {

    return (
        <div>
            <Header />
            <br />
            <div className="container-xxl py-5">
                <div className="container-fluid mx-auto">
                    <div className="text-center mx-auto wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '600px' }}>
                        <p className="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3">Choose Role</p>
                    </div>
                    <div className="project-carousel wow fadeInUp"></div>
                    <div className='row'>

                        <div className="project-item pe-5 mx-auto pb-5 col-5">
                            <div className="project-img mb-3">
                                <img className="img-fluid rounded" src="..\..\images\service-1.jpg" alt="" />
                                <a href="/login/company"><i className="fa fa-link fa-3x text-primary"></i></a>
                            </div>
                            <div className="project-title">
                                <h4 className="mb-0">Company</h4>
                            </div>
                        </div>
                        <div className="project-item pe-5 mx-auto pb-5 col-5">
                            <div className="project-img mb-3">
                                <img className="img-fluid rounded" src="..\..\images\service-2.jpg" alt="" />
                                <a href="/login/retailer"><i className="fa fa-link fa-3x text-primary"></i></a>
                            </div>
                            <div className="project-title">
                                <h4 className="mb-0">Retailer Store Owner</h4>
                            </div>
                        </div>
                    </div>




                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default SelectLoginRole;
  
const HomeCarousel = () => {
    return (
        <div>
            <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div id="header-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="..\..\images\carousel-1.jpg" alt="Image"></img>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-lg-8">
                                    <p
                                        className="d-inline-block border border-white rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
                                        Welcome to GMart</p>
                                    <h1 className="display-1 mb-4 animated slideInDown">Bridge between Retailers and Company
                                    </h1>
                                    <a href="" className="btn btn-primary py-3 px-5 animated slideInDown">Explore Gmart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="..\..\images\carousel-1.jpg" alt="Image"></img>
                    <div className="carousel-caption">
                        <div className="container">
                            <div className="row justify-content-start">
                                <div className="col-lg-7">
                                    <p
                                        className="d-inline-block border border-white rounded text-primary fw-semi-bold py-1 px-3 animated slideInDown">
                                        Welcome to Gmart</p>
                                    <h1 className="display-1 mb-4 animated slideInDown">Promoting Local Businesses</h1>
                                    <a href="" className="btn btn-primary py-3 px-5 animated slideInDown">Explore Gmart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" style={{width: "2rem"}}  type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" style={{width: "2rem"}} type="button" data-bs-target="#header-carousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
        </div>
    );
}
export default HomeCarousel;
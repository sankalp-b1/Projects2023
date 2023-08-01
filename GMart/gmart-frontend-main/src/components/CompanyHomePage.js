import CompanyProducts from "./CompanyProducts";
import Footer from "./Footer";
import Header from "./Header";
import HomeCarousel from "./HomeCarousel";
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

const CompanyHomePage = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || (user.role !== 'company')) {
                navigate('/company/login');
         }

    }, []);

    return (
        <div>
            <Header />
            <HomeCarousel />
            <br />
            <br />
            <br />
            <br />
            <CompanyProducts />

            <Footer />
        </div>

    );
}

export default CompanyHomePage;
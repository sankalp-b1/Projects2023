import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const CategoryList = () => {
  const categories = [
    {
      name: 'Grocery Staples',
      val: 'GROCERY_STAPLES',
      image: 'grocery.jpg'
    },
    {
      name: 'Daily Essentials',
      val: 'DAILY_ESSENTIALS',
      image: 'categories/daily_essential.jpg'
    },
    {
      name: 'Electronics',
      val: 'ELECTRONICS',
      image: 'categories/electronics.jpg'
    },
    {
      name: 'Personal Care',
      val: 'PERSONAL_CARE',
      image: 'categories/personal_care.jpg'
    },
    {
      name: 'Bed and Bath',
      val: 'BED_BATH',
      image: 'categories/bed.png'
    },
    {
      name: 'Home Appliances',
      val: 'HOME_APPLIANCES',
      image: '/categories/home_appliances.jpg'
    },
    {
      name: 'Crockery',
      val: 'CROCKERY',
      image: 'categories/crockery.jpg'
    },
    {
      name: 'Footwear',
      val: 'FOOTWEAR',
      image: 'categories/footwear.jpg'
    },
    {
      name: 'Luggage',
      val: 'LUGGAGE',
      image: 'categories/luggage.jpg'
    },
    {
      name: 'Toys and Games',
      val: 'TOYS_GAMES',
      image: 'categories/toys.jpg'
    },
    {
      name: 'Kid Apparel',
      val: 'KID_APPAREL',
      image: 'categories/kids.jpg'
    },
    {
      name: 'Women Apparel',
      val: 'WOMEN_APPAREL',
      image: 'categories/women.jpg'
    },
    {
      name: 'Men Apparel',
      val: 'MEN_APPAREL',
      image: 'categories/men.jpg'
    },
    {
      name: 'Plastics and Containers',
      val: 'PLASTIC_CONTAINERS',
      image: 'categories/plastic.jpg'
    },
    {
      name: 'Daily Frozen',
      val: 'DAIRY_FROZEN',
      image: 'categories/frozen.jpg'
    },
  ];

  const navigate = useNavigate();

  const renderCategory= (value) =>{
    //event.preventDefault();
    console.log(value);
    navigate('/retailer/category/'+value);
  } ;

  return (
    <div className="category-list">
      {categories.map((category, index) => {
        const shouldStartNewRow = index % 3 === 0;

        return (
          <div
            key={category.name}
            className={`category-card${shouldStartNewRow ? ' new-row' : ''}`}
            onClick={ () => renderCategory(category.val)} value={category.val}
          >
            <img src={`../../images/${category.image}`} alt={category.name} />
            <h2>{category.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryList;

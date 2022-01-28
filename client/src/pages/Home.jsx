import React from 'react';
import Categories from '../components/Category/Categories';
import { Footer } from '../components/Footer/Footer';
import { Announcement } from '../components/navbar/Announcement';
import Navbar from '../components/navbar/Navbar';
import { Newsletter } from '../components/Newsletter/Newsletter';
import { Products } from '../components/Product/Products';
import { Slider } from '../components/Slider/Slider';
export const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </div>)
};

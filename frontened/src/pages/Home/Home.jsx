import React, { useState } from 'react';
import "./Home.css";
import Header from '../../compontents/Header/Header';
import ExploreMenu from '../../compontents/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../compontents/FoosDisplay/FoodDisplay';
import AppDownload from '../../compontents/AppDowlload/AppDowload';

function Home() {
    const [category, setCategory] = useState("All");

    return (
        <div>
            <Header />
            <ExploreMenu category={category} setCategory={setCategory} />
            <FoodDisplay category={category} />
            <AppDownload />
        </div>
    );
}

export default Home;

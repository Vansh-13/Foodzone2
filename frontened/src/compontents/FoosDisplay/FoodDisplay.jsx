import React, { useContext } from 'react';
import "./FooadDisplay.css";
import { StoreContext } from '../../context/SroreContext';
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({ category }) {
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes for you! Discover our best-selling, delicious meals tailored to your taste.</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;

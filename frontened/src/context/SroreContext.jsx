import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [carItem, setCarItem] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const url = "http://localhost:4000";


    const addToCart = async (itemId) => {

        setCarItem((prev) => ({
            ...prev,
            [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
        }));

        if (token) {
            await axios.post(url + "/api/cart/add", {
                itemId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                  }
                  
            })
        }
    };

    const removeFromCart = async (itemId) => {
        setCarItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {

            await axios.post(url + "/api/cart/remove", {
                itemId,

            }, {
                headers: {
                    token
                }
            });
        }
    };


    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };
    const loadcart = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, {
            headers: {
                Authorization: `Bearer ${token}`
              }
              
        })
        setCarItem(response.data.cartData);
    }

    useEffect(() => {
        const load = async () => {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadcart(localStorage.getItem("token"));
            }
            
        };
        load();
    }, []);

    const getTotal = () => {
        let total = 0;
        for (const item in carItem) {
            let itemInfo = food_list.find((prod) => prod._id === item);
            if (itemInfo) total += itemInfo.price * carItem[item];
        }
        return total;
    };

    const contextValue = {
        token,
        setToken,
        food_list,
        url,
        carItem,
        setCarItem,
        addToCart,
        removeFromCart,
        getTotal,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;

import Header from "./components/Header/Header";
import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Route,Routes} from "react-router-dom";
import Favourite from "./pages/Favourite/Favourite";
import Home from "./pages/Home/Home";
import Bought from "./pages/BougthSneakers/Bougth";
import Cart from "./components/Cart/Cart";

export const AppContext = createContext({});

function App() {
    const [items,setItems] = useState([]);
    const [cartItems,setCartItems] = useState([]);
    const [isOpenedCart,setIsOpenedCart] = useState(false);
    const [searchValue,setSearchValue] = useState('');
    const [favourites,setFavourites] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [isBought,setIsBought] = useState([]);



    useEffect(() => {
       async function loadInfo () {
            try {
                const cartResponse =  await axios.get('https://63b802e94d97e82aa3cc643e.mockapi.io/api/v1/Items/1/Cart')
                const favResponse  =  await axios.get('https://63c139bd376b9b2e64764233.mockapi.io/favourites')
                const itemResponse =  await axios.get('https://63b802e94d97e82aa3cc643e.mockapi.io/api/v1/Items')
                setIsLoading(false);

                setCartItems(cartResponse.data)
                setFavourites(favResponse.data)
                setItems(itemResponse.data)
            } catch (err) {
                alert(err + `Error in rendering elements`)
            }




       }

        loadInfo();

  },[])
    const addToCartItems = async (obj) => {
         const findId = cartItems.find((objCart) => Number(obj.id) === Number(objCart.parentId))
        try {
            if (findId) {
                setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.parentId)))
                const {data} = await axios.delete(`https://63b802e94d97e82aa3cc643e.mockapi.io/api/v1/Items/1/Cart/${findId.parentId}` )

            } else {
                const {data}  = await axios.post('https://63b802e94d97e82aa3cc643e.mockapi.io/api/v1/Items/1/Cart', obj)
                setCartItems((prev) => [...prev,data])

            }
        } catch (error) {
            console.log(error + ' You catch an error in adding to Cart')
        }


    }
    const onRemoveInCart = async (id) => {
        try {
            setCartItems((prev) => prev.filter((item) => item.id !== id))
            const {data} = await axios.delete(`https://63b802e94d97e82aa3cc643e.mockapi.io/api/v1/Items/1/Cart/${id}`)
        } catch (err) {
            alert(err + ' U catch an error in removing from Cart!')
        }

    }
    const onAddFavourite = async (obj) => {
        try {
            if(favourites.find((favObj) => favObj.id === obj.id)){
                setFavourites((prev) => prev.filter((item) => item.id !== obj.id))
                const resp = await axios.delete(`https://63c139bd376b9b2e64764233.mockapi.io/favourites/${obj.id}`)
            } else {
                const {data} = await axios.post('https://63c139bd376b9b2e64764233.mockapi.io/favourites',obj)
                setFavourites((prev) => [...prev,data])
            }

        } catch (err) {
            alert(err + 'U catch an error while adding to favourite')
        }

    }
    const onChangeSearchInput  = (event)  => {
        setSearchValue(event.target.value);

    }


  return (
    <AppContext.Provider value={{items,cartItems,favourites,setCartItems,isBought,setIsBought}}>
          <div className='wrapper'>

             <Cart
                     onRemove = {onRemoveInCart}
                     added={false}
                     onClickRemove = {() => setIsOpenedCart(false)}
                     item={cartItems}
                     opened = {isOpenedCart}

             />

                  <Header
                      cartItems = {cartItems}
                      onCLickCart = {() => setIsOpenedCart(true)}
                  />

                  <hr style={{border:'1px solid #EAEAEA'}} />






              <Routes>
                  <Route path='/'
                     element = { <Home
                          cartItems = {cartItems}
                          items={items}
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                          onChangeSearchInput={onChangeSearchInput}
                          onAddFavourite={onAddFavourite}
                          addToCartItems={addToCartItems}

                          favourites = {favourites}
                          loadingFromHome = {isLoading}


                      />}
                  />

                  <Route path='/favourite' element={<Favourite
                        onAddFavourite = {onAddFavourite}
                  />}>

                  </Route>

                  <Route path='/boughtSneakers' element={
                      <Bought/>
                  }>

                  </Route>
              </Routes>

          </div>
    </AppContext.Provider>
  );
}

export default App;

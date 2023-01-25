import React from 'react';
import CardsLists from "../../components/CardsLists/CardsLists";

const Home = ({items,searchValue,setSearchValue,onChangeSearchInput,onAddFavourite,addToCartItems,cartItems,favourites,added,loadingFromHome}) => {
    return (
        <section className='content'>
            <div className='container'>
                <div className='content_info '>
                    <h1>{searchValue ? `Пошук по запиту: "${searchValue}" ` : 'Всі кросівки' }</h1>
                    <div className= 'loop'>
                        <img src="/images/loop.svg" alt="Search"/>
                        <input value={searchValue} onChange={ onChangeSearchInput} placeholder='Пошук...' type="text" />
                        {searchValue && <img className='btn-remove-input' src="/images/remove-btn.svg"
                                             onClick={() => setSearchValue('')} alt=""/>
                        }
                    </div>

                </div>

                <CardsLists
                    addToCart = {addToCartItems}
                    items = {items}
                    cartItems = {cartItems}
                    searchValue = {searchValue}
                    addToFavourites = {onAddFavourite}
                    favourites = {favourites}
                    added={added}
                    isLoadingFromCardsLists = {loadingFromHome}

                />


            </div>

        </section>
    );
};

export default Home;
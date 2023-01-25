import React from 'react';
import Card from "../Card/Card";
import styles from './CardsLists.module.scss'
import MyLoader from "../UI/Skeleton/MyLoader";

const CardsLists = ({items,addToCart,searchValue,addToFavourites,added,cartItems,isLoadingFromCardsLists}) => {

 const filteredItems =  items.filter((item) => (item.name).toLowerCase().includes(searchValue.toLowerCase()));


 return (

        <div className={styles.content_items}>
                  {isLoadingFromCardsLists ?

                      <>
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                          <MyLoader />
                      </>

                      :

                     filteredItems.map((item) => (

                              <Card
                                  added={cartItems.some((obj) => Number(obj.parentId) === Number(item.id)) ? true : false}
                                  key = {item.id}
                                  onClickFavourite = {addToFavourites}
                                  onClickPlus ={addToCart}

                                  loading={isLoadingFromCardsLists}
                                  {...item}
                              />

                          ))
                  }
        </div>

 );
};

export default CardsLists;
import React, {useContext} from 'react';
import Card from "../../components/Card/Card";
import './Favourite.scss';
import {AppContext} from "../../App";
import {Link} from "react-router-dom";
 const Favourite = ({onAddFavourite,addToFavourite,addToCart}) => {

 const {favourites} = useContext(AppContext);

    return (

        favourites.length > 0

            ?

        <section className='content'>
            <div className='container'>
                <div className='favourite_info content_info '>
                 <Link to='/'>
                    <button className='btn-outHome'>
                        <img src="/images/btn-out1.svg" alt="go-out"/>
                    </button>
                 </Link>
                    <h1>Мої закладки</h1>

                </div>

                <div className='content_items'>
                    {
                        favourites.map((item) => (
                            <Card
                                key = {item.id}
                                favourite = {true}
                                onClickFavourite = {onAddFavourite}
                                onClickPlus ={addToCart}
                                {...item}
                            />

                        ))
                    }


                </div>

            </div>
         </section>

        :

        <section className='favourite_empty'>
            <div className='container'>
                <div className='empty_out'>
                    <img src="/images/smileFavourite.svg" alt="Smile:("/>
                    <h3>Закладок немає:(</h3>
                    <p>Ви ще не додавали нічого в закладки.</p>
                   <Link to="/">
                       <button className='emptyBtn'>
                           <img src="/images/StrelkaVlivo.svg" alt="str"/>
                           Повернутись назад
                       </button>
                   </Link>
                </div>
            </div>
        </section>
    )
};

export default Favourite;
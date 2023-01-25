import React, {useContext, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Card from "../../components/Card/Card";
import './Favourite.scss';

import {AppContext} from "../../App";
import axios from "axios";
const Bought = ({addToBought}) => {
    const {isBought,setIsBought} = useContext(AppContext);


    useEffect(() => {
        async function getData () {
            const {data} = await axios.get('https://63c139bd376b9b2e64764233.mockapi.io/bougth')
            setIsBought(data.map(obj => obj.items).flat());
            console.log( data.map(obj => obj.items).flat())
            // .flat() - перетворює з масива масивів => один масив з об'єктами всередині!
            // Спосіб №2
            // console.log(data.reduce((prev,obj) => [...prev,...obj.items] ,[]))

        }
        getData();
    },[])

    return (

        isBought.length > 0

                ?

                <section className='content'>
                    <div className='container'>
                        <div className='favourite_info content_info '>
                            <Link to='/'>
                                <button className='btn-outHome'>
                                    <img src="/images/btn-out1.svg" alt="go-out"/>
                                </button>
                            </Link>
                            <h1>Мої покупки</h1>

                        </div>

                        <div className='content_items'>
                            {
                                isBought.map((item) => (
                                    <Card
                                        key = {item.id}
                                        onClickToBought ={addToBought}
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
                            <img src="/images/SadSmile.svg" alt="Smile:("/>
                            <h3>Покупок ще немає:(</h3>
                            <p>Ви ще нічого не купували,можливо ви бомж?:(</p>
                            <Link to="/">
                                <button className='emptyBtn'>
                                    <img src="/images/StrelkaVlivo.svg" alt="str"/>
                                    Повернутись назад
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

    );
};

export default Bought;
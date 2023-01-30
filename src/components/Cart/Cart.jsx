import React, {useContext, useState} from 'react';
import styles from './Cart.module.scss'
import {AppContext} from "../../App";
import axios from "axios";
const Cart = ({onClickRemove,item = [],onRemove,opened}) => {
    const [isBoughtInCart,setIsBoughtInCart] = useState(true);
    const [orderedId,setOrderedId] = useState(null);
    const {setCartItems,cartItems,setIsBought} = useContext(AppContext);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms))

    const addToBoughtItems = async () => {
        try {
            const {data} = await axios.post('https://63c139bd376b9b2e64764233.mockapi.io/bougth',{
                items: cartItems
            });
            setOrderedId(data.id);
            setIsBought((prev) => [...prev,cartItems]);
            setIsBoughtInCart(false);
            setCartItems([]);

           for (let i =0;i<cartItems.length;i++){
               const item = cartItems[i];
               const {data} = await axios.delete(`https://63b802e94d97e82aa3cc643e.mockapi.io/api/v1/Items/1/Cart/${item.id}`)
               await delay(1000);
           }



        } catch (err) {
            alert(err + 'Не вдалось створити замовлення!')
        }

    }

    function sumOfArray () {
        let total = 0;
        for(let i = 0;i<item.length;i++){
            total += Number(item[i].price);
        }
        return total;
    }

    const sumInCart = sumOfArray();
    const tax = (sumInCart * 0.05).toFixed(2);



    return (


         item.length > 0 ?
                <div className = {`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
                    <div className= {styles.rightSide}>
                        <div className= {styles.cart_main}>
                            <h3 className={styles.cart_name}>Корзина</h3>
                            <img onClick={onClickRemove} src="/images/remove-btn.svg" alt=""/>
                        </div>


                        <div className={styles.Items}>
                            {
                                item.map((obj) => (

                                    <div key={obj.id} className= {styles.cartItem}>
                                        <img width={70} height={70} src={obj.image} alt="Image"/>
                                        <div>
                                            <p>{obj.name}</p>
                                            <b>{obj.price} грн.</b>
                                        </div>
                                        <img  src="/images/remove-btn.svg" onClick={() => onRemove(obj.id)} alt="Delete"/>
                                    </div>

                                ))
                            }

                        </div>


                        <ul className= {styles.cartTotalBlock}>
                            <li>
                                <span>В сумі: </span>
                                <div></div>
                                <b>{sumInCart} uah.</b>
                            </li>
                            <li>
                                <span>Податок 5%</span>
                                <div></div>
                                <b>{tax} uah.</b>
                            </li>

                            <button onClick={(obj) => addToBoughtItems(obj)}>
                                Оформити замовлення
                                <img src="images/Strelka.svg" alt=""/>
                            </button>


                        </ul>
                    </div>
                </div>

                :

                <div className= {`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
                    <div className= {styles.rightSide}>
                        <div className= {styles.cart_main}>
                            <h3 className= {styles.cart_name}>Корзина</h3>
                            <img onClick={onClickRemove} src="images/remove-btn.svg" alt=""/>

                        </div>

                        <div className= {styles.centerCart}>
                            <div className='img'>
                                <img width={120} height={120} src={isBoughtInCart ?"images/EmptyCard.jpg" : 'images/ItemBougthSuccesfully.svg'} alt="Cart"/>
                            </div>

                            <h3>{isBoughtInCart ? 'Корзина порожня' : 'Замовлення оформлено!'}</h3>

                            <p className='describing'>
                                {isBoughtInCart
                                    ?
                                   ' Додайте хоча б один товар щоб зробити замовлення.'
                                    :
                                    `Ваше замовлення №${orderedId} скоро буде передане кур'єрам`
                                }
                            </p>

                            <button onClick={onClickRemove} className= {styles.emptyBtn}>
                                <img src="/images/StrelkaVlivo.svg" alt=""/>
                                Повернутись назад
                            </button>
                        </div>
                    </div>
                </div>

    );
};

export default Cart;

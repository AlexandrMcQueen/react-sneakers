import React from 'react';
import styles from './Header.module.scss'
import {Link} from "react-router-dom";


const Header = ({onCLickCart,cartItems}) => {
    function sumOfArray () {
        let total = 0;
        for(let i = 0;i<cartItems.length;i++){
            total += Number(cartItems[i].price);
        }
        return total;
    }
    const sumInCart = sumOfArray();



    return (
        <header className={styles.header}>
            <Link to='/'>
                <div className= {styles.header_logotype} >
                    <img width={40} height={40} src='/images/sneakersLogo2.png' alt="Logo"/>
                    <div className={styles.header_logotype_info}>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин кращих кросівок</p>
                    </div>

                </div>
            </Link>
            <div className={styles.header_info}>
                <ul className={styles.header_info_list}>
                    <li onClick={onCLickCart} className={styles.first__item}>
                        <img src='/images/cart.svg' alt="Logo"/>
                        <span>{sumInCart} uah.</span>

                    </li>

                    <li className={styles.header_info_item}>
                      <Link to='/favourite'>
                          <img src='/images/like.svg' alt="Logo"/>
                      </Link>
                    </li>
                    <li className={styles.header_info_item}>
                        <Link to='/boughtSneakers'>
                            <img src='/images/avatar.svg' alt="Logo"/>

                        </Link>

                    </li>
                </ul>

            </div>

        </header>


    );
};

export default Header;
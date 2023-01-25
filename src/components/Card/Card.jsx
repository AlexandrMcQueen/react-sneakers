import React, {useState} from 'react';
import module from './Card.module.scss'
const Card = ({onClickPlus,onClickFavourite,name,image,price,favourite,added,id,loading,onClickToBought}) => {
    const [isAdded,setIsAdded] = useState(!added);
    const [isLiked,setIsLiked] = useState(!favourite);


    function addToCart() {
        onClickPlus({name,image,price,id,parentId:id});
        setIsAdded(!isAdded);
    }

    function addToFavourite() {
        onClickFavourite({name,image,price,id,parentId:id})
        setIsLiked(!isLiked)

    }



    return (
            <div className={module.card}>
                        <button style={isLiked ?{background: 'white'} : {background: '#FEF0F0'}} className={module.favorite} onClick={(obj) => addToFavourite(obj)}>
                            <img width={11} height={11} src= { isLiked ? "/images/UnlikedBTN.svg" : "/images/LikeButton.svg" } alt=""/>
                        </button>


                        <img width={'133'} height={'112'} src={image} alt="Item"/>
                        <p>{name}</p>

                        <div className={module.price}>
                            <div>
                                <span>Ціна:</span>
                                <b>{price} грн.</b>
                            </div>

                            {onClickPlus && <button
                                style={isAdded ? {background: '#FFFFFF'} : {background: 'linear-gradient(180deg, #89F09C 0%, #3CC755 100%)'}}
                                onClick={(obj) => addToCart(obj)}
                            >
                                <img width={'11px'} height={'11px'}
                                     src={isAdded ? '/images/Vector.svg' : '/images/bi_check-lg.svg'} alt="Item"/>
                            </button>}
                        </div>
            </div>
    );
};

export default Card;
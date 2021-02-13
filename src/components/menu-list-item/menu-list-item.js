import React from 'react';
import './menu-list-item.scss';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import{onAddToCart} from '../../actions';


const MenuListItem = ({title, price, url, category,id,history,onAddToCart}) => {
    const categoryIcon = _getIconCategory(category);
    
    return (
        <>
            <li  className="menu__item">
                <div className="menu__title">{title}</div>
                <img className="menu__img" src={url} alt="Cesar salad"></img>
                <div className="menu__category">Category: <span>{category}</span></div>
                <div className="menu__price">Price: <span>{price}</span></div>
                
                <div className="menu__wrap">
                    <button onClick={()=>onAddToCart({title,id,price,url})} className="menu__btn">Add to cart</button>
                    <button onClick={()=>{
                        console.log(id)
                        history.push(`/menu/${id}`)}} className="menu__btn">Detailed</button>

                    <img className="menu__icon" src={categoryIcon} alt="icon"></img>
                </div>
            </li>
        </>
    )
}

function _getIconCategory(category){
    switch(category){
        case "pizza":
            return'https://www.flaticon.com/svg/static/icons/svg/1404/1404945.svg'
            
        case "salads":
            return'https://www.flaticon.com/svg/static/icons/svg/2674/2674069.svg'
            
        case "meat":
            return'https://www.flaticon.com/svg/static/icons/svg/3076/3076125.svg'
            
        default:
            return'';
    }
}

export default connect(null,{onAddToCart})(withRouter(MenuListItem));
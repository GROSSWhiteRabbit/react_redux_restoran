import React from 'react';
import './cart-table.scss';
import {connect} from 'react-redux';
import {deleteFromCart,
     successPostOrderFromCart,
     errorPostOrderFromCart} from '../../actions';
import WithRestoService from '../hoc';
import Error from '../error';

const CartTable = ({items, deleteFromCart,RestoService,successPostOrderFromCart,errorPostOrderFromCart,orderPostState}) => {

    function onPostOrder(data){
        if(data.length>0){
            const body = data.map(({title, price, count})=>({title, price, count}))
            RestoService.postOrderFromCart(body).then((res)=>successPostOrderFromCart())
            .catch((e)=>errorPostOrderFromCart())
        }
        
    }
    if( orderPostState==='error'){
        return <Error/>
    }
    const isPostSuccess= orderPostState==='success'
    const success = <h1>ordered</h1>
    return (
        <div>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
                {isPostSuccess?success:items.map(({title, url, price, id, count })=>{
                    return(
                        <div key={id} className="cart__item">
                            <img src={url} className="cart__item-img" alt="Cesar salad"></img>
                            <div className="cart__item-title">{title}</div>
                            <div className="cart__item-wrap">
                                <span>{price}$</span>
                                <span>x{count}</span>
                            </div>
                            

                            <div onClick={()=>deleteFromCart(id)} className="cart__close">&times;</div>
                        </div>

                    )
                })}
                <button onClick={()=>onPostOrder(items)}  className="cart__btn">To order</button>

            </div>
        </div>
    );
};

const mapStateToProps = ({items,orderPostState})=>{
    return {items,
        orderPostState}
}
const mapDithpetchToProps = {
    deleteFromCart,
    successPostOrderFromCart,
    errorPostOrderFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDithpetchToProps)(CartTable));
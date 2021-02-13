const menuLoaded = (newMenu)=> {
    return {
        type: 'MENU_LOADED',
        payload: newMenu
    }
}
const menuRequested = ()=> {
    return {
        type: 'MENU_REQUESTED'
    }
}
const menuError = ()=> {
    return {
        type: 'MENU_ERROR'
    }
}
const onAddToCart = (item)=> {
    return {
        type: 'ITEM_ADD',
        payload: item
    }
}
const itemsRemove = (id)=> {
    return {
        type: 'ITEM_REMOVE',
        payload: id
    }
}
const successPostOrderFromCart = ()=> {
    return {
        type: 'SUCCESS_POST_ORDER_FROM_CART'
    }
}
const errorPostOrderFromCart = ()=> {
    return {
        type: 'ERROR_POST_ORDER_FROM_CART'
    }
}

export {
    menuLoaded,
    menuRequested,
    menuError,
    onAddToCart,
    itemsRemove as deleteFromCart,
    successPostOrderFromCart,
    errorPostOrderFromCart
}
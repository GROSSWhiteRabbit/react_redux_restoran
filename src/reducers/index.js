
const initialState = {
    menu: [],
    loading: true,
    error: false,
    items:[],
    total:0,
    orderPostState: 'waitingForOrder'
}

const reducer = (state = initialState, action)=>{
    switch (action.type) {
        case 'MENU_LOADED':
            return {
                ...state,
                menu: action.payload,
                loading: false
            }
        case 'MENU_REQUESTED':
        return {
            ...state,
            loading: true
        }   
        case 'MENU_ERROR':
        return {
            ...state,
            loading: false,
            error: true
        }
        case 'ITEM_ADD':
            const indexA = state.items.findIndex((item)=> item.id===action.payload.id)
            if(indexA<0){
                action.payload.count = 1;
                return {
                    ...state,
                    items: [...state.items, action.payload],
                    total: state.total+action.payload.price
                }
            } else {
                action.payload.count = state.items[indexA].count+1
                return {
                    ...state,
                    items: [...state.items.slice(0,indexA),action.payload,...state.items.slice(indexA+1)],
                    total: state.total+action.payload.price

                }
            }
        case 'ITEM_REMOVE':
            const  index = state.items.findIndex((item)=> item.id===action.payload);

            if(index>=0){
                state.items[index].count = state.items[index].count - 1
                if(state.items[index].count<=0){
                    return {
                        ...state,
                        items: [...state.items.slice(0,index),...state.items.slice(index+1)],
                        total: state.total- state.items[index].price

                    }
                } else {
                    return {...state,
                        items: [...state.items.slice()],
                        total: state.total- state.items[index].price

                    };
                        
                }
                
            } else {
                return state;
            }
        case 'SUCCESS_POST_ORDER_FROM_CART':
        return {
            ...state,
            orderPostState: 'success'
        }   
        case 'ERROR_POST_ORDER_FROM_CART':
        return {
            ...state,
            orderPostState: 'error'
        } 
            
        default: 
            return state;
    }
}


export default reducer;
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import MenuListItem from '../menu-list-item';
import WithRestoService from '../hoc';
import Spinner from '../spinner';
import Error from '../error';
import {Route, Switch} from 'react-router-dom'





import './menu-list.scss';

class MenuList extends Component {

    componentDidMount(){
        const {menuLoaded, menuRequested, menuError} =this.props
        menuRequested();
        this.props.RestoService.getMenuItem().then(res=>{
            menuLoaded(res);
        }).catch(()=>{
            menuError()
        })
    }


    
    render() {
        const {menuItems, loading, error}= this.props
        if(error){
            
            return <Error/>
        }
        if(loading) {
            return <Spinner/>
        }
        const menuListItems = menuItems.map(menuItem=>{
            return <MenuListItem key={menuItem.id} {...menuItem}/>
        });
        
        return (
            <ul className="menu__list">
                <Switch>
                    <Route exact path={'/menu/:id'} render={({match:{params}})=>{
                    
                                for (let menuItem of menuItems) {
                                    if (menuItem.id=== + params.id){
                                        return <MenuListItem key={menuItem.id} {...menuItem}/>
                                    }
                                }
                                return menuListItems;
                        }}/>
                    <Route  exact render={()=>menuListItems}/>
                    
                </Switch>
                
            

            </ul>
        )
    }
};

const mapStateToProps = (state)=>{
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}


export default connect(mapStateToProps, actions)(WithRestoService()(MenuList));
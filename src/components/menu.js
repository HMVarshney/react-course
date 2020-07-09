import React, { Component } from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import DishDetail from './dishDetail';
import LoadingSpinner from './loadingSpinner';

class Menu extends Component {

    state={
        selectedDish: null
    }

    onDishSelect=(dish)=>{
        this.setState({
            selectedDish: dish
        });
    }


    render() {
        if(this.props.dishes.isLoading){
            return(
                <LoadingSpinner />
            );
        } else if (this.props.dishes.error){
            return(
                <h3>{this.props.dishes.error}</h3>
            );
        } else { 

            return ( 
                <div className='container-md'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>Menu</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {
                        this.props.dishes.dishes.map((dish)=>{
                            return(
                                <div key={dish.id} className='col-md-5 m-1'>
                                    <Card>
                                        <Link to={`/menu/${dish.id}`}>
                                            <CardImg width='100%' src={'http://localhost:3001/' + dish.image} />
                                            <CardImgOverlay>
                                                <CardTitle>{dish.name}</CardTitle>
                                            </CardImgOverlay>
                                        </Link>
                                    </Card>
                                </div>
                            )})
                        }
                    </div>
                    <DishDetail dish={this.state.selectedDish} />
                </div>
            );
        }
    }
}
 
export default Menu; 
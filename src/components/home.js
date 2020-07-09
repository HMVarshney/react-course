import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import LoadingSpinner from './loadingSpinner';
import { FadeTransform } from 'react-animation-components';

const Home = (props)=> {

    return ( 
        <div className='container'>
            <h3 className='mb-4'>Featured Cuisines</h3>
            <div className='row align-items-start'>
                <div className = 'col-12 col-md m-1'>
                    <RenderCard item={props.featDish} dishesLoading={props.dishesLoading} leadersLoading={props.leadersLoading} error={props.dishesError} />
                </div>
                <div className = 'col-12 col-md m-1'>
                    <RenderCard item={props.featLeader} dishesLoading={props.dishesLoading} leadersLoading={props.leadersLoading} error={props.dishesError}/>
                </div>
                <div className = 'col-12 col-md m-1'>
                    <RenderCard item={props.featPromotion} dishesLoading={props.dishesLoading} leadersLoading={props.leadersLoading} error={props.dishesError}/>
                </div>
            </div>
        </div>
    );
}

const RenderCard = ({item, leadersLoading, dishesLoading, error})=>{
    if(leadersLoading||dishesLoading){
        return(
            <LoadingSpinner />
        );
    }
    else if(error){
        return(
            <h3> </h3>
        );
    } else{
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransfrom: 'scale(0.5) translateY(-50%)'
                }} >
                <Card>
                    <CardImg src={'http://localhost:3001' + item.image} alt={item.name}/>
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
}
 
export default Home;
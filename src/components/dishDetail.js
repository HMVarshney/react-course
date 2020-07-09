import React, { useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, ModalHeader, ModalBody, Modal, Input, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from './loadingSpinner';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const DishDetail = (props) => {

    const [CommentModalOpen, toggleCommentModal] = useState(false);
    
    if(props.isLoading){
        return(
            <div className='container'>
                <div className='row'>
                    <LoadingSpinner />
                </div>
            </div>
        );
    } else if(props.error){
        return(
            <div className='container'>
                <div className='row'>
                    <h3>{props.error}</h3>
                </div>
            </div>
        );
    } else if(props.dish!==null){
        return (
            <>
            <div className='container'>
                <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{props.dish.name}</h3>
                        </div>
                    </div>
                <div className='row'>
                    <div className='col-md-5 m-1 mt-3'>
                        <FadeTransform in
                            transformProps={{
                                exitTransfrom: 'scale(0.5) translateY(-50%)'}}
                        >
                            <Card>
                                <CardImg width='100%' src={'http://localhost:3001' + props.dish.image}/>
                                <CardBody>
                                    <CardTitle>{props.dish.name}</CardTitle>
                                    <CardText>{props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>
                    <div className='col-md-5 m-1 mt-3'>
                        <h4>Comments: </h4>
                        <Stagger in>
                            {props.comments.map(({comment, author, id, date})=>{
                                return(
                                    <Fade in>
                                        <div key={id}>
                                            {id+1}. <p>{comment}</p>
                                            <p style={{textAlign:'right'}}>--{author} {date}</p>
                                        </div>
                                    </Fade>
                                )
                            })}
                        </Stagger>
                        <Button outline onClick={() => toggleCommentModal(!CommentModalOpen)}><span className='fa fa-pencil' /> Submit Comment</Button>
                    </div>
                </div>
            </div>
            <CommentForm postComment={props.postComment} dishId={props.dish.id} modalOpen={CommentModalOpen} handleModal={()=>toggleCommentModal(false)} />
            </>
        );
    } else {
        return(
            <div></div>
        );
    }
}

class CommentForm extends React.Component{
    
    state = {
        rating:0,
        name: '',
        comment:'',
        touched: {
            name: false,
        }
    }

    handleFeildChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    handleSubmit = (e) => {
        this.props.postComment(this.props.dishId, this.state.rating, this.state.name, this.state.comment)
    }

    handleBlur = (field) => (event) => {
        this.setState({
            touched: {
                [field]: true,
            }
        });
    }

    validate(name){
        const error = {
            name:''
        }

        if(this.state.touched.name && name.length < 2){
            error.name = 'Must be greater than 2 characters'
        } else if(this.state.touched.name && name.length > 15) {
            error.name = 'Must be less than 15 characters'
        }

        return error;
    }

    render(){
        const error = this.validate(this.state.name);

        return(
            <Modal isOpen={this.props.modalOpen} toggle={this.props.handleModal} >
                <ModalHeader toggle={this.props.handleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label htmlFor='rating'>Rating: </Label>
                            <Input type='select' id='rating' name='rating' value={this.state.rating} onChange={this.handleFeildChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='name'>Your Name: </Label>
                            <Input type='text' id='name' name='name' 
                                value={this.state.name} onChange={this.handleFeildChange} onBlur={this.handleBlur('name')} 
                                valid={error.name === '' && this.state.name.length > 1} invalid={error.name !== ''} />
                            <FormFeedback>{error.name}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor='comment'>Comment: </Label>
                            <Input type='textarea' row={10} id='comment' name='comment' value={this.state.comment} onChange={this.handleFeildChange} />
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={()=> this.handleSubmit()} type='submit' color='primary'>Submit</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>            
            </Modal>
        );
    };
}


export default DishDetail;
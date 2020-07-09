import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);


class Contact extends React.Component {

    handleSubmit = (values) => {
        console.log(values)
        this.props.postFeedback(values)
    }

    render(){

        return(
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href=' '><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className='col-12 col-md-6 mt-4'>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <FormGroup row>
                                <Label htmlFor='.firstname' md={2}>FirstName:</Label>
                                <div className='col-md-10'>
                                    <Control.text model='.firstname' className='form-control' 
                                        id='firstname' name='firstname' 
                                        validators={{required, maxLength: maxLength(15), minLength: minLength(3)}} />
                                    <Errors className='text-danger' model='.firstname' show='touched' messages={{
                                        required:'Required! ', maxLength:'Must be less than 15. ', minLength: 'Must be greater than 3. '
                                    }} />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='.lastname' md={2}>LastName:</Label>
                                <div className='col-md-10'>
                                    <Control.text model='.lastname' className='form-control' id='lastname' name='lastname' />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='.email' md={2}>Email:</Label>
                                <div className='col-md-10'>
                                    <Control.text model='.email' className='form-control' id='email' name='email' />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='.telnum' md={2}>Contact:</Label>
                                <div className='col-md-10'>
                                    <Control.text model='.telnum' className='form-control' id='telnum' name='telnum' />
                                </div>
                            </FormGroup>
                            <FormGroup row check>
                                <div className='col-md-6 offset-md-2'>
                                    <Control.checkbox model='.form-agree' className='form-check-input' name='agree' />
                                    <Label check><strong>May we contact you?</strong></Label>
                                </div>
                                <div className='col-md-3 offset-md-2 mt-1'>
                                    <Control.select model='.contactType' name='contactType' className='form-control'>
                                        <option>Tel</option>
                                        <option>Email</option>
                                    </Control.select>
                                </div>
                            </FormGroup>
                            <FormGroup row className='mt-3'>
                                <Label htmlFor='.message' md={2}>Feedback: </Label>
                                <div className='col-md-10 '>
                                    <Control.textarea className='form-control' model='.message' id='message' name='message' rows={10} />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className='col-md-10 offset-md-2'>
                                    <Button type='submit' color='primary'>Send Feedback</Button>
                                </div>
                            </FormGroup>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;

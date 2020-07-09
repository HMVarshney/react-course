import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class Contact extends React.Component {

    state={
        firstname: '',
        lastname: '',
        email:'',
        telnum:'',
        agree: false,
        contactType: 'Select contact type',
        message:''
    }

    handleInputChange = (event)=>{
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        this.setState({
            [event.target.name]: value
        })
    };

    render(){
        const isEnabled = this.state.email.length >0 && this.state.firstname.length >0 && this.state.telnum.length >0;

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
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                
                <div className='row row-content'>
                    <div className='col-12'>
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className='col-12 col-md-6 mt-4'>
                        <Form>
                            <FormGroup row>
                                <Label htmlFor='firstname' md={2}>FirstName:</Label>
                                <div className='col-md-10'>
                                    <Input type='text' id='firstname' name='firstname' value={this.state.firstname} onChange={this.handleInputChange} />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='lastname' md={2}>LastName:</Label>
                                <div className='col-md-10'>
                                    <Input type='text' id='lastname' name='lastname' value={this.state.lastname} onChange={this.handleInputChange} />
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='email' md={2}>Email:</Label>
                                <div className='col-md-10'>
                                    <Input type='text' id='email' name='email' value={this.state.email} onChange={this.handleInputChange}/>
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor='telnum' md={2}>Contact:</Label>
                                <div className='col-md-10'>
                                    <Input type='tel' id='telnum' name='telnum' value={this.state.telnum} onChange={this.handleInputChange}/>
                                </div>
                            </FormGroup>
                            <FormGroup row check>
                                <div className='col-md-6 offset-md-2'>
                                    <Input type='checkbox' checked={this.state.agree} name='agree' onChange={this.handleInputChange}></Input>
                                    <Label check><strong>May we contact you?</strong></Label>
                                </div>
                                <div className='col-md-3 offset-md-2 mt-1'>
                                    <Input type='select' name='contactType' value={this.state.contactType} onChange={this.handleInputChange}>
                                        <option>Tel</option>
                                        <option>Email</option>
                                    </Input>
                                </div>
                            </FormGroup>
                            <FormGroup row className='mt-3'>
                                <Label htmlFor='message' md={2}>Feedback: </Label>
                                <div className='col-md-10 '>
                                    <Input type='textarea' id='message' name='message' rows={10} value={this.state.message} onChange={this.handleInputChange}/>
                                </div>
                            </FormGroup>
                            <FormGroup row>
                                <div className='col-md-10 offset-md-2'>
                                    <Button disabled={!isEnabled} type='submit' color='primary'>Send Feedback</Button>
                                </div>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;

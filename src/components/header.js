import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalHeader, ModalBody, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {
    state = { 
        navOpen: false,
        modalOpen: false
     }

    toggleNav = () => {
        this.setState({
            navOpen: !this.state.navOpen
        })
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleLogin = (event) => {
        this.toggleModal();
        alert('Username:' + this.username.value + 'Password'+ this.password.value);
        event.preventDefault();
    }

    render() { 
        return ( 
        <>
            <Navbar dark expand='md' fixed='top'>
                <div className='container'>
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className='mr-3' href='/'>
                        <img src='assets/images/logo.png' width='50' height='35' alt='' />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.navOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className='nav-link' to='/home'>
                                <span className='fa fa-home fa-lg'></span> Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/menu'>
                                <span className='fa fa-list fa-lg'></span> Menu
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/about'>
                                <span className='fa fa-info fa-lg'></span> About
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className='nav-link' to='/contact'>
                                <span className='fa fa-address-card fa-lg'></span> Contact Us
                            </NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                    <Nav navbar className='ml-auto'>
                        <NavItem>
                            <Button outline onClick={this.toggleModal}>
                                <span className='fa fa-lg fa-sign-in'></span> Login
                            </Button>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>

            <Jumbotron className='mt-5'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-sm-6'>
                            <h2>Cuisines</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nulla et volutpat purus. Nunc eget efficitur nulla. 
                                Ut sed fermentum urna. Cras vitae maximus nisi, in 
                                malesuada velit. Suspendisse potenti. Integer faucibus 
                                vulputate quam nec consequat. In aliquam tortor egestas 
                                ex feugiat iaculis.
                            </p>
                        </div>
                    </div>
                </div>
            </Jumbotron>

            <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal} >
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label md={2} htmlFor='username'>Username: </Label>
                            <div className='col-md-8'>
                            <Input type='text' id='username' name='username' 
                                innerRef={(input)=>this.username=input} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label md={2} htmlFor='password'>Password: </Label>
                            <div className='col-md-8'>
                            <Input type='password' id='password' name='password' 
                                innerRef={(input)=>this.password=input} />
                            </div>
                        </FormGroup>
                        <div className='offset-md-5'>
                            <Button type='submit'>Login</Button>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </>
        );
    }
}
 
export default Header;
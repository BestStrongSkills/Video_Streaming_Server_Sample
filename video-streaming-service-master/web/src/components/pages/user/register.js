import React, {Component} from 'react';
import styled from 'styled-components'
import _ from 'lodash'

import {
    FormSuccessMessage,
    FormErrorMessage,
    Form,
    FormItem,
    FormAction,
    FormInput,
    FormLabel,
    FormSubmit,
    FormButton,
    FormActionLeft
} from '../../themes/form'

import {history} from "../../../history";

const RegisterWrapper = styled.div `
 
`


export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: {
                type: 'success',
                msg: ''
            },
            user: {

                name: "",
                email: "",
                password: ""
            }
        };


        this._onTextFieldChange = this._onTextFieldChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);

    }
    componentWillMount() {

        const {store} = this.props;

        const currentUser = store.getCurrentUser();
        if(currentUser){
            // user is logged in we need redirect him to other page.

            history.push('/');
        }

    }

    _onSubmit(event) {
        const {user} = this.state;
        const {store} = this.props;

        event.preventDefault();

        store.createUserAccount(user, (err, result) => {

            if (err) {
                this.setState({
                    message: {type: 'error', msg: _.get(err, 'error.message', 'An error creating your account')}
                });
            }

            else {

                this.setState({
                    message: {type: 'success', msg: 'Your account has been created.'}
                });
            }

        })

    }

    _onTextFieldChange(event) {
        let {user} = this.state;

        const field = event.target.name;
        const value = event.target.value;

        user[field] = value;

        this.setState({
            user: user
        });


        console.log(`Field ${field} is changing value to ${value}`);
    }

    render() {

        const {user, message} = this.state;


        return (
            <RegisterWrapper>
                <h2>Register an account</h2>
                <Form onSubmit={this._onSubmit}>
                    {
                        message.msg ? message.type === 'success' ?
                            <FormSuccessMessage>{message.msg}</FormSuccessMessage> :
                            <FormErrorMessage>{message.msg}</FormErrorMessage> : null
                    }

                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormInput onChange={this._onTextFieldChange} placeholder={'Your name'} name={'name'}
                                   value={_.get(user, 'name', '')} type={'text'}/>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormInput onChange={this._onTextFieldChange} placeholder={'Email'} name={'email'}
                                   value={_.get(user, 'email', '')} type={'email'}/>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormInput onChange={this._onTextFieldChange} placeholder={'Your Password'} name={'password'}
                                   value={_.get(user, 'password', '')} type={'password'}/>
                    </FormItem>
                    <FormAction>
                        <FormActionLeft>
                            <FormSubmit type={'submit'}>Create new account</FormSubmit>
                        </FormActionLeft>

                        <FormButton onClick={(e) => {

                            history.push('/login')

                        }} type={'button'}>Login</FormButton>
                    </FormAction>

                </Form>
            </RegisterWrapper>
        )

    }
}
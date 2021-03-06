import React from 'react';
import './LoginTemplate.css';
import './index.css'
import { Link } from 'react-router-dom';
import { ErrorRequired, ErrorAuth } from '../Constants';
import axios from 'axios';
import { URL } from '../../config';

export default class LoginTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueEMAIL: '',
            valuePASS: '',
            errorRequired: false
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        this.setState({
            valueEMAIL: event.target.value,
            errorRequired: false
        })
    }

    handleChangePass(event) {
        this.setState({
            valuePASS: event.target.value,
            errorRequired: false
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        const email = this.state.valueEMAIL
        const pass = this.state.valuePASS

        if (email === '' || pass === '') {
            this.setState({ errorRequired: true })

            setTimeout(() => {
                this.setState({ errorRequired: false })
            }, 5000)

        } else {

            axios.post(URL.dev_login, {
                data: {
                    email: email,
                    pass: pass
                }
            })
                .then(function (response) {
                    console.log(response.status)
                })
                .catch(function (error) {
                    console.error(error.message)
                })
        }
    }

    render() {
        return (
            <section className="login">
                <div className="login">
                    <h2>Entre em sua conta</h2>
                    <Link to="/inscreva-se">Não possui uma conta?</Link>
                    <form onSubmit={this.handleSubmit}>
                        <div className="nameInput">
                            <input type="email" placeholder='*Email'
                                value={this.state.valueEMAIL}
                                onChange={this.handleChangeEmail} />
                            <input type="password" placeholder='*Senha'
                                value={this.state.valuePASS}
                                onChange={this.handleChangePass} />
                        </div>
                        <div className="error">
                            {
                                this.state.errorRequired ?
                                    <ErrorRequired />
                                    : null
                            }
                            {/* {
                                this.state. ?
                                    <ErrorAuth />
                                    : null
                            } */}
                        </div>
                        <Link to="/recover">Esqueceu sua senha?</Link>
                        <div className="button">
                            <button className="nameButton" id="done">Pronto</button>
                        </div>
                    </form>
                    <div className="button">
                        <Link to="/" ><button className="nameButton" id="cancel">Cancelar</button></Link>
                    </div>
                </div>
            </section>
        )
    }
}

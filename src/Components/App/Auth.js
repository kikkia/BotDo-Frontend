import React from 'react';
import Cookies from 'js-cookie'
var qs = require('qs');


class Auth extends React.Component {
    constructor(props, context) {
        super(props)
        let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
        if(code != null) {
            this.attemptAuth(code)
        } else {
            this.amIAuthed();
        }
    }

    setAuthed(state) {
        localStorage.setItem("authed", state)
    }

    setSessionProps(json) {
        Object.keys(json).forEach(function(key) {
            localStorage.setItem(key, json[key]);
          });
    }

    amIAuthed() {
        fetch("/api/auth/test", 
        {
            credentials: 'include',
            mode: "cors"
        })
            .then(
                (result) => {
                    if (result.status === 200) {
                        this.props.history.push('/');
                        this.setSessionProps(result.json())
                        this.setAuthed(true)
                    } else {
                        this.props.history.push('/login');
                        this.setAuthed(false)
                    }
                },
                (error) => {
                    this.props.history.push('/login');
                    this.setAuthed(false)
                }
            )
    }

    attemptAuth(code) {
        console.log("Attempting to callback auth")
        fetch("/api/auth/callback?code=" + code)
            .then(
                (result) => {
                    if (result.status === 200) {
                        console.log("successfull auth")
                        this.setAuthed(true)
                        this.props.history.push('/');
                    } else {
                        console.log("failed auth" + result.status)
                        this.setAuthed(false)
                        this.props.history.push('/login');
                    }
                },
                (error) => {
                    console.log(error)
                    this.props.history.push('/login');
                    this.setAuthed(false)
                }
            )
    }
    
    render() {
        return (
        <div>
            <h1>Authing</h1>
            <p>Checking your auth status</p>
        </div>
        );
    }
}
 
export default Auth;
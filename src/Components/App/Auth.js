import React from 'react';

class Auth extends React.Component {
    constructor(props, context) {
        super(props)
        this.amIAuthed();
    }

    setAuthed(state) {
        sessionStorage.setItem("authed", state)
    }

    setSessionProps(json) {
        Object.keys(json).forEach(function(key) {
            sessionStorage.setItem(key, json[key]);
          });
    }

    amIAuthed() {
        fetch("https://toshi-api.kikkia.dev/auth/test", 
        {
            credentials: 'include',
            mode: "cors"
        })
            .then(
                (result) => {
                    if (result.status === 200) {
                        this.props.history.push('/dashboard');
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
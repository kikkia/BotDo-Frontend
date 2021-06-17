import React from 'react';

class Home extends React.Component {
    constructor(props, context) {
        super(props)
        this.amIAuthed();
    }

    amIAuthed() {
        fetch("http://localhost:42069/auth/test", 
        {
            credentials: 'include',
            mode: "cors"
        })
            .then(
                (result) => {
                    this.props.history.push('/dashboard');
                },
                (error) => {
                    this.props.history.push('/login');
                }
            )
    }
    
    render() {
        return (
        <div>
            <h1>Home</h1>
            <p>Home page body content</p>
        </div>
        );
    }
}
 
export default Home;
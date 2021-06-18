import React from 'react';

class Home extends React.Component {
    constructor(props, context) {
        super(props)
        this.amIAuthed();
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
                    } else {
                        this.props.history.push('/login');
                    }
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
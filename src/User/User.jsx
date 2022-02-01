import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class User extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }


    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">

                <p align="center">
                    <Link to="/User">User</Link>
                    <Link to="/HomePage">  Home</Link>
                    <Link to="/login">  Logout</Link>
                </p>


                <h1>Hi {user.firstName}!</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Firstname :
                        <input type="text" value={user.firstName} />
                    </label>
                    <label>
                        Lastname :
                        <input type="text" value={user.lastName} />
                    </label>
                    <label>
                        Username :
                        <input type="text" value={user.username} />
                    </label>
                    <label>
                        Password :
                        <input type="text" value={user.password} />
                    </label>
                    <input type="submit" value="Modifier" />
                </form>

            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedUser = connect(mapState, actionCreators)(User);
export { connectedUser as User };









































// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { userActions } from '../_actions';

// class User extends React.Component {
//     componentDidMount() {
//         this.props.getUsers();
//     }
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: {
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 username: user.username,
//                 password: user.password
//             },
//             submitted: false
//         };
    
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//       }
    
//       handleChange(event) {
//         this.setState({firstName: event.target.firstName});
//         this.setState({lastName: event.target.lastName});
//         this.setState({username: event.target.username});
//         this.setState({password: event.target.password});
//       }
    
//       handleSubmit(event) {
       
//         event.preventDefault();
//       }



//     render() {
//         const { user, users } = this.props;
//         return (
           
          
//             <div className="col-md-6 col-md-offset-3">
//             <h1>Hi {user.firstName}!</h1>
            
//             <button className="btn btn-primary">Add a video</button>

//             <p>
//                 <Link to="/User">User</Link>
//             </p>
//             <p>
//                 <Link to="/login">Logout</Link>
//             </p>
//         </div>

               

//                 /* <form onSubmit={this.handleSubmit}>
//         <label>
//           Nom :
//           <input type="text" value={this.state.firstName} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="Envoyer" />
//       </form> */

               
        
//         );
//     }
// }

// function mapState(state) {
//     const { users, authentication } = state;
//     const { user } = authentication;
//     return { user, users };
// }

// const actionCreators = {
//     getUsers: userActions.getAll,
//     deleteUser: userActions.delete
// }

// const connectedUser = connect(mapState, actionCreators)(User);
// export { connectedUser as User };
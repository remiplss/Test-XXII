import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FileBase64 from 'react-file-base64';
import { Grid } from '@mui/material';
import { userActions } from '../_actions';


class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (


            <div className="col-md-6 col-md-offset-3">





                <p align="center">
                    <Link to="/User">User  </Link>
                    <Link to="/HomePage">  Home</Link>
                    <Link to="/login">  Logout</Link>
                </p>

                <br/><br/>

                <h1 align="center">Hi {user.firstName}!</h1>
                <br/><br/><br/>
                <p align="center">

                    <FileBase64 type="file" multiple={false}/>
                    <br/>
                    <button className="btn btn-primary">Add a video</button>
                </p>
                
                <Grid container spacing={2}>
                    {
                    
                        //We GET the number of videos and the videos and we display them in the grid
                        //A grid will be created for each videos
                    
                    }

                </Grid>

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

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
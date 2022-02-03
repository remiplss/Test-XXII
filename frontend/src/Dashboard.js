import React, { Component } from 'react';
import {
  Button, TextField, Dialog, DialogActions, LinearProgress,
  DialogTitle, DialogContent, TableBody, Table,
  TableContainer, TableHead, TableRow, TableCell
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import swal from 'sweetalert';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Login from './Login'

const axios = require('axios');


export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      openvideoModal: false,
      openvideoEditModal: false,
      openuserEditModal: false,
      openuserModal: false,
      id: '',
      name: '',
      desc: '',
      file: '',
      fileName: '',
      page: 1,
      search: '',
      videos: [],
      pages: 0,
      loading: false,
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')

    };
  }


  componentDidMount = () => {
    let token = localStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
    } else {
      this.setState({ token: token }, () => {
        this.getvideo();
      });
    }
  }
  

  getvideo = () => {
    
    this.setState({ loading: true });

    let data = '?';
    data = `${data}page=${this.state.page}`;
    if (this.state.search) {
      data = `${data}&search=${this.state.search}`;
    }
    axios.get(`http://localhost:2000/get-video${data}`, {
      headers: {
        'token': this.state.token
      }
    }).then((res) => {
      this.setState({ loading: false, videos: res.data.videos, pages: res.data.pages });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.setState({ loading: false, videos: [], pages: 0 },()=>{});
    });
  }

  deletevideo = (id) => {
    axios.post('http://localhost:2000/delete-video', {
      id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.setState({ page: 1 }, () => {
        this.pageChange(null, 1);
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }

  pageChange = (e, page) => {
    this.setState({ page: page }, () => {
      this.getvideo();
    });
  }

  logOut = () => {
    localStorage.setItem('token', null);
    this.props.history.push('/');
  }

  onChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.files[0].name) {
      this.setState({ fileName: e.target.files[0].name }, () => { });
    }
    this.setState({ [e.target.name]: e.target.value }, () => { });
    if (e.target.name == 'search') {
      this.setState({ page: 1 }, () => {
        this.getvideo();
      });
    }
  };

  addvideo = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
 

    axios.post('http://localhost:2000/add-product', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handlevideoClose();
      this.setState({ name: '', desc: '', file: null, page: 1 }, () => {
        this.getvideo();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handlevideoClose();
    });

  }

  updatevideo = () => {
    const fileInput = document.querySelector("#fileInput");
    const file = new FormData();
    file.append('id', this.state.id);
    file.append('file', fileInput.files[0]);
    file.append('name', this.state.name);
    file.append('desc', this.state.desc);
   

    axios.post('http://localhost:2000/update-video', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handlevideoEditClose();
      this.setState({ name: '', desc: '', file: null }, () => {
        this.getvideo();
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handlevideoEditClose();
    });

  }

  updateuser = () => {

    const file = new FormData();

    file.append('username', this.state.username);
    file.append('password', this.state.password);
   

    axios.post('http://localhost:2000/update-user', file, {
      headers: {
        'content-type': 'multipart/form-data',
        'token': this.state.token
      }
    }).then((res) => {

      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });

      this.handleuserEditClose();
      this.setState({ username: '', password: ''}, () => {
        
      });
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
      this.handleuserEditClose();
    });

  }

  handlevideoOpen = () => {
    this.setState({
      openvideoModal: true,
      id: '',
      name: '',
      desc: '',
      
      fileName: ''
    });
  };

  handlevideoClose = () => {
    this.setState({ openvideoModal: false });
  };

  handlevideoEditOpen = (data) => {
    this.setState({
      openvideoEditModal: true,
      id: data._id,
      name: data.name,
      desc: data.desc,
     
      fileName: data.image
    });
  };
  handleuserEditOpen = (data) => {
    this.setState({
      openuserEditModal: true,
      username: data._username,
      password: data.password,
    });
  };

  handlevideoEditClose = () => {
    this.setState({ openvideoEditModal: false });
  };
  handleuserEditClose = () => {
    this.setState({ openuserEditModal: false });
  };

  render() {
    return (
      <div>
        {this.state.loading && <LinearProgress size={40} />}
        <div>
          <h2>UTube</h2>
          <Button
            className="button_style"
            variant="contained"
            color="primary"
            size="small"
            onClick={this.handlevideoOpen}
          >
            Add video
          </Button>
          <Button
            className="button_style"
            variant="contained"
            size="small"
            onClick={this.logOut}
          >
            Log Out
          </Button>
        </div>
        <Tabs>
    <TabList>
      <Tab>Videos</Tab>
      <Tab>User</Tab>
    </TabList>
    <TabPanel>
        {/* Edit video */}
        <Dialog
          open={this.state.openvideoEditModal}
          onClose={this.handlevideoClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit video</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="video Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            /><br />
            <br /><br />
            <Button
              variant="contained"
              component="label"
            > Upload
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="File"
                hidden
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handlevideoEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == ''}
              onClick={(e) => this.updatevideo()} color="primary" autoFocus>
              Edit video
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add video */}
        <Dialog
          open={this.state.openvideoModal}
          onClose={this.handlevideoClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add video</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              placeholder="video Name"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.desc}
              onChange={this.onChange}
              placeholder="Description"
              required
            /><br />
            <br /><br />
            <Button
              variant="contained"
              component="label"
            > video thumbnail
            <input
                id="standard-basic"
                type="file"
                accept="image/*"
                // inputProps={{
                //   accept: "image/*"
                // }}
                name="file"
                value={this.state.file}
                onChange={this.onChange}
                id="fileInput"
                placeholder="video thumbnail"
                hidden
                required
              />
            </Button>&nbsp;
            {this.state.fileName}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handlevideoClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.name == '' || this.state.desc == '' || this.state.file == null}
              onClick={(e) => this.addvideo()} color="primary" autoFocus>
              Add video
            </Button>
          </DialogActions>
        </Dialog>

        <br />

        <TableContainer>
          <TextField
            id="standard-basic"
            type="search"
            autoComplete="off"
            name="search"
            value={this.state.search}
            onChange={this.onChange}
            placeholder="Search by video name"
            required
          />
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Video Thumbnail</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.videos.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center"><img src={`http://localhost:2000/${row.image}`} width="70" height="70" /></TableCell>
                  <TableCell align="center">{row.desc}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handlevideoEditOpen(row)}
                    >
                      Edit
                  </Button>
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={(e) => this.deletevideo(row._id)}
                    >
                      Delete
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        </TableContainer>
        </TabPanel>

        <TabPanel>
        <Dialog
          open={this.state.openuserEditModal}
          onClose={this.handleuserClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="name"
              value={this.state.username}
              onChange={this.onChange}
              placeholder="UserName"
              required
            /><br />
            <TextField
              id="standard-basic"
              type="text"
              autoComplete="off"
              name="desc"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="Password"
              required
            /><br />
            <br /><br />
            
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleuserEditClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={this.state.username == '' || this.state.password == ''}
              onClick={(e) => this.updateuser()} color="primary" autoFocus>
              Edit User
            </Button>
          </DialogActions>
        </Dialog>
      <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Password</TableCell>
                
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.videos.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="center" component="th" scope="row">{this.state.username}</TableCell>
                  <TableCell type = "password" align="center">{this.state.password}</TableCell>
                  <TableCell align="center">
                    <Button
                      className="button_style"
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={(e) => this.handleuserEditOpen(row)}
                    >
                      Edit
                  
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Pagination count={this.state.pages} page={this.state.page} onChange={this.pageChange} color="primary" />
        
    </TabPanel>
  </Tabs>

      </div>
    );
  }
}

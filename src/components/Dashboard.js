import React, {Component} from 'react';
import '../css/dashboard.css'
import Modal from 'react-awesome-modal';
import Calendar from 'react-calendar';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            date: [new Date()],
        }

        this.load = this.load.bind(this);
    }

    onChange = date => this.setState({ date });

    openModal() {
        this.setState({
            visible : true
        });
        alert("Hello! I am an alert box!!");
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
    openCal(){
    }
    render() {
        this.load();
        return (
    <div className="App">
        <div id="container">
            <h2>Dashboard</h2>
            <hr></hr>
            <div class = "row">
                <div class = "col-2">
                    <h4>Profile</h4>
                    <h6 id='name'>Name</h6>
                    <h6 id='email'>Email</h6>
                    <input type="button" class="btn btn-secondary" value="Edit Profile" onClick={() => this.openModal()} />
                    <hr></hr>
                    <a value="Logout" className="btn btn-danger" href="/">Logout</a>

              </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <button id = "addeventbtn" type="button" class="addeventbtn btn btn-secondary btn-lg" onClick = {() => window.location.replace("/event")}>Add Event +</button>
                </div>
            </div>
            <div class = "row">
                <div class = "col-2"></div>
                <div className = "col-sm-8 col-lg-8 col-md-8">
                    <br></br>
                    <hr></hr>
                    <Calendar onChange={this.onChange}
                    value={this.state.date} id="caldate" onClick={this.openCal()}/>
                </div>
            </div>
        </div>

        <footer id="footer" className="footer">
            <div>
            <p>Fiesta Copyright &copy; 2019. Ethan Niu, Shivangi Chand, Siddharth Dhar, Sripath Mishra, Pooja Tewari
            </p>
            </div>
        </footer>
             <section >
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div id="popup">
                        <h2>Edit Profile</h2>
                        <hr></hr>
                        <form >
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
                                </div>
                            </div>
                            </form>
                        <button class="btn btn-outline-success" onClick={() => this.closeModal()}>Save</button>
                    </div>
                </Modal>
            </section>
            <section >
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div id="popup">
                        <h2>Edit Profile</h2>
                        <hr></hr>
                        <form >
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                                <div class="col-sm-10">
                                <input type="email" class="form-control" id="inputEmail3" placeholder="Email"></input>
                                </div>
                            </div>
                            </form>
                        <button class="btn btn-outline-success" onClick={() => this.closeModal()}>Save</button>
                    </div>
                </Modal>
            </section>
    </div>
        );
    }
    colorCal(x){
        if(x == document.getElementsById("caldate").value)
        {
            document.getElementById("caldate").style.backgroundColor='white';
        }
    }
    load(){
        let userName1 ='';
        let token = document.cookie.substring(document.cookie.indexOf('token=')+6);
        token = token.substring(0);

        axios.get('https://fiesta-api.herokuapp.com/user/getData?token=' + token)
        .then(function (response) {
            document.getElementById('name').innerHTML = response.data.name;
            document.getElementById('email').innerHTML = response.data.email;
            axios.get('https://fiesta-api.herokuapp.com/event/get_event?token=' + token)
                .then(function (response1) {
                    if(response1.data.data.length == 0){
                        return;
                    }
                    let arr = [new Date()];
                    for(let i=0; i < response1.data.data.length; i++ ){
                        arr.push(new Date(response1.data.data[i].date.substring(0,10)));
                    }
                    console.log(arr);
                    this.setState({ date: arr });
                })
                .catch(function (error1) {
                    console.log(error1);
                    alert("Error: Dashboard problem in getting user event data please login again.");
                    window.location.replace("/login");
                });
        })
        .catch(function (error) {
            alert("Error: Dashboard problem in getting user data please login again. ");
            window.location.replace("/login");
        });
    }
    getevent(e){
        e.preventDefault();
        let eventID ='';
        document.cookie = 'ID=' + eventID + "; path=/;" + document.coockie;
        window.location.replace("/event")
    }
}

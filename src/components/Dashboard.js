import React, {Component} from 'react';
import '../css/dashboard.css'
import Modal from 'react-awesome-modal';
import Calendar from 'react-calendar/dist/entry.nostyle';
import axios from 'axios';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }

        this.state = {
            date: new Date(),
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
    openCal()
    {
        alert("hi");
    }
    render() {
        return (
    <div className="App">
        <div id="container">
           {/* <div className="col-sm-12 col-md-12 col-lg-12">
                <img id = "forgotimg" src={require("../res/fiestalogo.png")} alt="cannot display"/>
        </div>*/}
            <h2>Dashboard</h2>
            <hr></hr>
            <div class = "row">
                <div class = "col-2">
                    <h4>Profile</h4>
                    <h6>Name</h6>
                    <h6>Email</h6>
                    <input type="button" class="btn btn-secondary" value="Edit Profile" onClick={() => this.openModal()} />
                    <hr></hr>
                    <a value="Logout" className="btn btn-danger" onClick={() => this.openModal()}>Logout</a>

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
    colorCal(x)
    {
        if(x == document.getElementsById("caldate").value)
        {
            document.getElementById("caldate").style.backgroundColor='white';
        }
    }

    load(){
        let userName1 ='';
        
        axios.post('https://fiesta-api.herokuapp.com/event/SelectRsvp?userName=' + userName1)
        .then(function (response) {
            //The respose.data.data has the list of events.
            var i;
            for (i = 0; i < response.data.data.length; i++) { 
                this.colorCal(response.data.data[i].date);
              }
        })
        .catch(function (error) {
            alert("Error: Event was not submitted please try again!");
            console.log(error + '1');
        });
    }
    getevent(e){
        e.preventDefault();
        let eventID ='';
        document.cookie = 'ID=' + eventID + "; path=/;" + document.coockie;
        window.location.replace("/event")
    }
}

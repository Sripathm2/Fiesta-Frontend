import React, {Component} from 'react';
import '../css/dashboard.css'
import Modal from 'react-awesome-modal';
import Calendar from 'react-calendar';
import axios from 'axios';

let arr;
export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            date: new Date(),
            loading: true,
            data: undefined
        }

        this.load = this.load.bind(this);
        this.getevent = this.getevent.bind(this);
        this.addevent = this.addevent.bind(this);
    }
    openModal() {
        this.setState({
            visible : true
        });
        alert("Hello! I am an alert box!!");
    }
    componentDidMount() {
        let self = this
        let token = window.location.href;
        token = token.substring(token.indexOf('token=')+6);

       axios.get('https://fiesta-api.herokuapp.com/event/get_event?token=' + token)
                .then(function (response1) {
                    if(response1.data.data.length == 0){
                        self.setState({loading: false});
                    }
                    arr = [];
                    for(let i=0; i < response1.data.data.length && i < 2; i++ ){
                        arr.push(new Date(response1.data.data[i].date.substring(0,10)));
                    }
                    self.setState({ date: arr, loading: false, date: new Date()});
                })
                .catch(function (error1) {
                    console.log(error1);
                    //alert("Error: Dashboard problem in getting user event data please login again.");
                    //window.location.replace("/login");
                });
    }
    closeModal() {
        this.setState({
            visible : false
        });
    }
    openCal(){
        alert('hi');
    }
    render() {
        this.load();
        return (
    <div className="App">
        <div id="container">
            <h2>Dashboard</h2>
            <hr></hr>
            <div className = "row">
                <div className = "col-2">
                    <h4>Profile</h4>
                    <h6 id='name'>Name</h6>
                    <h6 id='email'>Email</h6>
                    <input type="button" className="btn btn-secondary" value="Edit Profile" onClick={() => this.openModal()} />
                    <hr></hr>
                    <a value="Logout" className="btn btn-danger" href="/">Logout</a>

              </div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                    <button id = "addeventbtn" type="button" className="addeventbtn btn btn-secondary btn-lg" onClick = {this.addevent}>Add Event +</button>
                </div>
            </div>
            <div className = "row">
                <div className = "col-2"></div>
                <div className = "col-sm-8 col-lg-8 col-md-8">
                    <br></br>
                    <hr></hr>
                    <Calendar
                    value={this.state.date} id="caldate" onClickDay={(value) => this.getevent(value)}/>
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
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="Email"></input>
                                </div>
                            </div>
                            </form>
                        <button className="btn btn-outline-success" onClick={() => this.closeModal()}>Save</button>
                    </div>
                </Modal>
            </section>
            <section >
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div id="popup">
                        <h2>Edit Profile</h2>
                        <hr></hr>
                        <form >
                            <div className="form-group row">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="Email"></input>
                                </div>
                            </div>
                            </form>
                        <button className="btn btn-outline-success" onClick={() => this.closeModal()}>Save</button>
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
        let token = window.location.href;
        token = token.substring(token.indexOf('token=')+6);

        axios.get('https://fiesta-api.herokuapp.com/user/getData?token=' + token)
        .then(function (response) {
            document.getElementById('name').innerHTML = response.data.name;
            document.getElementById('email').innerHTML = response.data.email;
        })
        .catch(function (error) {
            console.log(error);
            alert("Error: Dashboard problem in getting user data please login again. 1");
            window.location.replace("/login");
        });
    }
    addevent(){
        let token = window.location.href;
        token = token.substring(token.indexOf('token=')+6);
        window.location.replace("/event?token=" + token);
    }
    getevent(cdate){
        for(let i=0;i<this.state.data.length;i++){
            let date1 = new Date(this.state.data[i].date);
            if(cdate.getDate() === date1.getDate() && cdate.getMonth() === date1.getMonth() && cdate.getFullYear() === date1.getFullYear() ){
                let token = window.location.href;
                token = token.substring(token.indexOf('token=')+6);
                let eventID = this.state.data[i].id;
                window.location.replace("/event?token=" + token + '&eventID=' + eventID);
            }
        }


    }
}

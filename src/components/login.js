import React from 'react';
import '../css/forgetpassword-grid.css';
import '../css/standardize.css';
import '../css/styles.css';
import axios from 'axios'
import {Link} from "react-router-dom";
import '../css/bootstrap.css';
import '../css/bootstrap-grid.css';
import '../css/login.css';


const login = () => (
    <div className="App body page-index clearfix">

        <div id = "logincon"  className = "container _element container-3">
            <div className ="col-sm-12 col-md-12 col-lg-12">
                <img id="loginimg" src={require("../res/fiestalogo.png")}  alt="cannot display"/>
            </div>

            <br></br>
            <h4>Login</h4>
            <hr></hr>

            <form>

                    <div class = "form-group">
                            <input type="text" class="form-control _input _input-13" id ="username" placeholder="Username"/>
                    </div>

                    <div class = "form-group">
                            <input type="password" class="form-control _input _input-16" id ="password" placeholder="Password"/>
                    </div>

                    <div class = "form-row">
                            <div class = "col">
                                    <button type="submit" onClick={(e) => {enter(e)}} class="btn btn-dark _button _button-2">Login</button>
                            </div>
                    </div>
            </form>
            <div>
                <br></br>
                <p className="text text-3">Forgot Password? <a onClick={(e) => {forgotPassword(e)}}>Click Here</a></p>
                <br></br>
                <button type="submit" onClick={(e) => {enter(e)}} class="btn btn-dark _button _button-2">New to Fiesta?</button>
            </div>
        </div>
    </div>
);

function forgotPassword(e){
    e.preventDefault();
    let userdata = {};
    userdata.userName = document.getElementById("username").value;

    if(userdata.userName.length < 6){
        alert('Please enter your username before proceeding for forgotPassword.');
        return;
    }

    let url='https://fiesta-api.herokuapp.com/user/forgetPassword?userName='+userdata.userName;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            document.cookie = 'securityQuestion=' + response.data.securityQuestion + ';path=/';
            window.location.replace("/forget?username=" + userdata.userName);

        })
        .catch(function (error) {
            alert(error);
        });
}

function enter(e){
    e.preventDefault();
    let userdata = {};
    userdata.userName = document.getElementById("username").value;
    userdata.password = document.getElementById("password").value;

    let url='https://fiesta-api.herokuapp.com/auth/token?userName='+userdata.userName+'&password='+userdata.password;

    axios({
        method:'get',
        url:url,
    })
        .then(function (response) {
            let token = response.data.token;
            window.location.replace('/dashboard?token=' + token);
        })
        .catch(function (error) {
            console.log(error);
        });
}
export default login;
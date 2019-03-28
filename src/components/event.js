import React from 'react';
import '../css/event.css';
import axios from 'axios';

let globalctr =0;

export default class event extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible : false,
            count: 0,
            tasks: ['example@gmail.com']
        }
        this.state = {value: 'Suggest'};
        this.getPlace = this.getPlace.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickIndex = this.handleClickIndex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addwhislist = this.addwhislist.bind(this);
        this.getlocation = this.getlocation.bind(this);
        this.doneWishList = this.doneWishList.bind(this);
        this.assigntasklist = this.assigntasklist.bind(this);
        this.submitall = this.submitall.bind(this);
        this.gotodash = this.gotodash.bind(this);
        //this.load = this.load.bind(this);
    }

    gotodash(){
        let token = window.location.href;
        token = token.substring(token.indexOf('token=')+6);
        if(window.location.href.indexOf('eventID=') == -1){
            token = token.substring(0, token.indexOf('&'));
        }
        window.location.replace("/dashboard?token=" + token);
    }

    componentDidMount(){
        let eventID = window.location.href;

        if(eventID.indexOf('eventID=') == -1){
            return;
        }
        eventID = eventID.substring(eventID.indexOf('eventID=')+8);

        let token = window.location.href;
        token = token.substring(token.indexOf('token=')+6);
        token = token.substring(0, token.indexOf('&'));

        let self = this;

        axios.get('https://fiesta-api.herokuapp.com/event/get_event?token=' + token)
        .then(function (response) {
            for(let i=0;i<response.data.data.length;i++){
                if(response.data.data[i].id === eventID){
                    document.getElementById("exampleFormControlInput1").value = response.data.data[i].name;
                    document.getElementById("exampleFormControlTextarea1").value = response.data.data[i].description;
                    document.getElementById("exampleFormControlInput12").value = response.data.data[i].imagelink;
                    document.getElementById("give").value = response.data.data[i].location;
                    document.getElementById("cater").value = response.data.data[i].caterer;
                    document.getElementById("example-date-input").value = response.data.data[i].date.substring(0,10);
                    document.getElementById("example-time-input").value = response.data.data[i].date.substring(11,19);

                    let wishlist = response.data.data[i].wishlist.split('//**//');
                    for(let i=1;i<wishlist.length;i++){
                        document.getElementById("wishlistBox").value = wishlist[i];
                        self.addwhislist();
                    }
                    document.getElementById("wishlistBox").value = '';

                    let tasks = response.data.data[i].task.split('//**//');
                    for(let i=1;i<tasks.length;i++){
                        document.getElementById("assigntaskbox").value = tasks[i];
                        self.assigntasklist();
                    }
                    document.getElementById("assigntaskbox").value = '';

                    let invites = response.data.data[i].guest.split('//**//');
                    let clean =[];
                    for(let i=1;i<invites.length;i++){
                        clean.push(invites[i]);
                    }
                    self.setState({tasks: clean});
                }
            }
        })
        .catch(function (error) {
            alert("Error: Event was not submitted please try again!");
        });
    }
    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }


    render() {
        const tasks = (this.state.tasks||[]).map((task,index)=>(
            <li id = "guestemails">
              {task} <button id="guestemaildelete" name="removeTask" onClick={event=>this.handleClickIndex(index,event)}>x</button>
            </li>
          ));
        return (
    <div className="App">


        <nav id = "navevent" className="navbar fixed-top navbar-expand-lg navbar-light bg-light">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#eventinfonav">Info</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#eventvenuenav">Venue</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#eventcateringnav">Catering</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#eventinvitesnav">Invites</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#eventwishlistnav">Wishlist</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#eventasklistnav">Tasklist</a>
                    </li>
                </ul>

            </div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className="nav-link" onclick={this.gotodash()}>Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Logout</a>
                </li>

            </ul>
        </nav>


        <div id="eventinfo" className="d-flex align-items-center">
            <div className="container">
                <div id="eventinfonav"></div>
                <h3>Event Info</h3>
                <hr></hr>
                <div className="row-10">

                <form>

                <div className="form-group row">
                    <div className="col-sm-2">
                        <label htmlFor="exampleFormControlInput1">Event Title:</label>
                    </div>

                    <div className="col-sm-10">
                        <input type="" className="form-control" id="exampleFormControlInput1" ></input>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-2">
                        <label htmlFor="exampleFormControlTextarea1">Event Description:</label>
                    </div>
                    <div className="col-sm-10">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-2">

                        <label htmlFor="example-date-input" className="col-2 col-form-label">Date</label>
                    </div>
                    <div className="col-10">
                        <input className="form-control" type="date" id="example-date-input"></input>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-2">

                        <label htmlFor="example-time-input" className="col-2 col-form-label">Time</label>
                    </div>
                    <div className="col-10">
                        <input className="form-control" type="time" id="example-time-input"></input>
                    </div>
                </div>
                <br></br>
                <h5>Want to relive your memories? Just put the Google Drive link to all your event pictures below! </h5>
                <br></br>
                <div className="form-group row">
                    <div className="col-sm-2">
                        <label htmlFor="exampleFormControlInput12">Google Drive Link:</label>
                    </div>

                    <div className="col-sm-10">
                        <input type="" className="form-control" id="exampleFormControlInput12" ></input>
                    </div>
                </div>
                </form>
                </div>
            </div>
        </div>

        <div id="eventvenue" className="d-flex align-items-center">
            <div className="container">
                <div id="eventvenuenav"></div>
                <h3>Event Venue</h3>
                    <div class="row-10">
                    <div class = "form-group" id ="giveloco">
                        <h5>Need Suggestion?<a href="https://eventup.com/" target="_blank"> Click here</a></h5>
                        <form>
                            <input id="give" class="form-control" placeholder="Address"></input>
                            <br></br>
                            <button class = "btn btn-warning" type = "button" onClick={(e) =>{this.getlocation(e)}}>Submit</button>
                            <br></br>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div id="eventcatering" className="d-flex align-items-center">
            <div className="container">
                <div id="eventcateringnav"></div>
                <h3>Event Catering</h3>
                <hr></hr>
                <div className="row-10">
                    <h5>Need Suggestion?<a href="https://www.ezcater.com/" target="_blank"> Click here</a></h5>
                    <form>
                        <div className="form-group">
                            <input className="form-control" id="cater" placeholder="Final Catering Option"></input>
                            <br></br>
                            <button className="btn btn-warning" type="button">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>

        <div id="eventinvites" className="d-flex align-items-center">

            <div className="container">
                <div id="eventinvitesnav"></div>
                <h3>Event Invites</h3>
                <hr></hr>
                <div className="row-10">
                    <div>
                        <div>
                            <ol >
                                {tasks}
                                {/*{
                                this.state.task &&
                                <li id="emailtyping">{this.state.task}</li>
                                }*/}
                            </ol>
                            <div>
                                <form name="sendTask" onSubmit={this.handleSubmit}>
                                    <input id="emailguestinput" type="email" className="form-control" placeholder="Enter email" name="task" value={this.state.task} onChange={this.handleChange}/>
                                    <div>
                                        <button id="inviteguestbtn" className="btn btn-warning" type="submit" name="addTask" onClick={this.handleClick}>Invite Guest</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div id="eventwishlist" className="d-flex align-items-center">
            <div className="container">
                <div id="eventwishlistnav"></div>
                <h3>Event Wishlist</h3>
                <div className="row-10">
                    <ol id ="wishlistList"></ol>
                    <hr></hr>
                    <div className="input-group">
                        <div className = "col-lg-4"></div>
                        <div className = "col-lg-4">
                        <input type="text" className="form-control" id ="wishlistBox" placeholder="Item"/>
                        </div>

                        <div>
                             <button className="btn btn-warning" type="button" onClick={this.addwhislist}>Submit</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div id="eventasklist" className="d-flex align-items-center">
            <div className="container">
                <div id="eventtasklistnav"></div>
                <h3>Event Tasklist</h3>
                <hr></hr>
                <div className="row-10">

                    <form id="assigntasklistform">
                    <ol id="assigntasklist"></ol>
                    <div className="input-group">
                        <div className = "col-lg-4"></div>
                        <div className = "col-lg-4">
                        <input type="text" placeholder="Task Name - Task Owner" className="form-control" id ="assigntaskbox"/>

                        </div>

                        <div>
                        <button id = "btnsubmit" value="Submit" className="btn btn-warning" type="button" onClick={this.assigntasklist}>Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
                <br></br>
                <h5>Need hosting supply suggestions? <a href="https://www.partycity.com/"target="_blank">Go here!</a></h5>


            </div>
        </div>

        <input className="btn btn-success btn-lg" type="submit" value="Save All Changes" onClick={(e) =>{this.submitall(e)}}></input>

        <footer id="footer"className="footer">
            <div>
            <p>Fiesta Copyright &copy; 2019. Ethan Niu, Shivangi Chand, Siddharth Dhar, Sripath Mishra, Pooja Tewari
            </p>
            </div>
        </footer>

        </div>

        );
    }

    getPlace(event){
        event.preventDefault();
        let input = document.getElementById("place_location").value;
        axios.get('https://fiesta-api.herokuapp.com/event/event?location='+input)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    handleClick(event){
        eval(this[event.target.name]).bind(this)(event)
    }
    handleClickIndex(index, event){
        eval(this[event.target.name]).bind(this)(index, event)
    }
    handleChange(event){
        this.setState({value: event.target.value});
        eval(this[event.target.name]).bind(this)(event)
    }
    handleSubmit(event){
        event.preventDefault()
        // eval(this[event.target.name]).bind(this)(event)
    }
    task(event) {
        this.setState({task:event.target.value})
    }
    addTask(event) {
        if (!this.state.task) return
        const tasks = this.state.tasks || []
        tasks.push(this.state.task)
        this.setState({tasks:tasks, task:''})
    }
    removeTask(index, event) {
        const tasks = this.state.tasks
        tasks.splice(index, 1);

        this.setState({tasks})
    }
    addwhislist(){
        let item = document.getElementById("wishlistBox").value;
        let list = document.getElementById("wishlistList");
        let div = document.createElement('div');
        div.id = 'wishListDiv '+globalctr;
        let br = document.createElement('br');
        let d1 = document.createElement('div');
        d1.id = 'WishListItem '+globalctr;
        let d2 = document.createElement('div');
        d1.id = 'WishListButton '+globalctr;
        div.setAttribute('class' ,'row');
        d1.setAttribute('class' , 'col-lg-6');
        d2.setAttribute('class', 'col-lg-6');
        let b = document.createElement('button');
        b.id = 'wishButt '+globalctr;
        b.innerText = "Done";
        b.setAttribute('class', 'btn btn-warning');
        b.setAttribute('type' , 'button');
        b.onclick  = () =>this.doneWishList(b.id);
        let entry = document.createElement('li');
        entry.innerText = item;
        entry.id = 'WishLi '+ globalctr;
        let baseUrl = 'https://www.amazon.com/s?k=';
        let input = baseUrl + item.replace(/[^A-Z0-9]+/ig, "+");
        entry.onclick = ()=>{window.open(input,'_blank');};
        d1.appendChild(entry);
        d2.appendChild(b);
        div.appendChild(d1);
        div.appendChild(d2);
        list.appendChild(div);
        list.appendChild(br);
        globalctr += 1;
    }

    getlocation(event){
        event.preventDefault();
        let loco = document.getElementById("give").value;
        let url = "https://www.google.com/maps/dir/?api=1&destination="+loco;
        let br = document.createElement('br');
        let p = document.createElement('p');
        p.innerText = 'The location is '+loco;
        let entry = document.createElement('a');
        entry.setAttribute('href', url);
        entry.innerText = 'Click here for direction';
        entry.setAttribute('target' , '_blank');
        let l = document.getElementById("giveloco");
        l.appendChild(p);
        l.appendChild(br);
        l.appendChild(entry);
    }

    assigntasklist(){
        let item1 = document.getElementById("assigntaskbox").value;
        let list1 = document.getElementById("assigntasklist");
        let entry1 = document.createElement('li');
        entry1.innerText = item1;
        list1.appendChild(entry1);
    }

    doneWishList(buttonId){
        let b = buttonId.split(" ");
        let item = 'WishLi '+b[1];
        let l = document.getElementById(item);
        l.style.textDecoration = 'line-through';
    }

    submitall(event){
        event.preventDefault();
        let data = {};
        data.title = document.getElementById("exampleFormControlInput1").value;
        data.description = document.getElementById("exampleFormControlTextarea1").value;
        data.date = document.getElementById("example-date-input").value;
        data.time = document.getElementById("example-time-input").value;
        data.imageLink = document.getElementById("exampleFormControlInput12").value;
        data.place = document.getElementById("give").value;
        data.catering = document.getElementById("cater").value;
        data.partySupplier = 'N/A';
        let tempinvite = this.state.tasks;
        data.invites = '';
        if(tempinvite){
            data.invites = '';
            for( let i=0;i<tempinvite.length;i++){
            data.invites += '//**//' + tempinvite[i] + '--';
            }
        }
        data.wishlist = document.getElementById("wishlistList").innerHTML;
        let newdata ='';
        while(data.wishlist.length > 0){
            let temp = data.wishlist;
            temp = temp.substring(temp.indexOf('class="col-lg-6"><li id')+ 23);
            temp = temp.substring(temp.indexOf('>')+1);
            newdata += '//**//' + temp.substring(0,temp.indexOf('<'));
            temp = temp.substring(temp.indexOf('<br>')+4);
            data.wishlist = temp;
        }
        data.wishlist = newdata;
        data.tasklist = document.getElementById("assigntasklist").innerHTML;
        while(data.tasklist.indexOf('<li>')!= -1){
            data.tasklist = data.tasklist.replace(new RegExp('</li>'), '');
            data.tasklist = data.tasklist.replace(new RegExp('<li>'), '//**//');
        }

        let token = window.location.href;
        token = token.substring(token.indexOf('token=')+6);

        let eventID = window.location.href;
        if(eventID.indexOf('eventID=') !== -1){
            token = token.substring(0, token.indexOf('&'));
            eventID = eventID.substring(eventID.indexOf('eventID=')+8);
            let url='https://fiesta-api.herokuapp.com/event/update_event?token=' + token;

            axios({
                method: 'post',
                url:url,
                data:{
                    id: eventID,
                    name: data.title,
                    description: data.description,
                    date: data.date + 'T' + data.time + '+00:00',
                    imageLink: data.imageLink,
                    location: data.place,
                    partySupplier: data.partySupplier,
                    caterer: data.catering,
                    task: data.tasklist,
                    guest: data.invites,
                    wishlist: data.wishlist,

                }
            })
            .then(function (response) {
                alert('Done!');
                window.location.replace("/dashboard?token=" + token);
            })
            .catch(function (error) {
                alert('Error:Please follow the format!');
                window.location.replace("/dashboard?token=" + token);
            });
        }
        else{
            let url='https://fiesta-api.herokuapp.com/event/create_event?token=' + token;

            axios({
                method: 'post',
                url:url,
                data:{
                    name: data.title,
                    description: data.description,
                    date: data.date + 'T' + data.time + '+00:00',
                    imageLink: data.imageLink,
                    location: data.place,
                    partySupplier: data.partySupplier,
                    caterer: data.catering,
                    task: data.tasklist,
                    guest: data.invites,
                    wishlist: data.wishlist,

                }
            })
            .then(function (response) {
                alert('Done!');
                window.location.replace("/dashboard?token=" + token);
            })
            .catch(function (error) {
                alert('Error:Please follow the format!');
                window.location.replace("/dashboard?token=" + token);
            });
        }

    }

}



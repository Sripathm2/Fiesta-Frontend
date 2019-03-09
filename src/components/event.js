import React, {Component} from 'react';
import '../css/event.css'
import Modal from 'react-awesome-modal';
export default class event extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible : false,
            count: 0,
            tasks: ['example@gmail.com']
        }
        this.state = {value: 'Suggest'};

        this.handleClick = this.handleClick.bind(this);
        this.handleClickIndex = this.handleClickIndex.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addwhislist = this.addwhislist.bind(this);
        this.getlocation = this.getlocation.bind(this);
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
          ))
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
                    <a className="nav-link" href="#">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Logout</a>
                </li>

            </ul>
        </nav>


        <div id="eventinfo" className="d-flex align-items-center">
            <div className="container">
                <div id="eventinfonav"></div>
                <h3>Event Info</h3>
                <hr></hr>
                <div class="row-10">

                <form>

                <div class="form-group row">
                    <div class="col-sm-2">
                        <label for="exampleFormControlInput1">Event Title:</label>
                    </div>

                    <div class="col-sm-10">
                        <input type="" class="form-control" id="exampleFormControlInput1" ></input>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-sm-2">
                        <label for="exampleFormControlTextarea1">Event Description:</label>
                    </div>
                    <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-2">

                        <label for="example-date-input" class="col-2 col-form-label">Date</label>
                    </div>
                    <div class="col-10">
                        <input class="form-control" type="date" id="example-date-input"></input>
                    </div>
                </div>

                <div class="form-group row">
                    <div class="col-2">

                        <label for="example-time-input" class="col-2 col-form-label">Time</label>
                    </div>
                    <div class="col-10">
                        <input class="form-control" type="time" id="example-time-input"></input>
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
                <hr></hr>
                <div class="row">
                    <div class = "col-lg-6 form-group" id ="giveloco">
                        <form>
                            <h5>Give a Location</h5>
                            <input id="give" class="form-control"></input>
                            <br></br>
                            <button class = "btn btn-warning" type = "button" onClick={this.getlocation}>Submit</button>
                            <br></br>
                        </form>
                    </div>
                    <div class = " vl col-lg-1"></div>
                    <div class ="col-lg-5 form-group">
                        <form>
                            <h5>Need Suggestions?</h5>
                            <input id="suggest" className="form-control"></input>
                            <br></br>
                            <button className="btn btn-warning" type="submit">Submit</button>
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
                <div class="row-10">
                    <h5>Need Suggestion?<a href="https://www.ezcater.com/" target="_blank"> Click here</a></h5>
                    <p></p>
                </div>
            </div>
        </div>

        <div id="eventinvites" className="d-flex align-items-center">

            <div className="container">
                <div id="eventinvitesnav"></div>
                <h3>Event Invites</h3>
                <hr></hr>
                <div class="row-10">
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
                                    <input id="emailguestinput" type="email" class="form-control" placeholder="Enter email" name="task" value={this.state.task} onChange={this.handleChange}/>
                                    <div>
                                        <button id="inviteguestbtn" class="btn btn-warning" type="submit" name="addTask" onClick={this.handleClick}>Invite Guest</button>
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
                <div class="row-10">
                    <ol id ="wishlistList"></ol>
                    <hr></hr>
                    <div class="input-group">
                        <div class = "col-lg-4"></div>
                        <div class = "col-lg-4">
                        <input type="text" class="form-control" id ="wishlistBox"/>
                        </div>

                        <div>
                             <button class="btn btn-warning" type="button" onClick={this.addwhislist}>Submit</button>
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
                <div class="row-10">

                </div>

            </div>
        </div>
        <input class="btn btn-success btn-lg" type="submit" value="Save All Changes"></input>

        <footer id="footer"className="footer">
            <div>
            <p>Fiesta Copyright &copy; 2019. Ethan Niu, Shivangi Chand, Siddharth Dhar, Sripath Mishra, Pooja Tewari
            </p>
            </div>
        </footer>

        </div>

        );
    }
    handleClick(event){
        eval(this[event.target.name]).bind(this)(event)
      }
      handleClickIndex(index, event){
        eval(this[event.target.name]).bind(this)(index, event)
      }
      handleChange(event){
          this.setState({value: event.target.value});
        //eval(this[event.target.name]).bind(this)(event)

      }
      handleSubmit(event){
        //eval(this[event.target.name]).bind(this)(event)
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
        tasks.splice(index, 1)

        this.setState({tasks})
      }
      addwhislist(){
        let item = document.getElementById("wishlistBox").value;
        let list = document.getElementById("wishlistList");
        let entry = document.createElement('li');
        entry.innerText = item;
        let baseUrl = 'https://www.amazon.com/s?k=';
        let input = baseUrl + item.replace(/[^A-Z0-9]+/ig, "+");
        entry.onclick = ()=>{window.open(input,'_blank');};
        list.appendChild(entry);
      }
      getlocation(){
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
}



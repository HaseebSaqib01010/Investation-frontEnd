import { ChatBox, CreatePoll, Timeline, MyPolls, Profile } from "./components";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import "./investor.css";
import logo from "../../assets/img/logo.png";
import { useEffect, useState } from "react";
import http from "../../axios";

import SubServices from "./SubServices"
import UserProfileShoe from "./components/UserProfileShoe";



const Investor = (params) => {
  const history = useHistory();
  const [hot, setHot] = useState([]);
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.reload();
    history.push("/auth");
  }
  useEffect(() => {
    http.get("/post/hot/topics").then(res => {
      setHot(res.data.data);
    })
  }, []);
  return (
    <div>
      <div>
        <div className="row mt-4">
          <div className="nav-bar d-flex align-items-center justify-content-between">
            <Link to={'/reviewer'} className="navbar-brand">
              <img src={logo} alt="logo" className="logo"></img>
            </Link>
            
            {/* <SubServices /> */}
            <div className="row icons mb-6">
              <div className="d-flex align-items-center col icon px-2 mx-2">
                <Link to={'/chat'}>
                  <i class="fa-solid fa-comment-dots"></i>
                </Link>
              </div>
              <div className="d-flex align-items-center col icon px-2 mx-2">
                <Link to={'/auth/signin'} onClick={logout}>
                  <i class="fa-solid fa-power-off"></i></Link>
              </div>
            </div>

          </div>

        </div>

      </div>
      
      <div className="row mt-4">
        <div className="col-md-2 width-container d-flex flex-column">
          <Link to="/investor/createpoll">
            <button className="btn post-btn">
              <i className="fas fa-clipboard-list"></i>Create Poll
            </button>
          </Link>

          <Link to="/investor">
            <button className="btn post-btn">
              <i className="fas fa-home"></i>Timeline
            </button>
          </Link>

          <Link to="/investor/polls">
            <button className="btn post-btn">
              <i className="fas fa-poll"></i>My Polls
            </button>
          </Link>

          <Link to="/investor/profile">
            <button className="btn post-btn">
              <i className="fas fa-user"></i>Profile
            </button>
          </Link>

          <Link to="">
            <button className="btn post-btn">
              <i className="fas fa-star"></i>Smart Plan
            </button>
          </Link>

        </div>
        <div className="col">
          <Switch>
            <Route exact path="/investor" component={Timeline} />
            <Route exact path="/investor/chatbox" component={ChatBox} />
            <Route exact path="/investor/createpoll" component={CreatePoll} />
            <Route exact path="/investor/polls" component={MyPolls} />
            <Route exact path="/investor/profile" component={Profile} />
            <Route exact path="/investor/userprofile/:id" component={UserProfileShoe} />
          </Switch>
        </div>

        <div className="col-md-3">
          <h4 className="btn post-btn">Trending Posts</h4>
          {
            hot.map((item, index) => {
              return (
                <div className="hot-topic">
                  <p>{
                    item.body
                  }</p>
                </div>
              );
            })
          }
          <div className="col-md-3"><br/><br/> 
          <h4 className="btn post-btn">Recommendations</h4>
          {
            hot.map((item, index) => {
              return (
                <div className="hot-topic">
                  <p>{
                    item.body
                  }</p>
                </div>
              );
            })
          }
        </div>
        </div>
        

      </div>
    </div>
  );
};
export default Investor;

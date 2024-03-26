import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./DashBoard.css";
import Footer from "./../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";


export default function DashBoard() {
  const { user, isAuthenticated } = useAuth0(); // importing the authentication state and user object from auth0, user holds all of the user's information
  const navigateTo = useNavigate();

  console.log("isAuthenticated:", isAuthenticated); // checking to see if the user is authenticated

  // this is an object, this means we can perform operations such as appending or removing
  // this is to mimic the workflow of data that would be coming from a backend
  // we are using this because we do not have a backend set up yet
  const demoWorkFlow = {
    // one, two, three are the keys! They are unqiue and cannot repeat, You can copy and paste one of them to see what I mean.
    // In the return statement we are mapping over these objects, run the program and see how they translate on the screen and then take another look at the code.
    one: { 
      boardname: "KanBan Demo 1",
      board_type: "Demo Board 1",
      board_link: "/Workflow1", //WorlflowPage.js
      img: "https://kyan-hamad.github.io/RPG-Game/BluePinkGradient.png",
    },

    two: {
      boardname: "KanBan Demo 2",
      board_type: "Demo Board 2",
      board_link: "/Workflow2",
      img: "https://kyan-hamad.github.io/RPG-Game/PinkBackground.png",
    },

    three: {
      boardname: "KanBan Demo 3",
      board_type: "Demo Board 3",
      board_link: "/Workflow3",
      img: "https://kyan-hamad.github.io/RPG-Game/MountainBack.jpg",
    },
  };

  const userBoards = {
    one: {
      boardname: "My Demo Board",
      board_type: "Kanban Board",
      board_link: "/profile",
      img: "https://i.pinimg.com/474x/eb/9a/34/eb9a34c6d44971b594ea2086a387a2f7.jpg",
    },
  };

  const recentlyViewed = {
    one: {
      boardname: "KanBan Demo 1",
      board_type: "Demo Board 1",
      board_link: "/profile",
      img: "https://i.pinimg.com/474x/98/3d/02/983d020d44f402c4dca2beabf44dd043.jpg",
    },

    two: {
      boardname: "KanBan Demo 2",
      board_type: "Demo Board 2",
      board_link: "/profile",
      img: "https://i.pinimg.com/474x/ba/2a/ad/ba2aadf1245af356c7bf5dd4cf6158da.jpg",
    },
  };


  //function to handle user navigation
  const handleNavigation = (route) => {
    navigateTo(route);
  };

  return (
    <>
      <div className="dashboard-container">
        <aside className="sidebar">
          <div className="top">
            <ul>
              {/* the handleNavigation function is implemented here for when a user clicks on Create Workflow or Profile */}
              <ul
                className="list-item"
                onClick={() => handleNavigation("/Workflow")}
              >
                {" "}
                Create Workflow{" "}
              </ul>
              <ul
                className="list-item"
                onClick={() => handleNavigation("/profile")}
              >
                {" "}
                Profile{" "}
              </ul>
            </ul>
          </div>
          {/* <hr /> */}
          <div className="bottom">
            <ul>
              <ul style={{ textDecoration: "underline" }}>WORKFLOWS</ul>
              <ul className="list-item"> {user.nickname}'s WorkFlows</ul>
              {/* user.name is coming from the user object */}
            </ul>
          </div>
        </aside>

        <div className="dashboard-container-content">
          <div className="start-workflow">
            <h3> Start A New WorkFlow </h3>
            {/* card starts here  */}
            {/* mapping over the demoWorkFlow Object declared at the top of the page, each object represents it's own card
              this is to mimic data that would be coming from a backend.
              */}
            <div className="workflow-cards">
              {/* Object.keys is a built in javascript function that allows us to map over objects, keys are unique so we are able to target specifc data
              we are able to pinpoint specific data we want to see if the fields depending on the data in the object by using dot annotation ex. demoWorkflow[key].img*/}
              {Object.keys(demoWorkFlow).map((key) => (
                <div class="card" style={{ width: "18rem" }}>
                  <div key={key}>
                    <div class="card-body">
                      <h5 class="card-title">{demoWorkFlow[key].boardname}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">
                        {demoWorkFlow[key].board_type}
                      </h6>
                      <img
                        src={demoWorkFlow[key].img}
                        alt=""
                        width={"250px"}
                        height={"250px"}
                      />
                      <a href={demoWorkFlow[key].board_link} class="card-link">
                        Try this theme
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* card ends here */}
          </div>

          <div className="your-workflow">
            <h3>Your Workflows</h3>
            {/* card starts here  */}
            {/* mapping over the userBoards Object declared at the top of the page, each object represents it's own card
              this is to mimic data that would be coming from a backend.
              */}
            <div className="workflow-cards">
              {/* this is a built in javascript function that allows us to map over objects, 
              we are able to pinpoint specific data we want to see if the fields depending on the data in the object*/}
              {Object.keys(userBoards).map((key) => (
                <div className="card" style={{ width: "18rem" }}>
                  <div key={key}>
                    <div class="card-body">
                      <h5 class="card-title">{userBoards[key].boardname}</h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">
                        {userBoards[key].board_type}
                      </h6>
                      <img
                        src={userBoards[key].img}
                        alt=""
                        width={"250px"}
                        height={"250px"}
                      />
                      <a href={userBoards[key].board_link} class="card-link">
                      Try this theme
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* card ends here */}
          </div>

          <div className="recently-viewed">
            <h3>Recently Viewed</h3>
            {/* card starts here  */}
            {/* mapping over the recentlyViewed Object declared at the top of the page, each object represents it's own card
              this is to mimic data that would be coming from a backend.
              */}
            <div className="workflow-cards">
              {/* this is a built in javascript function that allows us to map over objects, 
              we are able to pinpoint specific data we want to see if the fields depending on the data in the object*/}
              {Object.keys(recentlyViewed).map((key) => (
                <div class="card" style={{ width: "18rem" }}>
                  <div key={key}>
                    <div class="card-body">
                      <h5 class="card-title">
                        {recentlyViewed[key].boardname}
                      </h5>
                      <h6 class="card-subtitle mb-2 text-body-secondary">
                        {recentlyViewed[key].board_type}
                      </h6>
                      <img
                        src={recentlyViewed[key].img}
                        alt=""
                        width={"250px"}
                        height={"250px"}

                        // // Add onClick event to the image
                        // onClick={() =>
                        //   handleNavigation(`/cards/${key}`) // Assuming the key is attached to unique cards for workflow types
                        // }
                        // style={{ cursor: "pointer" }}

                      />
                      <a
                        href={recentlyViewed[key].board_link}
                        class="card-link"
                      >
                        Try this theme
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* card ends here */}
          </div>
        </div>
      </div>
      <hr />
      <Footer />
    </>
  );
}

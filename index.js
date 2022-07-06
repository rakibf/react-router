import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      {/* i can also write jsx in the element prop. but it's not a good practice */}
      <Route path="/" element={<Home />} />
      {/* suppose i want '/myapps' route to be redirected to '/learn' route */}
      {/* <Navigate to='/' changes the route programmitically but doesn't replace the current location, so we have to use the 'replace={true}' prop */}
      <Route path="/myapps" element={<Navigate to="/learn" replace={true} />} />
      {/* nested routing implementation doesn't self enclose the Route */}
      <Route path="/learn" element={<Learn />}>
        {/* we have to use relative link (means route with no slash infront). these routes partially renders the element with <Learn /> that matches the route. such as: '/learn/courses' renders the <Courses /> inside the <Learn /> component <Outlet /> */}
        <Route path="courses" element={<Courses />}>
          {/* dynamic segment to grab url parameters in <CourseId /> component */}
          <Route path=":courseid" element={<CourseId />} />
        </Route>
        <Route path="bundle" element={<Bundles />} />
      </Route>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  </Router>
);

function Home() {
  return (
    <div>
      <h1>Home route</h1>
    </div>
  );
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here:</h4>
      {/* add links to different route to avoid page reload */}
      <Link to="/learn/courses">courses</Link> /
      <Link to="/learn/bundle">bundles</Link>
      {/* this is where child route renders component */}
      <Outlet />
    </div>
  );
}

function Courses() {
  const courseList = ["React", "Angular", "JavaScript", "Vue"];
  const randomCourseName =
    courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Courses route</h1>
      {/* NavLink is the same as Link but has some extra features */}
      <NavLink
        to={`/learn/courses/${randomCourseName}`}
        style={({ isActive }) => {
          return { background: isActive ? "blue" : "yellow" };
        }}
      >
        {randomCourseName}
      </NavLink>
      <NavLink to="/learn/courses/tests">Tests</NavLink>
      {/* outlet to render single course page */}
      <Outlet />
    </div>
  );
}

function Bundles() {
  return (
    <div>
      <h1>Bundles route</h1>
    </div>
  );
}

function CourseId() {
  // useParams hook returns the object containing key/value pairs of the current Url
  const { courseid } = useParams();

  // navigate using useNavigate
  const navigate = useNavigate();
  
  return (
    <div>
      <h1>Params: {courseid}</h1>
      {/* forward data with navigate when moving to a different route */}
      <button onClick={() => navigate("/dashboard", {state: "333"})}>Price</button>
      {/* we can also use Link to pass data to a different route component */}
      <Link to="/dashboard" state="DJANGO">DJANGo</Link>
    </div>
  );
}

function Dashboard() {
  // location object receives information given through navigate
  const location = useLocation();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>information i got: {location.state}</p>
    </div>
  );
}


reportWebVitals();

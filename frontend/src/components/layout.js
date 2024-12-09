import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";


export function Navbar({LoggedInUser}) {

  const navigate = useNavigate();

  const handleLogOut = (e)=>{

    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser');
    handleSuccess('User Logged Out')
    setTimeout(()=>{
      navigate('/login')
    },2000);

  }


  return (

    <nav className="navbar navbar-expand-lg bg-white border-bottom box-shadow">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src="/student-logo.jpg" alt="logo" width = "30" className="me-2"/>
          SMS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-dark" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#">
                Contact
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
          <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-dark"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {LoggedInUser}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Students
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Lecturers
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" onClick={handleLogOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer/>
    </nav>
    
  );
}

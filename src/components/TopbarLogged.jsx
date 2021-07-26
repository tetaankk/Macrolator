import { Link } from "react-router-dom";

export default function TopbarLogged() {
  return (
    <div className="topBar">
      <div className="container">
        {/*         <Link to="/" className="topBarLogo">
          Nutrilator
        </Link> */}
        <div className="topBarItemContainer">
          <ul className="topBarItemList">
            {}
            <li className="navbar-item">
              <Link to="/history" className="nav-link">
                HISTORIA
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                UUSI ANNOS
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to=""
                className="nav-link nav-link-small"
                onClick={() => {
                  localStorage.clear();
                  window.location = "/";
                }}
              >
                KIRJAUDU ULOS
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export default function TopbarNotLogged() {
  return (
    <div className="topBar">
      <div className="container">
        <div className="topBarItemContainer">
          <ul className="topBarItemList">
            <li className="navbar-item">
              <Link to="/" className="nav-link nav-link-small">
                KIRJAUDU SISÄÄN
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="nav-link nav-link-small">
                LUO KÄYTTÄJÄ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

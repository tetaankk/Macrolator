import { Link } from "react-router-dom";
import "./topbar.scss";

export default function TopbarNotLogged() {
  return (
    <div className="topBar">
      <form>
        <Link to="/login" className="link">
          <span>Kirjaudu sisään</span>
        </Link>
        tai
        <Link to="/register" className="link">
          <span>Luo käyttäjä</span>
        </Link>
        tai
        <Link to="/register" className="link">
          <span>Kokeile palvelua testikäyttäjällä!</span>
        </Link>
      </form>
    </div>
  );
}

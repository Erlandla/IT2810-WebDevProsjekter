import styles from "./Navbar.module.css";
import { Link} from "react-router-dom";
import watchlistIcon from "../../images/watchlistIcon.svg";
import logo from "../../images/logo.svg";

// ============ DESCRIPTION ==================
// The navigation bar of the website

const Navbar = () => {
  return (
    <nav className={styles.flexbox}>

      <Link to="/">
        <img className={styles.logo} src={logo} alt="Film DB logo" data-cy ="homeButton"></img>
      </Link>

      <Link to="/watchlist" style={{textDecoration: "none", marginTop: "auto", marginBottom: "auto"}}>
        <div className={styles.watchlistContainer}>
          <img src={watchlistIcon} alt="Watchlist icon"></img>
          <div data-cy="watchListButton">WatchList</div>
        </div>
      </Link>

    </nav>
  );
};

export default Navbar;

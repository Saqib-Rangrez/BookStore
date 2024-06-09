import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/circles.png";
import useStyles from "./styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const navigate = useHistory();
  const user = JSON.parse(localStorage.getItem("user")) ?? null;
  console.log(user)
  const logout = () => {
    localStorage.removeItem("user")
    navigate.push("/login")
    window.location.reload() 
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Book Store App"
              height="50px"
              className={classes.image}
            />
            <div>BOOKSHOP</div>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button} style={{display: "flex", flexFlow: "row", alignItems: "center"}}>
          {
            
            user !== null &&
            <div className="d-flex flex-row gap-2 align-items-center">
              <div style={{fontSize: "1.5rem", fontWeight: "bold", color: "white", transition: "color 0.3s ease", cursor: "pointer"}} onMouseOver={(e) => e.target.style.color = "blue"} onMouseOut={(e) => e.target.style.color = "white"} onClick={logout}>Logout</div>
              <Link style={{fontSize: "1.5rem", fontWeight: "bold", color: "white", transition: "color 0.3s ease"}} to="/addbook" onMouseOver={(e) => e.target.style.color = "blue"} onMouseOut={(e) => e.target.style.color = "white"}>Add Book</Link>

            </div>

          }
          {
            user == null &&
            <div className="d-flex flex-row gap-2 align-items-center">
              <Link style={{fontSize: "1rem", fontWeight: "bold", color: "white", transition: "color 0.3s ease"}} to="/login" onMouseOver={(e) => e.target.style.color = "blue"} onMouseOut={(e) => e.target.style.color = "white"}>SignUp</Link>
              
              <Link style={{fontSize: "1rem", fontWeight: "bold", color: "white", transition: "color 0.3s ease"}} to="/signup" onMouseOver={(e) => e.target.style.color = "blue"} onMouseOut={(e) => e.target.style.color = "white"}>Login</Link>
              
            </div>
            
          }
          {
            user !== null && 
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          }
            
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

import { Link } from "react-router-dom"

export const Header=() =>{
  return (
    <div >
    <nav>
                <Link to="/">Profile</Link>  
                <Link to="/login">Login</Link>  
                <Link to="/Test">Test</Link>
                <Link to="/Error">Error</Link>
            </nav>
      
      
     </div>
  )}
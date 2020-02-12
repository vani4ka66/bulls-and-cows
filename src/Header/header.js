import React, {Fragment} from 'react';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
		};
		
		this.handleLogout = this.handleLogout.bind(this);
  }
	
	handleLogout(){
		localStorage.setItem('username', "");
	}

  render() {
    return (
			<Router>
				<Switch>
					<Fragment>
						<header className="main-header">
							<div className="container">
								<nav className="main-nav">
									<ul className="main-nav-list">
										<li>
											<a href="../">Home</a>
										</li>

										{localStorage.getItem('username') !== "" &&
      										<li>
												<a href="../bulls">Play</a>
											</li>
      							}

										{localStorage.getItem('username') === "" &&
											<li>
												<a href="../register">Register</a>
											</li>
										}

										{localStorage.getItem('username') === "" &&
											<li>
												<a href="../login">Login</a>
											</li>
										}
										
										{localStorage.getItem('username') !== "" &&
      								<li>
												<a islogged="false" onClick={this.handleLogout} href="../">Logout</a>											
											</li>
      							}
									
										{localStorage.getItem('username') !== "" &&
      								<li>
											<a id="helloUser" href="../">Hello {localStorage.getItem('username')}</a>
											</li>
      							}
									
									</ul>
								</nav>
							</div>
						</header>
        	</Fragment>
				</Switch>
			</Router>
    )
  }
}

export default Header;

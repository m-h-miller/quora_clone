window.Header = React.createClass({
	render: function () {
		return (
			<div>
				<header className="header">
				  <div className="header-wrap group">
				    <h1 className="header-logo">
				      <a href="#">Quorum</a>
				    </h1>

				    <nav className="header-nav">
				      <ul className="group">

				          <li><a href="#"><strong>Home</strong></a></li>
				          <li><a href="#"><strong>Write</strong></a></li>

				          <li>
				            <a href="#">Notifications <strong className="header-nav-badge">3</strong></a>
				            <ul className="header-nav-drop-down">
				              <li><a href="#">Someone liked your question.</a></li>
				              <li><a herf="#">Someone answered your question.</a></li>
				            </ul>
				          </li>

				          <li>
				            <a href="#"><strong> current_user.user_name </strong></a>
				          </li>

				          <li>
				            <label>
				              <input type="submit" value="Sign Out" />
				            </label>
				          </li>
				          <li><a id="ask-question" href="#"><strong>Ask Question</strong>
				          </a></li>

				      </ul>
				    </nav>

				  </div>
				</header>
			</div>
		);
	}
});
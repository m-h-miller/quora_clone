var React = require('react'),
    UsersApiUtil = require('../../util/users_api_util.js');

var UserForm = React.createClass({
    defaults: {
      user_name: "",
      password: "",
      imageUrl: "",
      imageFile: null
    },
    getInitialState: function () {
      return this.defaults;
    },

    changeFile: function (e) {
      var reader = new FileReader();
      var file = e.currentTarget.files[0];
      var that = this;

      reader.onloadend = function () {
        that.setState({
          imageUrl: reader.result,
          imageFile: file
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.setState({ imageUrl: "", imageFile: null });
      }
    },

    handleSubmit: function (e) {
      e.preventDefault();
      var user_name = this.state.user_name;
      var password = this.state.password;
      var file = this.state.imageFile;

      var formData = new FormData();
      formData.append("user[user_name]", user_name);
      formData.append("user[password]", password);
      formData.append("user[avatar]", file);

      UsersApiUtil.signup(formData, function (credentials) {
        this.history.pushState(null, "/");
        this.resetForm();
      }.bind(this));
    },

    resetForm: function () {
      this.setState({ user_name: "", password: "", imageUrl: "", imageFile: null });
    },

    render: function() {

      return (
        <div className="new-session">

          <div className="new-session-background "></div>
          <div className="new-session-gradient"></div>

          <div className="new-session-content">
            <div className="new-session-header">
              <h1>
                Quorum
              </h1>
              <h4>
                The best answer to any question.
              </h4>
            </div>

            <div className="new-session-form-wrapper">
              <form className="new-session-form group" onSubmit={ this.handleSubmit }>
                <label>
                  Username
                  <input
                    type="text"
                    id="user_name"
                    valueLink={this.linkState('user_name')} />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    id="password"
                    valueLink={ this.linkState('password') } />
                </label>
                <label>
                  Avatar
                  <input
                    type="file"
                    onChange={this.changeFile} />
                </label>
                <br/>
                <button>Sign Up</button>
                <button>
                  <a href="#/signin">Sign in</a>
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    },
  });

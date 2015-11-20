(function(root) {
  root.UserForm = React.createClass({
    getInitialState: function() {
      return { user_name: "", password: "", imageUrl: "", imageFile: null };
    },

    render: function() {
      return (
        <div>
          <div className="log-in">
            <h2>Create a New Account</h2>
            <form onSubmit={this.handleSubmit}>
              <label>Username
                <input type="text" onChange={this.changeName} value={this.state.user_name} />
              </label>

              <label>Password
                <input type="password" onChange={this.changePw} value={this.state.password} />
              </label>

              <input type="file" onChange={this.changeFile} />

              <button>Submit</button>
            </form>
            <img className="preview-image" src={this.state.imageUrl} />
          </div>

          <div className="sign-up">
            or
              <a href="/session/new">Sign In</a>
          </div>
        </div>
      );
    },

    changeName: function(e) {
      this.setState({ user_name: e.currentTarget.value });
    },

    changePw: function(e) {
      this.setState({ password: e.currentTarget.value });
    },

    changeFile: function(e) {
      var reader = new FileReader();
      var file = e.currentTarget.files[0];
      var that = this;

      reader.onloadend = function() {
        that.setState({ imageUrl: reader.result, imageFile: file });
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        this.setState({ imageUrl: "", imageFile: null });
      }
    },

    handleSubmit: function(e) {
      e.preventDefault();

      var user_name = this.state.user_name;
      var password = this.state.password;
      var file = this.state.imageFile;

      var formData = new FormData();
      formData.append("user[user_name]", user_name);
      formData.append("user[password]", password);
      formData.append("post[image]", file);

      ApiUtil.createUser(formData, this.resetForm);
    },

    resetForm: function() {
      this.setState({ user_name: "", password: "", imageUrl: "", imageFile: null });
    }
  });
})(this);

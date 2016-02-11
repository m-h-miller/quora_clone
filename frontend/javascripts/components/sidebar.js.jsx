var React = require('react'),
    CheckboxGroup = require('react-checkbox-group');

var SideBar = React.createClass({
  getInitialState: function () {
    return { value: ['General', 'Ruby', 'Philosophy', 'Javascript', 'React.js']};
  },

  handleChange: function () {
    var selected = this.refs.topicsGroup.getCheckedValues();
    console.log(selected);
  },

  render: function () {
    return(
      <div className="page-left">
		    <h2 className="title"> FEEDS </h2>
		    <section className="page-left-content">
		      Select feeds to display.

          <br/>

          <CheckboxGroup name="topics" value={ this.state.value } ref="topicsGroup" onChange={ this.handleChange }>
            <input type="checkbox" value="General" /> General
            <br/>
            <input type="checkbox" value="Ruby" /> Ruby
            <br/>
            <input type="checkbox" value="Philosophy" /> Philosophy
            <br/>
            <input type="checkbox" value="Javascript" /> Javascript
            <br/>
            <input type="checkbox" value="React.js "/> React.js
            <br/>
          </CheckboxGroup>

          </section>
      </div>
    );
  }
});

module.exports = SideBar;

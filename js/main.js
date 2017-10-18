var Entry =  React.createClass({
  render: function() {
    return (
      <div className="col-md-4">
        <h2>{this.props.title}</h2>
        <p>{this.props.body}</p>
        <p><a className="btn btn-default" href={this.props.link} target="_blank" role="button">View details &raquo;</a></p>
      </div>
    )
  }
});

var Footer =  React.createClass({
  render: function() {
    return (
      <div>
        <hr />
        <footer>
            <p>&copy; 2017 Ignacio Cicero</p>
        </footer>
      </div>
    )
  }
});

var Contents = React.createClass({
  getInitialState: function() {
    return {
      content: []
    }
  },
  componentDidMount() {
    let oThis = this;
    var m = new Date().getTime();
    $.get("contents.json?m=" + m, function(data, status){
      oThis.setState({ content: data });
    });
  },
  render: function() {
    if(this.state.content.length >0) {
      let content = this.state.content;
      return (
        <div className="row">
          <Entry title={this.state.content[0].title}
          body={this.state.content[0].body}
          link={this.state.content[0].link} />
          <Footer />
        </div>
      );
    }
    <Footer />
    return(<div className="row"><Footer /></div>)
  }
});

ReactDOM.render(
  <Contents />,
  document.getElementById('content')
);

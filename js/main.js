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

var Row = React.createClass({
  render : function () {
    return (
      <div className="row">
        {this.props.entries}
      </div>
    );
  }
});

var RowContainer = React.createClass({
  render : function () {
    return (
      <div>
        {this.props.rows}
      </div>
    );
  }
});

var Container = React.createClass({
  getInitialState: function() {
    return {
      entries: []
    }
  },
  componentDidMount() {
    let oThis = this;
    var m = new Date().getTime();
    $.get("contents.json?m=" + m, function(data, status){
      oThis.setState({ entries: data });
    });
  },
  render: function() {
    if(this.state.entries.length == 0) {
      return(<div><RowContainer rows={[]}/> <Footer /></div>)
    }

    let entries = this.state.entries;
    let rows = {};
    let rowIndex = 0;
    rows[rowIndex] = {}
    rows[rowIndex].entries = [];
    for(let i in entries) {
      if(i> 0 && i % 3 === 0) {
        rowIndex++;
        rows[rowIndex] = {}
        rows[rowIndex].entries = [];
      }
      rows[rowIndex].entries.push(<Entry key={i}
                                          title={entries[i].title}
                                          body={entries[i].body}
                                          link={entries[i].link} />)
    }
    let actualRows = [];
    for (let i in rows) {
      actualRows.push(<Row key={i} entries={rows[i].entries} />);
    }
    console.log(actualRows[0].addAlgo);
    return (
      <div>
        <RowContainer rows={actualRows}/>
        <Footer />
      </div>
    );
  }
});

ReactDOM.render(
  <Container />,
  document.getElementById('content')
);

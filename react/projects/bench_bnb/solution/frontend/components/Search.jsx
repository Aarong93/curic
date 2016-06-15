const React = require('react');
const BenchStore = require('../stores/bench');
const FilterParamsStore = require('../stores/filter_params');
const BenchActions = require('../actions/bench_actions');
const FilterForm = require('./filter_form');
const Index = require('./index');
const BenchMap = require('./bench_map');
const hashHistory = require('react-router').hashHistory;


const Search = React.createClass({
  getInitialState() {
    return {
      benches: BenchStore.all(),
      filterParams: FilterParamsStore.params(),
      clickedLoc: null,
    };
  },

  _benchesChanged() {
    this.setState({benches: BenchStore.all()});
  },

  _filtersChanged() {
    const newFilters = FilterParamsStore.params();
    this.setState({ filterParams: newFilters });
    BenchActions.fetchAllBenches(newFilters);
  },

  componentDidMount() {
    this.benchListener = BenchStore.addListener(this._benchesChanged);
    this.filterListener = FilterParamsStore.addListener(this._filtersChanged);
    const filterParams = FilterParamsStore.params();
    BenchActions.fetchAllBenches(filterParams);
  },

  componentWillUnmount() {
    this.benchListener.remove();
    this.filterListener.remove();
  },

  render() {
    return(
      <div>
        <h5>Click Map to Add Bench!</h5>
        <Map
          benches={this.state.benches}/>
        <div className="half">
          <FilterForm filterParams={this.state.filterParams}/>
          <Index benches={this.state.benches}/>
        </div>
      </div>
    );
  }
});

module.exports = Search;

const React = require('react');
const BenchStore = require('../stores/bench');
const FilterParamsStore = require('../stores/filter_params');
const Link = require('react-router').Link;
const BenchDetail = require('./bench_detail');
const BenchMap = require('./bench_map');
const BenchActions = require('../actions/bench_actions');

const BenchShow = React.createClass({
  getInitialState() {
    const benchId = this.props.params.benchId;
    const bench = BenchStore.find(benchId) || {} ;
    return { bench };
  },

  componentDidMount() {
    this.benchListener = BenchStore.addListener(this._benchChanged);
    const params = FilterParamsStore.params();
    BenchActions.fetchAllBenches(params);
  },

  componentWillUnmount() {
    this.benchListener.remove();
  },

  _benchChanged() {
    const benchId = this.props.params.benchId;
    const bench = BenchStore.find(benchId);
    this.setState({ bench });
  },

  render() {
    const reviewURL = "/benches/" + this.state.bench.id + "/review";
    const benches = {};
    benches[this.state.bench.id] = this.state.bench;
    return (
        <div>
          <Link to="/" >Back to Benches Index</Link>
          <Map className="half"
            singleBench={true}
            benches={benches}
            onMapClick={this.handleMapClick}
            onMarkerClick={this.handleMarkerClick} />
          <BenchDetail bench={this.state.bench} className="half" />
          {
            this.props.children ||
              <Link to={reviewURL}>Leave a Review</Link>
          }
        </div>
      );
  }
});

module.exports = BenchShow;

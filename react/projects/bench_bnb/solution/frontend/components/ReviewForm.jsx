import React from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {hashHistory} from 'react-router';
import ClientActions from '../actions/client_actions';

const ReviewForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState() {
    return { rating: 5, body: "" };
  },

  navigateToBenchShow() {
    const benchUrl = "/benches/" + this.props.params.benchId;
    hashHistory.push(benchUrl);
  },

  handleCancel(event) {
    event.preventDefault();
    this.navigateToBenchShow();
  },

  handleSubmit(event) {
    event.preventDefault();
    const review = Object.assign(
      {},
      this.state,
      { bench_id: this.props.params.benchId }
    );
    ClientActions.createReview(review);
    this.navigateToBenchShow();
  },
  
  render() {
    return (
      <div className="review-form">
        <form onSubmit={this.handleSubmit}>
          <label>Rating</label>
          <br/>
          <input type="number" valueLink={this.linkState('rating')}/>
          <br/>

          <label>Comment</label>
          <br/>
          <textarea
            cols='30'
            rows='10'
            valueLink={this.linkState('body')}></textarea>
          <br/>
          <input type="submit"/>
        </form>
        <button onClick={this.handleCancel}>Cancel</button>
      </div>
    );
 }
});

export default ReviewForm;

import React, { Component } from "react";

export default class Attacks extends Component {
  render() {
    return (
      <div>
        <div class="bg-white rounded shadow-sm p-4 rating-review-select-page">
          <h5 class="mb-4">Leave Comment</h5>
          <p class="mb-2">Rate the Place</p>
          <div class="mb-4">
            <span class="star-rating">
              <a href="#">
                <i class="icofont-ui-rating icofont-2x"></i>
              </a>
              <a href="#">
                <i class="icofont-ui-rating icofont-2x"></i>
              </a>
              <a href="#">
                <i class="icofont-ui-rating icofont-2x"></i>
              </a>
              <a href="#">
                <i class="icofont-ui-rating icofont-2x"></i>
              </a>
              <a href="#">
                <i class="icofont-ui-rating icofont-2x"></i>
              </a>
            </span>
          </div>
          <form>
            <div class="form-group">
              <label>Your Comment</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label>Your Comment</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label>Your Comment</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label>Your Comment</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <label>Your Comment</label>
              <textarea class="form-control"></textarea>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-sm" type="button">
                {" "}
                Submit Comment{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

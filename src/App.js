import React, { Component } from "react";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      lengthofWord: null,
      containeCaractere: null,
      containeNotCaractere: null,
      findWord: null
    };
  }

  filterArrayOfObject(array, filters) {
    let arrayCopy = [...array];
    let selectedFilter = Object.values(filters);
    return arrayCopy.filter((item) =>
      selectedFilter.every((f) => (f !== null ? f(item) : true))
    );
  }

  filter(array) {
    let filters = {
      lengthOfWord:
        this.state.lengthOfWord === null
          ? null
          : (item) => item.length === this.state.lengthofWord,
      containCharacter:
        this.state.containeCaractere === null
          ? null
          : (item) =>
              this.state.containeCaractere.every((e) => item.includes(e)),
      containNotCharacter:
        this.state.containeNotCaractere === null
          ? null
          : (item) =>
              this.state.containeNotCaractere.every((e) => !item.includes(e)),
      compareFindWord:
        this.state.findWord === null
          ? null
          : (item) =>
              new RegExp(`^${this.state.findWord.replace(/_/g, ".")}$`).test(
                item
              )
    };

    return this.filterArrayOfObject(array, filters);
  }

  render() {
    var words = require("an-array-of-french-words");
    var filterArray = this.filter(words);
    return (
      <div>
        <p>Length word</p>
        <input
          value={this.state.startOfword}
          onChange={(v) => {
            this.setState({
              lengthofWord: parseInt(v.target.value),
              findWord: Array.from(
                { length: v.target.value },
                (v, k) => "_"
              ).join("")
            });
          }}
        />
        <p>List of contain character</p>
        <input
          value={this.state.containeCaractereText}
          onChange={(v) => {
            let array = v.target.value.split("");
            this.setState({
              containeCaractere: array,
              containeCaractereText: v.target.value
            });
          }}
        />
        <p>List of contain not character</p>
        <input
          value={this.state.containeNotCaractere}
          onChange={(v) => {
            let array = v.target.value.split("");
            this.setState({
              containeNotCaractere: array,
              containeNotCaractereText: v.target.value
            });
          }}
        />
        <p> Replace _ with your letter</p>
        <input
          value={this.state.findWord}
          onChange={(v) => {
            this.setState({
              findWord: v.target.value
            });
          }}
        />
        {this.state.lengthofWord === null ||
        this.state.lengthofWord === undefined ||
        this.state.lengthofWord.length === 0 ? null : (
          <>
            {filterArray.length}
            {filterArray.map((e) => {
              return <p>{e}</p>;
            })}
          </>
        )}
      </div>
    );
  }
}
export default Products;

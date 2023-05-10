import React from "react"
import PropTypes from "prop-types"
import FruitContainer from "./FruitContainer"

class Main extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div>
          <h1>Fruits Test App</h1> 
          <FruitContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Main

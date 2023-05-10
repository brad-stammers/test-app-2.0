import React from "react"
import PropTypes from "prop-types"
import ShowEditFruitModal from "./ShowEditFruitModal"

class Fruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false, show_visible: false, };
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  showModal = () => {
    this.setState({ show_visible: true, });
  }
  handleCancel = () => {
    this.setState({ show_visible: false, });
  }
  render () {
    return (
      <React.Fragment>
        <td>{this.props.fruit.name}</td>
        <td>{this.props.fruit.desc}</td>
        <td>
          <button onClick={this.showModal} class="ui teal small button">Show</button>
          <button onClick={() => this.props.handleDelete(this.props.fruit.id)}  className="ui small button">Delete</button>
        </td>
        <ShowEditFruitModal visible={this.state.show_visible} handleCancel={this.handleCancel} handleUpdate={this.props.handleUpdate} fruit={this.props.fruit} />
      </React.Fragment>
    );
  }
}

export default Fruit

import React from "react"
import PropTypes from "prop-types"
import { Button, Header, Form, Modal } from "semantic-ui-react"

class ShowEditFruitModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editable: false };
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleEdit(e) {
    e.preventDefault();
    if (this.state.editable) {
      let name = this.name.value;
      let desc = this.desc.value;
      let id = this.props.fruit.id;
      let fruit = { id: id, name: name, desc: desc};
      this.props.handleUpdate(fruit);
      this.props.handleCancel();
    }
    this.setState({ editable: !this.state.editable });
  }
  render () {
    let formFields = {};
    let name = this.state.editable ? <div class="ui input"><input type="text" ref={input => this.name = input} defaultValue={this.props.fruit.name} /></div> : <div class="ui disabled input">{this.props.fruit.name}</div>;
    let desc = this.state.editable ? <div class="ui input"><input type="text" ref={input => this.desc = input} defaultValue={this.props.fruit.desc} /></div> : <div class="ui disabled input">{this.props.fruit.desc}</div>;
    return (
      <React.Fragment>
        <Modal open={this.props.visible} size="small">
          <Header content="Edit Fruit" />
          <Modal.Content>
            <Form onSubmit={this.handleEdit}>
              <div class="field">
                <label>Name</label>
                <div class="seven wide field">
                  {name}
                </div>
              </div>
              <div class="field">
                <label>Description</label>
                <div class="seven wide field">
                  {desc}
                </div>
              </div>
              <Button negative type="button" icon="remove" labelPosition="right" onClick={this.props.handleCancel} content="Cancel" />
              <Button onClick={() => this.handleEdit()} class="ui teal small button" positive type="submit" icon="checkmark" labelPosition="right" content={this.state.editable ? "Save" : "Edit"} />
            </Form>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ShowEditFruitModal

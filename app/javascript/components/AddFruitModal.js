import React from "react"
import PropTypes from "prop-types"
import { Button, Header, Form, Modal } from "semantic-ui-react"

class AddFruitModal extends React.Component {
  render () {
    let formFields = {};
    return (
      <React.Fragment>
        <Modal open={this.props.visible} size="small">
          <Header content="New Fruit" />
          <Modal.Content>
            <Form onSubmit={(e) => {
              this.props.handleFormSubmit(formFields.name.value, formFields.desc.value);
              e.target.reset();
            }}>
              <div class="field">
                <label>Name</label>
                <div class="seven wide field">
                  <div class="ui input"><input type="text" ref={input => formFields.name = input} placeholder="Fruit name" /></div>
                </div>
              </div>
              <div class="field">
                <label>Description</label>
                <div class="seven wide field">
                  <div class="ui input"><input type="text" ref={input => formFields.desc = input} placeholder="Fruit description" /></div>
                </div>
              </div>
              <Button negative type="button" icon="remove" labelPosition="right" onClick={this.props.handleCancel} content="Cancel" />
              <Button positive type="submit" icon="checkmark" labelPosition="right" content="Save" />
            </Form>
          </Modal.Content>
        </Modal>
      </React.Fragment>
    );
  }}

export default AddFruitModal

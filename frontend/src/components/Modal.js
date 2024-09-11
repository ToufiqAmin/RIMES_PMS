import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      errors: {},
    };
    
  }


  handleChange = (e) => {

    e.preventDefault()

    const validationErrors = {}
    if(!this.state.activeItem.name.trim()){
      validationErrors.name = "Name is required"
    }
    if(!this.state.activeItem.price.trim()){
      validationErrors.price = "Price is required"
    }
    if(this.state.activeItem.price < 0){
      validationErrors.price = "Price have to be positive number"
    }


    let { name, value } = e.target;

    const activeItem = { ...this.state.activeItem, [name]: value };
    
    this.setState({ activeItem, errors: validationErrors});

  };
  

  render() {
    const { toggle, onSave } = this.props;
    

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Product Item</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="product-name">Name<span style={{color: "red"}}>*</span></Label>
              <Input
                type="text"
                id="product-name"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Product name"
                required
              />
                {this.state.errors.name && <span>{this.state.errors.name}</span>}
            </FormGroup>
            <FormGroup>
              <Label for="product-description">Description</Label>
              <Input
                type="text"
                id="product-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter Product description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="product-price">Price<span style={{color: "red"}}>*</span></Label>
              <Input
                type="text"
                id="product-price"
                name="price"
                value={this.state.activeItem.price}
                onChange={this.handleChange}
                placeholder="Enter Product Price"
                required
              />
                {this.state.errors.price && <span>{this.state.errors.price}</span>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeItem)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { BsSearch } from 'react-icons/bs';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      productList: [],
      modal: false,
      activeItem: {
        name: "",
        description: "",
        price: "",
      },
      errors:{},
      products:{},
      searchVal:{},
    };
  }


  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/products/")
      .then((res) => this.setState({ productList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSearchClick() {
    if (this.state.searchVal === "") { this.renderItems(); return; }
    const filterBySearch = this.productList.filter((item) => {
        if (item.toLowerCase()
            .includes(this.searchVal.toLowerCase())) { return item; }
    })
    this.setState({products: filterBySearch});
}
1
  handleSubmit = (item) => {
    this.toggle();
    // console.log(item)
    if (item.name === '' || (item.price <= 0 || item.price === '')) {

      alert("Enter Name or Price Correctly")
      return;
    }
    else{
      if(item.id){
        axios
          .put(`/api/products/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
        }
        axios
        .post("/api/products/", item)
        .then((res) => this.refreshList());
      
    }
          
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/products/${item.id}/`)
      .then((res) => this.refreshList());

  };

  createItem = () => {
    const item = { name: "", description: "", price: "" };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  

  renderItems = () => {
    const newItems = this.state.productList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`product-name mr-2 
          `}
          title={item.description}
        >
          {item.name}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-black text-uppercase text-center my-4">Product Management System</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add Product
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {/* <div>
                  <input onChange={e => this.setState({searchVal: e.target.value})}>
                  </input>
                  <BsSearch onClick={this.handleSearchClick} />
                </div>
                <div>
                  {this.products}
                </div> */}
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            errors={this.state.errors}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;

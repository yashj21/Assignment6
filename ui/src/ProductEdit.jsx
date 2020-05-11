import React from 'react';
import { render } from 'react-dom/cjs/react-dom.development';
import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import {
  Button, FormGroup,
  ControlLabel, Form,
} from 'react-bootstrap';

export default class ProductEdit extends React.Component {
    constructor() {
        super();
        this.state = {    product: {}   };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount() {
        this.loadData();
    }
    componentDidUpdate(prevProps) {
      const { match: { params: { id: prevId } } } = prevProps;
      const { match: { params: { id } } } = this.props;
      if (id !== prevId) {
        this.loadData();
      }
    }
    async loadData() {
        const query = `query product($id:Int!) {
          product(id:$id) {
            id productcat productname productprice producturl
          }
        }`;
        const { match: { params: { id } } } = this.props;
        const variables = { id };
        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables }),
        });
        const result = await response.json();
        //const data = await graphQLFetch(query, { id });
        this.setState({ product : result.data.product});
      }
      handleChange(e,naturalValue){
        const { name, value: textValue } = e.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState(prevState => ({
          product: { ...prevState.product, [name]: value },
        }));
        
      }
      async handleSubmit(e) {
        e.preventDefault();
        const { product } = this.state;
        const { id, ...changes } = product;
        const variables = { id, changes };
        const query = `mutation productUpdate($id: Int!, $changes: productUpdateInputs!) {  
          productUpdate(id: $id, changes: $changes) {    
            id productcat productname productprice producturl 
          } 
        }`;
        await fetch(window.ENV.UI_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables }),
        });
        this.loadData();
        alert("Success!");
      }
    
    render(){
        const { product: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
          if (propsId != null) {
            return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
        const { product: { productname, productprice } } = this.state;
        const { product: { producturl, productcat } } = this.state;
        const paddingStyle = { margin: 10 };
        const paddingStyle2 = { margin: 80 };
    return (
        <Form id="test" name="productAdd" onSubmit={this.handleSubmit}>
        <FormGroup>
        <ControlLabel htmlFor="productname" >Product Name</ControlLabel>
        &nbsp;
        <input type="text" name="productname" value={productname} onChange={this.handleChange} />
        &nbsp;
        <ControlLabel htmlFor="productcat">Product Category</ControlLabel>
        <select name="productcat" value={productcat} onChange={this.handleChange}>
        &nbsp;
          <option value="Shirts">Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Accessories">Accessories</option>
        </select>
        </FormGroup>
        <FormGroup>
        <ControlLabel htmlFor="price" >Price Per Unit</ControlLabel>
        &nbsp;
        <NumInput name="productprice" onChange={this.handleChange} value={productprice} style={paddingStyle} />
        &nbsp;
        <ControlLabel htmlFor="url" >Image URL</ControlLabel>
        &nbsp;
        <TextInput name="producturl" value={producturl} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
        <Button bsStyle="primary" type="button">
          Submit change
        </Button>
        </FormGroup>
        {/* <button type="submit">Submit Changes </button> */}
      </Form>
    );
    }
}
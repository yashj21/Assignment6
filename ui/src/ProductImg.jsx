import React from 'react';

export default class ProductImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    product: {}   };
  };
  componentDidMount() {
    this.loadData();
  };
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
};
  render(){
  return (
    <div>
      <br />
      <br />
      <img src={this.state.product.producturl}  style={{width: 500, height: 500}} alt="not found"/>
    </div>
  );
  }
}
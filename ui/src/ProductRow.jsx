//import React from 'react';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';
import { Link, withRouter } from 'react-router-dom';

import {
  Button, Glyphicon, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

//  class ProductRow extends React.Component {
//     render() {
//       const prop = this.props;
//       const borderedStyle = { border: '1px solid silver', padding: 4 };
//       return (
//         <tr>
//           <td style={borderedStyle}>{prop.productname}</td>
//           <td style={borderedStyle}>{prop.productcat}</td>
//           <td style={borderedStyle}>{prop.productprice}</td>
//           <td style={borderedStyle}><Link to={`/img/${prop.producturl}`}>View</Link></td>
//           <td><Link to={`/#/edit/${prop.productid}`}>Edit</Link></td>
//         </tr>
//       );
//     }
//   }
const deleteTooltip = (
  <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
);
const borderedStyle = { border: '1px solid silver', padding: 4 };
const ProductRow  = withRouter(({ product, deleteProduct, index }) => (
  <tr>
             <td style={borderedStyle}>{product.productname}</td>
             <td style={borderedStyle}>{product.productcat}</td>
             <td style={borderedStyle}>${product.productprice}</td>
             {console.log(product.producturl)}
             <td style={borderedStyle}><Link to={`/img/${product.id}`}>View</Link></td>
             <td style={borderedStyle}><Link to={`/edit/${product.id}`}>Edit</Link></td>
             <td style={borderedStyle}>
             <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
             <Button bsStyle="primary" type="button" onClick={() => { deleteProduct(index); }}><Glyphicon glyph="trash" /></Button>
             </OverlayTrigger></td>
           </tr>
));
export default ProductRow;
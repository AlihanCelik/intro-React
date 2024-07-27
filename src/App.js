import { Container, Row, Col } from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import { Component } from 'react';
import alertify from "alertifyjs"
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import CartList from './CartList';
import FormDemo1 from './FormDemo1';
import FormDemo2 from './FormDemo2';



export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  componentDidMount() {
    this.getProduct();
  };
  changeCatgeory = category => {
    this.setState({ currentCategory: category.categoryName });
    this.getProduct(category.id);
  };
  getProduct = categoryId => {
    let url = "http://localhost:3000/products"
    if (categoryId) {
      url += "/?categoryId=" + categoryId;
    }
    fetch(url).then(response => response.json()).then(data => this.setState({ products: data }))
  };
  addToCard = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart })
    alertify.success(product.productName + " added to cart!");
  };
  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
    alertify.error(product.productName + " removed from cart!");
  }

  render() {
    let ProductInfo = { title: "ProductList" };
    let categoryInfo = { title: "CategoryList" };

    return (

      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList changeCategory={this.changeCatgeory}
                currentCategory={this.state.currentCategory} info={categoryInfo}>
              </CategoryList>
            </Col>
            <Col xs="9">
              <Routes>
                <Route path="/" element={
                  <ProductList products={this.state.products} addToCard={this.addToCard}
                    currentCategory={this.state.currentCategory} info={ProductInfo} />
                } />
                <Route path="/cart" element={
                  <CartList cart={this.state.cart} addToCard={this.addToCard}
                    removeFromCart={this.removeFromCart} />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/form1" element={<FormDemo1/>} />
                <Route path="/form2" element={<FormDemo2/>} />
              </Routes>


            </Col>
          </Row>
        </Container>



      </div>
    )
  }
}

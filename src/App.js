import { Container ,Row,Col} from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import { Component } from 'react';


export default class App extends Component {
  state ={currentCategory :"" ,products:[],cart:[]};
  componentDidMount(){
    this.getProduct();
  };
  changeCatgeory=category=>{
    this.setState({currentCategory:category.categoryName});
    this.getProduct(category.id);
  };
  getProduct=categoryId=>{
    let url="http://localhost:3000/products"
    if(categoryId){
      url+="/?categoryId="+categoryId;
    }
    fetch(url).then(response=>response.json()).then(data=>this.setState({products:data}))
  };
  addToCard=(product)=>{
    let newCart=this.state.cart;
    var addedItem=newCart.find(c=>c.product.id===product.id);
    if(addedItem){
      addedItem.quantity+=1;
    }else{
      newCart.push({product:product,quantity:1});
    }
    this.setState({cart:newCart})
  };

  render() {
      let ProductInfo={title :"ProductList"};
      let categoryInfo={title : "CategoryList"};
      
    return (
      
      <div>
      <Container>
          <Navi cart={this.state.cart}/>
        <Row>
          <Col xs="3">
          <CategoryList changeCategory={this.changeCatgeory} 
          currentCategory={this.state.currentCategory} info= {categoryInfo}></CategoryList>
          </Col>
          <Col xs="9">
          <ProductList products={this.state.products} addToCard={this.addToCard}
          currentCategory={this.state.currentCategory} info= {ProductInfo}></ProductList>
          </Col>
        </Row>
      </Container>
    
    

    </div>
    )
  }
}

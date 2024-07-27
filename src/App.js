import { Container ,Row,Col} from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';
import { Component } from 'react';


export default class App extends Component {
  state ={currentCategory :"" ,products:[]};
  componentDidMount(){
    this.getProduct();
  }
  changeCatgeory=category=>{
    this.setState({currentCategory:category.categoryName});
    this.getProduct(category.id);
  }
  getProduct=categoryId=>{
    let url="http://localhost:3000/products"
    if(categoryId){
      url+="/?categoryId="+categoryId;
    }
    fetch(url).then(response=>response.json()).then(data=>this.setState({products:data}))
  }

  render() {
      let ProductInfo={title :"ProductList"};
      let categoryInfo={title : "CategoryList"};
    return (
      
      <div>
      <Container>
        <Row>
          <Navi></Navi>
        </Row>
        <Row>
          <Col xs="3">
          <CategoryList changeCategory={this.changeCatgeory} currentCategory={this.state.currentCategory} info= {categoryInfo}></CategoryList>
          </Col>
          <Col xs="9">
          <ProductList products={this.state.products} currentCategory={this.state.currentCategory} info= {ProductInfo}></ProductList>
          </Col>
        </Row>
      </Container>
    
    

    </div>
    )
  }
}

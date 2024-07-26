
import { Container ,Row,Col} from 'reactstrap';
import CategoryList from './CategoryList';
import Navi from './Navi';
import ProductList from './ProductList';


function App() {
  let categroyTitle="Category List"
  let ProductTitle={title:"Product List",baskabisey:"bisey"}
  return (
    <div className="App">
      <Container>
        <Row>
          <Navi></Navi>
        </Row>
        <Row>
          <Col xs="3">
          <CategoryList title= {categroyTitle}></CategoryList>
          </Col>
          <Col xs="9">
          <ProductList info= {ProductTitle}></ProductList>
          </Col>
        </Row>
      </Container>
    
       
       
    </div>
  );
}

export default App;

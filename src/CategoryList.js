import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default class CategoryList extends Component {
    constructor(props){
         super(props);
         this.state={
            categories:[]
        };
        
        
         
    }
    componentDidMount(){
            this.getCategories();
        }
         
        getCategories= ()=>{
            fetch("http://localhost:3000/categories").then(response=>response.json())
            .then(data=>this.setState({categories:data}));
        }
    
  render() {
    return (
        <div>
            <h2>{this.props.title}</h2>
            <ListGroup>
                {
                    this.state.categories.map(category=>(
                        <ListGroupItem active={category.categoryName===this.props.currentCategory?true:false} 
                        onClick={()=>this.props.changeCategory(category)}
                        key={category.categoryId}>{category.categoryName}</ListGroupItem>
                    ))
                }
                
            </ListGroup>
            <h4>{this.props.currentCategory}</h4>
        </div>
    
    )
  }
}

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
    chanceCatgeory=(category)=>{
        this.setState({currentCategory:category.categoryName})
    }
  render() {
    return (
        <div>
            <h2>{this.props.title}</h2>
            <h3>{this.state.counter}</h3>
            <ListGroup>
                {
                    this.state.categories.map(category=>(
                        <ListGroupItem onClick={()=>this.chanceCatgeory(category)}
                        key={category.categoryId}>{category.categoryName}</ListGroupItem>
                    ))
                }
                
            </ListGroup>
            <h4>{this.state.currentCategory}</h4>
        </div>
    
    )
  }
}

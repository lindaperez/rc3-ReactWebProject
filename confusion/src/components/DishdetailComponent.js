import React,  { Component } from 'react';
import { ListGroup, ListGroupItem, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import moment  from 'moment';


class DishDetail extends Component {

    constructor(props){
        super(props);


    }

    renderDish(dish)  {
        if(dish!=null){
            return (

                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }else{
            console.log("Dish component render is invoked but no dish");
            return(
                <div></div>
            );
        }
    }
    renderComments(comments){
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const comment = comments.map((comment)=>
        {
        return(

            <div>
                {comment.comment}
                <p>--- {comment.author}, {new Date(comment.date).toLocaleDateString('en-US', DATE_OPTIONS) }</p>
                <p> {comment.rating}</p>
            </div>

        )});
        return(
            <div>
                <h4>Comments</h4>
                <ListGroup>
                <div> {comment} </div>
                </ListGroup>
            </div>
        );

    }





    render(){

        console.log("Dish component render is invoked");
        const dish = this.props.dish;
        if(dish!=null){
            const dishcomments = this.renderComments(dish.comments);
            const dishdetail = this.renderDish(dish);

            return (
                <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {dishdetail}
                </div>
                    <div  className="col-12 col-md-5 m-1">
                             {dishcomments}
                    </div>
                </div>
            )
        }else{
            console.log("Dish component render is invoked but no dish");
            return(
                <div></div>
            );
        }
    }

}
export default DishDetail;
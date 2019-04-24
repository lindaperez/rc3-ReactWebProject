import React from 'react';
import { Card, CardImg, CardText, CardBody,
    Breadcrumb,BreadcrumbItem, Button,
    CardTitle, ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';


    function RenderDish({dish})  {
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

   function RenderComments({comments}){
     
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const cc = comments.map((c)=>
        {
        return(

            <div>
                {c.comment}
                <p>--- {c.author}, {new Date(c.date).toLocaleDateString('en-US', DATE_OPTIONS) },
               </p>
                <p> {c.rating}</p>
            </div>

        )});
        return(
            <div>
                <h4>Comments</h4>
                <ListGroup>
                <div> {cc} </div>
                </ListGroup>
                <CommentForm/>


            </div>
        );

    }





const DishDetail = (props) => {


        if(props.dish!=null){
            return (
                <div className="container">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="row">

                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments} />
                        </div>
                    </div>
                </div>
            )
        }else{
            console.log("Dish component render is invoked but no dish");
            return(
                <div></div>
            );
        }


};
export default DishDetail;
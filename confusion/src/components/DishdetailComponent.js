import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, ListGroup } from 'reactstrap';




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
            <div >
                <h4>Comments</h4>
                <ListGroup>
                <div> {cc} </div>
                </ListGroup>
            </div>
        );

    }





const DishDetail = (props) => {


        if(props.dish!=null){
            return (
                <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments}/>
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


}
export default DishDetail;
//import React from 'react';
import { Card, CardImg, CardText, CardBody,
    Breadcrumb,BreadcrumbItem,
    CardTitle, ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
//import CommentForm from './CommentForm';


import  React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import { Control,  LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const invalidMessage = (val) => /^\w+$/.test(val);

class CommentForm extends Component {



    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddComment= this.handleAddComment.bind(this);

    }



    toggleModal(){
        this.setState({
            isModalOpen :!(this.state.isModalOpen)
        });
    }

    handleAddComment(values) {
        this.toggleModal();
        alert("Current State is "+ JSON.stringify(values));
        this.props.addComment(this.props.dishId,values.rating,values.author, values.comment);
    }
    render(){
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> Submit comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddComment(values) }>

                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating"
                                                    name="rating" placeholder="Rating"
                                                    className="form-control"
                                                    defaultValue="5"
                                                    validators={{
                                                        required
                                                    }}
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    <Errors className="text-danger"
                                            model=".rating"
                                            show="touched"
                                            messages={{
                                                required: 'Required.'

                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author"  id="author"
                                                  name="author" placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      required, minLength: minLength(3),
                                                      maxLength:maxLength(15)
                                                  }}
                                    />
                                    <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required. ',
                                                minLength: "Must be greater than 3 characters. ",
                                                maxLength: "Must be 15 characters or less. "

                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment"  id="comment"
                                                      name="comment" placeholder=""
                                                      className="form-control"
                                                      rows="6"
                                                      validators={{
                                                          required, invalidMessage
                                                      }}
                                    />
                                    <Errors className="text-danger"
                                            model=".comment"
                                            show="touched"
                                            messages={{
                                                required: 'Required. ',
                                                invalidMessage: "Invalid Message. ",
                                            }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size:12, offset: 0}}>
                                    <Button type="submit" value="submit"
                                            color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

//export default CommentForm;

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

   function RenderComments({comments, addComment, dishId}){
     
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
                <CommentForm dishID={dishId} addComment={addComment}/>


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
                            <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}/>
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
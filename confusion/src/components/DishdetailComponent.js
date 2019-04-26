//import React from 'react';
import { Card, CardImg, CardText, CardBody,
    Breadcrumb,BreadcrumbItem,
    CardTitle, ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
//import CommentForm from './CommentForm';
import { Loading } from './LoadingComponent';

import  React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import { Control,  LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';




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
        this.handleSubmitComment= this.handleSubmitComment.bind(this);

    }



    toggleModal(){
        this.setState({
            isModalOpen :!(this.state.isModalOpen)
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        alert("Current State is "+ JSON.stringify(values));
        this.props.postComment(this.props.dishId,values.rating,values.author, values.comment);
    }
    render(){
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-edit fa-lg"></span> Submit comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values) }>

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
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            )
        }else{
            console.log("Dish component render is invoked but no dish");
            return(
                <div></div>
            );
        }
    }

   function RenderComments({comments, postComment, dishId}){
     
        const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        const cc = comments.map((c)=>
        {
        return(
        <Stagger in>

                    <Fade in>
                        <li key={c.id}>
                            <p>{c.comment}</p>
                            <p>-- {c.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}</p>
                        </li>
                    </Fade>
           

        </Stagger>


        )});
        return(
            <div>
                <h4>Comments</h4>
                <ListGroup>
                <div> {cc} </div>
                </ListGroup>
                <CommentForm dishId={dishId} postComment={postComment}/>


            </div>
        );

    }





const DishDetail = (props) => {

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>
                        {props.errMess}
                    </h4>
                </div>
            </div>
        )

    } else if (props.dish != null) {
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
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}
                                        postComment={props.postComment}
                                        dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        )
    } else {
        console.log("Dish component render is invoked but no dish");
        return (
            <div></div>
        );
    }


};
export default DishDetail;
/**
 * Created by Roslindapp on 4/23/19.
 */



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
                                                      required, minLength: minLength(2),
                                                      maxLength:maxLength(15)
                                                  }}
                                    />
                                    <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required. ',
                                                minLength: "Must be greater than 2 characters. ",
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

export default CommentForm;
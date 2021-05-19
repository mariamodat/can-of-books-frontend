import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export class UpdateForm extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.props.updateForm(e)}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Book Name</Form.Label>
                        <Form.Control style={{ width: '250px', marginLeft: '650px' }} type="text" placeholder="Enter Book Name" onChange={(e) => { this.props.updateName(e) }} value={this.props.bookName}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control style={{ width: '250px', marginLeft: '650px' }} onChange={(e) => { this.props.updateBookDisc(e) }} type="text" placeholder="Enter Book Description" value={this.props.bookDisc} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Book Status</Form.Label>
                        <Form.Control style={{ width: '250px', marginLeft: '650px' }} onChange={(e) => { this.props.updateBookStatus(e) }} type="text" placeholder="Enter Book Status" value={this.props.bookStatus} />
                    </Form.Group>
                    <br />
                    <Button variant="primary" type="submit">
                        Update Form Data
                      </Button>
                    <hr></hr>
                    
                </Form>
            </div>
        )
    }
}

export default UpdateForm

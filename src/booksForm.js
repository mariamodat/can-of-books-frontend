import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';

export class BooksForm extends Component {
  render() {
    console.log('showwww', this.props.show);
    return (
      <>
        {this.props.show &&



          <div className='form'>
            <Form onSubmit={this.props.formDataFunc}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Name" onChange={(e) => { this.props.updateName(e) }} />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Book Description</Form.Label>
                <Form.Control onChange={(e) => { this.props.updateBookDisc(e) }} type="text" placeholder="Enter Book Description" />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Book Status</Form.Label>
                <Form.Control onChange={(e) => { this.props.updateBookStatus(e) }} type="text" placeholder="Enter Book Status" />
              </Form.Group>
              <br />
              <Button variant="primary" type="submit">
                Submit
                      </Button>
              <hr></hr>
              <Button onClick={this.props.closeForm} variant="primary" type="submit">
                close
                      </Button>
            </Form>
          </div>

        }
      </>
    )
  }
}
export default BooksForm;
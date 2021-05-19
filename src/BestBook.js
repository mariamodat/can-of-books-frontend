import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import BooksForm from './booksForm';
import Button from 'react-bootstrap/Button';
import UpdateForm from './UpdateForm'


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      index: 0,
      bookName: '',
      bookDisc: '',
      bookStatus: '',
      email: '',
      show: false,
      showBestBooks: false,
      showUpdateForm: false,
      server: process.env.REACT_APP_SERVER_URL,
    }

  }

  componentDidMount() {
    this.setState({
      showBestBooks: true,
    });
    this.getBestBooks();
  }

  showFormFunc = () => {
    this.setState({
      show: true,
    })
  }
  closeFormFunc = () => {
    this.setState({
      show: false,
    })
  }

  updateName = (event) => {
    this.setState({
      bookName: event.target.value,

    })
    console.log('the value of the name ', event.target.value);
  }
  updateBookDisc = (e) => this.setState({ bookDisc: e.target.value });
  updateBookStatus = (e) => this.setState({ bookStatus: e.target.value });


  formDataFunc = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0;

    try {

      const bodyData = {
        email: user.email,
        bookName: this.state.bookName,
        bookDisc: this.state.bookDisc,
        bookStatus: this.state.bookStatus

      }
      const books = await axios.post(`${this.state.server}/books`, bodyData);
      this.setState({
        books: books.data,
      })
      console.log('hello from box', this.state.books);

    } catch (error) {
      console.log(error);
    }

  }

  showUpdateForm = (idx) => {

    const newBooksArray = this.state.books.filter((value, index) => {
      return idx === index
    });

    this.setState({
      index: idx,
      bookName: newBooksArray[0].name,
      bookDisc: newBooksArray[0].description,
      bookStatus: newBooksArray[0].status,

      show: true,
    });
  }


  getBestBooks = async () => {
    const { user } = this.props.auth0;

    try {
      const objParam = {
        email: user.email,

      }
      const books = await axios.get(`${this.state.server}/books?email=${user.email}`);
      this.setState({
        books: books.data[1].books,
        showBestBooks: true,
        email: user.email,
      })
      console.log('the books', this.state.books);
    }

    catch (err) {
      console.log(err);
    }

  }


  deleteAddedBook = async (index) => {
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.books.filter((book, idx) => {
      return idx !== index;
    });

    this.setState({
      books: newArrayOfBooks
    });

    const query = {
      email: user.email
    }

    await axios.delete(`${this.state.server}/books/${index}`, { params: query });

  }
  updateForm = async (e) => {
    const { user } = this.props.auth0;

    e.preventDefault();
    const reqBody = {
      email: user.email,
      bookName: this.state.bookName,
      bookDisc: this.state.bookDisc,
      bookStatus: this.state.bookStatus
    }
    const books = await axios.put(`${this.state.server}/books/${this.state.index}`, reqBody);

    this.setState({
      books: books.data
    });

  }
  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
            </p>
          <Button onClick={this.showFormFunc}> Show Books</Button>
          <BooksForm
            show={this.state.show}
            closeForm={this.closeFormFunc}
            updateName={this.updateName}
            updateBookDisc={this.updateBookDisc}
            updateBookStatus={this.updateBookStatus}
            formDataFunc={this.formDataFunc}
            showUpdateForm={this.showUpdateForm}
          />
          <>
            {this.state.show &&
              <UpdateForm
                bookName={this.state.bookName}
                bookDisc={this.state.bookDisc}
                bookStatus={this.state.bookStatus}
                updateForm={this.updateForm}
                updateName={this.updateName}
                updateBookDisc={this.updateBookDisc}
                updateBookStatus={this.updateBookStatus}

              />
            }
          </>
          {this.state.showBestBooks &&
            <>
              {this.state.books.map((data, index) => {
                return (
                  <>
                    <CardColumns>
                      <Card style={{ width: '18rem' }} key={index}>
                        <Card.Body>
                          <Card.Title>Name: {data.name}</Card.Title>
                          <Card.Text>Description: {data.description}</Card.Text>
                          <Card.Text>Status: {data.status}</Card.Text>
                          <Button onClick={() => { this.deleteAddedBook(index) }}>Delete</Button>
                          <Button onClick={() => { this.showUpdateForm(index) }}>Update</Button>

                        </Card.Body>

                      </Card>
                    </CardColumns>

                  </>
                );

              })

              }
            </>
          }
        </Jumbotron>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);


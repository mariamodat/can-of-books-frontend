import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import BooksForm from './booksForm';


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      bookName: '',
      bookDisc: '',
      bookStatus: '',
      email: '',
      show: false,
      showBestBooks: false,
      server: process.env.REACT_APP_SERVER_URL,
    }
    this.getBestBooks();
    // this.formDataFunc();
  }

  componentDidMount() {
    this.setState({
      showBestBooks: true,
    });
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
  updateBookStatus = (e) => this.setState({ BookStatus: e.target.value });


  formDataFunc = async (e) => {
    e.preventDefault();

    try {

      const bodyData = {
        email: this.state.email,
        bookName: this.state.bookName,
        bookDisc: this.state.bookName,
        bookStatus: this.state.bookStatus

      }
      const books = await axios.post(`${this.state.server}/books`, bodyData);
      console.log('these are the new books', books);


    } catch (error) {
      console.log(error);
    }

  }


  getBestBooks = async () => {
    const { user } = this.props.auth0;

    try {
      const objParam = {
        email: user.email,

      }
      const books = await axios.get(`${this.state.server}/books`, { params: objParam });
      this.setState({
        books: books.data[0].books,
        showBestBooks: true,
        email: user.email,
      })

    }

    catch (err) {
      console.log(err);
    }
  }
  render() {
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
            </p>
          <button onClick={this.showFormFunc}> Show Books</button>
          <BooksForm
            show={this.state.show}
            closeForm={this.closeFormFunc}
            updateName={this.updateName}
            updateBookDisc={this.updateBookDisc}
            updateBookStatus={this.updateBookStatus}
            formDataFunc={this.formDataFunc}
          />
          {this.state.showBestBooks &&
            <>

              {this.state.books.map((data) => {
                return (
                  <>
                    <CardColumns>
                      <Card style={{ width: '18rem' }}>
                        <Card.Body>
                          <Card.Title>Name: {data.name}</Card.Title>
                          <Card.Text>Description: {data.description}</Card.Text>
                          <Card.Text>Status: {data.status}</Card.Text>
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


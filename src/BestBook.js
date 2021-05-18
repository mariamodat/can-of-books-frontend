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
  updateBookStatus = (e) => this.setState({ bookStatus: e.target.value });


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
      this.setState ({
        books: books.data
      })


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
          />
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
                          <Button onClick={() => {this.deleteAddedBook(index)}}>Delete</Button>    

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


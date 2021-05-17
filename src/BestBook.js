import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";



class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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
          {this.state.showBestBooks &&
            <>
              {this.state.books.map((data) => {
                return (
                  <>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>Name: {data.name}</Card.Title>
                        <Card.Text>Description: {data.description}</Card.Text>
                        <Card.Text>Status: {data.status}</Card.Text>
                      </Card.Body>
                    </Card>
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


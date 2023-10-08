import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, ListGroup, Container } from "react-bootstrap";

const api = "https://server-main-lcwg.onrender.com/user";

export default function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAllNotes = () => {
    axios
      .get(api)
      .then((response) => {
        return response;
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      });
  };
  useEffect(() => {
    fetchAllNotes();
  }, []);

  const createUser = function () {
    if (name && age && email) {
      axios
        .post(api, {
          name,
          age,
          email,
        })
        .then(function (res) {
          resetForm();
          fetchAllNotes();
          alert("Submitted");
          return res.data;
        })
        .catch(function (error) {
          setErrorMessage("Error: " + error.message);
        });
    } else {
      setErrorMessage("Please fill out all fields.");
    }
  };

  function resetForm() {
    setName("");
    setAge("");
    setEmail("");
  }

  return (
    <Container>
      <Form className="form">
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" onClick={createUser}>
          Create User
        </Button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </Form>

      <div className="card-group">
        {users.map(function ({ _id, name, age, email }) {
          return (
            <div>
              <ListGroup key={_id} className="card">
                <ListGroup.Item>Name: {name}</ListGroup.Item>
                <ListGroup.Item>Age: {age}</ListGroup.Item>
                <ListGroup.Item>Email: {email}</ListGroup.Item>
              </ListGroup>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

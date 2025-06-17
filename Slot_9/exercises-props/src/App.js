import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from "./components/Welcome";
import UserProfile from "./components/UserProfiles";
import NameList from "./components/NameList";
import { Container, Row, Col } from "react-bootstrap";
import StudentCard from "./components/StudentCard";


function App() {
  const userData = { name: "traltb@fe.edu.vn", age: 39 };
  const nameList = ["tralb@fe.edu.vn", "phongtnde180075@fpt.edu.vn"]
  const students = [
    { name: "traltb1@fe.edu.vn", age: 39, avatar: "./images/img1.jpg" },
    { name: "traltb2@fe.edu.vn", age: 40, avatar: "./images/img2.jpg" },
    { name: "traltb3@fe.edu.vn", age: 41, avatar: "./images/img3.jpg" },
  ];
  return (
    <>
      <Welcome name="traltb@fe.edu.vn" />
      <UserProfile user={userData} />
      <NameList names={nameList} s />
      <Container>
        <h1 className="my-4 text-center">Student information</h1>
        <Row>
          {students.map((student, index) => (
             <Col key={index} sm={12} md={4} className="d-flex justify-content-center">
              <StudentCard student={student} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default App;
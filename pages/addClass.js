import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddClassAPI, AddQuestions, AllClassesDetails, AllQuestions, TeacherDetail } from './graphqlAPI';

function AddClass() {
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = React.useState(false);
  const [All_Classes] = useMutation(AllClassesDetails);
  const [Add_Class] = useMutation(AddClassAPI);
  const [Teacher_Detail] = useMutation(TeacherDetail);
  const [showAlert, setShowAlert] = React.useState();
  const [alertBg, setAlertBg] = React.useState();
  const [alertData, setAlertData] = React.useState();
  const [allClasses, setAllClasses] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [startsAt, setStartsAt] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [teacherId, setTeacherId] = React.useState('');

  React.useEffect(() => {
    let gettingUserJWTToken = localStorage.getItem('userJWTToken')
    let gettingMobileNumber = localStorage.getItem('userMobileNumber')
    All_Classes()
      .then(async (res) => {
        Teacher_Detail({
          variables: {
            "mobileNumber": String(gettingMobileNumber)
          },
          context: {
            headers: {
              "Authorization": `Bearer ${gettingUserJWTToken}`
            }
          }
        }
        )
          .then(async (res) => {
            setTeacherId(res.data.teacherByMobileNumber.id)
          })
          .catch(error => {
            setShowAlert(true)
            setAlertBg('danger')
            setAlertData(error?.message)
          });
        setAllClasses(res.data.teachingClasses)
      })
      .catch(error => {
        setShowAlert(true)
        setAlertBg('danger')
        setAlertData(error?.message)
      });
  }, [])

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowAlert(false)
    }, 3000)
  })

  async function formSubmit() {
    let gettingUserJWTToken = localStorage.getItem('userJWTToken')
    Add_Class({
      variables: {
        createTeachingClassInput: {
          teacherId: Number(teacherId),
          title: title,
          startsAt: startsAt,
          description: description,
        },
      },
      context: {
        headers: {
          "Authorization": `Bearer ${gettingUserJWTToken}`
        }
      }
    }).then(async (res) => {
      setShowAlert(true)
      setAlertBg('success')
      setAlertData('Class Saved Successfully')
      handleClose()
      All_Classes({
        context: {
          headers: {
            "Authorization": `Bearer ${gettingUserJWTToken}`
          }
        }
      }).then(async (res) => {
        setAllClasses(res.data.teachingClasses)
      })
        .catch(error => {
          setShowAlert(true)
          setAlertBg('danger')
          setAlertData(error?.message)
        });
    }).catch(error => {
      setShowAlert(true)
      setAlertBg('danger')
      handleClose()
      setAlertData(error?.message)
    });
  }

  return (
    <div className='px-3 mt-3'>
      {showAlert ?
        <Alert variant={alertBg}>
          {alertData}
        </Alert>
        :
        <></>
      }
      <div className="container-lg">
        <div className="text-center">
          <h1 className='my-3'><u>Classes Detail</u></h1>
          <button type="button" className="btn btn-primary mb-5" onClick={handleShow}><b>Add Class</b></button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>StartsAt</th>
            </tr>
          </thead>
          <tbody>
            {allClasses.map((allClasessData, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{allClasessData.title}</td>
                <td>{allClasessData.description}</td>
                <td>
                  {new Date(allClasessData.startsAt).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Label>Class Title</Form.Label>
            <Form.Control required type="text" placeholder="Class Title" className='mb-2' onChange={(e) => setTitle(e.target.value)} />
            <Form.Label>Class Description</Form.Label>
            <Form.Control required className='mb-2' as="textarea" placeholder="Class Description" style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} />
            <Form.Label>StartsAt</Form.Label>
            {/* <Form.Control required type="text" placeholder="StartsAt" className='mb-2' onChange={(e) => setStartsAt(e.target.value)} /> */}
            <input
              type="datetime-local"
              id="datetime"
              name="datetime"
              className='form-control mb-2'
              min={new Date().toISOString().slice(0, -8)}
              onChange={(e) => setStartsAt(e.target.value)}
            />
            <Button variant="primary" className='w-100' onClick={() => formSubmit()}>
              Submit
            </Button>
          </Modal.Body>
          {/* <Modal.Footer>
          </Modal.Footer> */}
        </Modal>
      </div>
    </div>
  );
}

export default AddClass;

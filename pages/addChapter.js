import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useLazyQuery, useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddChapterDetails, AllChapterDetails } from './graphqlAPI';

function AddChapter() {
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = React.useState(false);
    const [Add_chapter] = useMutation(AddChapterDetails);
    const [showAlert, setShowAlert] = React.useState();
    const [alertBg, setAlertBg] = React.useState();
    const [alertData, setAlertData] = React.useState();
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [allChapterDetails] = useLazyQuery(AllChapterDetails);
    const [allChapter, setAllChapter] = React.useState([]);

    const getAllChapters = async () => {
        await allChapterDetails({
            variables: {},
        })
            .then(res => {
                setAllChapter(res.data.chapters);
            })
            .catch(err => console.log('getAllUsers err ==> ', err));
    };

    React.useEffect(() => {
        getAllChapters()
    }, []);

    React.useEffect(() => {
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShowAlert(false)
        }, 3000)
    })

    async function formSubmit() {
        Add_chapter({
            variables: {
                addChaptersArgs: {
                    chapterName: title,
                    chapterDescription: description
                }
            },
        }).then(async (res) => {
            setShowAlert(true)
            setAlertBg('success')
            setAlertData('Chapter Saved Successfully')
            handleClose()
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
                    <h1 className='my-3'><u>Chapter Details</u></h1>
                    <button type="button" className="btn btn-primary mb-5" onClick={handleShow}><b>Add Chapter</b></button>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allChapter.map((allClasessData, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{allClasessData.chapterName}</td>
                                <td>{allClasessData.chapterDescription}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Chapter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Label>Chapter Title</Form.Label>
                        <Form.Control required type="text" placeholder="Chapter Title" className='mb-2' onChange={(e) => setTitle(e.target.value)} />
                        <Form.Label>Chapter Description</Form.Label>
                        <Form.Control required className='mb-2' as="textarea" placeholder="Chapter Description" style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} />
                        <Button variant="primary" className='w-100' onClick={() => formSubmit()}>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default AddChapter;

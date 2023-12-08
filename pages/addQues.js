import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useLazyQuery, useMutation } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AddQuestions, AllChapterDetails, AllQuestions } from './graphqlAPI';

function AddQues() {
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = React.useState(false);
  const [All_Questions] = useMutation(AllQuestions);
  const [Add_Questions] = useMutation(AddQuestions);
  const [showAlert, setShowAlert] = React.useState();
  const [alertBg, setAlertBg] = React.useState();
  const [alertData, setAlertData] = React.useState();
  const [allQuestions, setAllQuestions] = React.useState([]);
  const [mainHeading, setHeading] = React.useState('');
  const [Title, setTitle] = React.useState('');
  const [Description, setDescription] = React.useState('');
  const [Question, setQuestion] = React.useState('');
  const [Option01, setOption01] = React.useState('');
  const [Option02, setOption02] = React.useState('');
  const [Option03, setOption03] = React.useState('');
  const [Option04, setOption04] = React.useState('');
  const [chapterId, setChapterId] = React.useState('');
  const [allChapter, setAllChapter] = React.useState([]);
  const [allChapterDetails] = useLazyQuery(AllChapterDetails);
  const [correctOption, setCorrectOption] = React.useState('');
  const [IsOptionInImageFormate, setIsOptionInImageFormate] = React.useState('');
  const [IsQuestionInMCQsFormate, setIsQuestionInMCQsFormate] = React.useState('');
  const [IsQuestionInInputFormate, setIsQuestionInInputFormate] = React.useState('');
  const [IsQuestionInImageFormate, setIsQuestionInImageFormate] = React.useState('');
  const [IsQuestionInFillUpsFormate, setIsQuestionInFillUpsFormate] = React.useState('');

  React.useEffect(() => {
    All_Questions()
      .then(async (res) => {
        setAllQuestions(res.data.questions)
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

  async function formSubmit() {
    Add_Questions({
      variables: {
        addQuestionArgs: {
          mainHeading: mainHeading,
          Title: Title,
          Description: Description,
          Question: Question,
          Option1: Option01,
          Option2: Option02,
          Option3: Option03,
          Option4: Option04,
          chapterId: Number(chapterId),
          correctAns: correctOption,
          IsOptionInImageFormate: IsOptionInImageFormate,
          IsQuestionInMCQsFormate: IsQuestionInMCQsFormate,
          IsQuestionInInputFormate: IsQuestionInInputFormate,
          IsQuestionInImageFormate: IsQuestionInImageFormate,
          IsQuestionInFillUpsFormate: IsQuestionInFillUpsFormate,
        },
      },
    }).then(async (res) => {
      setShowAlert(true)
      setAlertBg('success')
      setAlertData('Question Saved Successfully')
      handleClose()
      All_Questions().then(async (res) => {
        setAllQuestions(res.data.questions)
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
          <h1 className='my-3'><u>Questions Details</u></h1>
          <button type="button" className="btn btn-primary mb-5" onClick={handleShow}><b>Add Question</b></button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Main Heading</th>
              <th>Title</th>
              <th>Question</th>
              <th>ChapterID</th>
            </tr>
          </thead>
          <tbody>
            {allQuestions.map((allQuestions, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{allQuestions.mainHeading}</td>
                <td>{allQuestions.Title}</td>
                {(allQuestions.IsQuestionInImageFormate === 'true') ?
                  <td><img src={allQuestions.Question} alt="#ImgNotFound" width={100} height={100} /></td>
                  :
                  <td>{allQuestions.Question}</td>
                }
                <td>{allQuestions.chapterId}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Label>Question Heading</Form.Label>
            <Form.Control required type="text" placeholder="Question Heading" className='mb-2' onChange={(e) => setHeading(e.target.value)} />
            <Form.Label>Question Title</Form.Label>
            <Form.Control required type="text" placeholder="Question Title" className='mb-2' onChange={(e) => setTitle(e.target.value)} />
            <Form.Label>Question Description</Form.Label>
            <Form.Control required className='mb-2' as="textarea" placeholder="Question Description" style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} />
            <Form.Label>Question</Form.Label>
            <Form.Control required type="text" placeholder="Question" className='mb-2' onChange={(e) => setQuestion(e.target.value)} />
            <Form.Label>Is Option In Image Formate</Form.Label>
            <div>
              <Form.Check inline label="True" name="group1" type={'radio'} id={`inline-radio-1`} className="mb-2" onClick={() => setIsOptionInImageFormate("true")} />
              <Form.Check inline label="False" name="group1" type={'radio'} id={`inline-radio-2`} className="mb-2" onClick={() => setIsOptionInImageFormate("false")} />
            </div>
            <Form.Label>Is Question In MCQs Formate</Form.Label>
            <div>
              <Form.Check inline label="True" name="group2" type={'radio'} id={`inline-radio-3`} className="mb-2" onClick={() => setIsQuestionInMCQsFormate("true")} />
              <Form.Check inline label="False" name="group2" type={'radio'} id={`inline-radio-4`} className="mb-2" onClick={() => setIsQuestionInMCQsFormate("false")} />
            </div>
            <Form.Label>Is Question In Input Formate</Form.Label>
            <div>
              <Form.Check inline label="True" name="group3" type={'radio'} id={`inline-radio-5`} className="mb-2" onClick={() => setIsQuestionInInputFormate("true")} />
              <Form.Check inline label="False" name="group3" type={'radio'} id={`inline-radio-6`} className="mb-2" onClick={() => setIsQuestionInInputFormate("false")} />
            </div>
            <Form.Label>Is Question In Image Formate</Form.Label>
            <div>
              <Form.Check inline label="True" name="group4" type={'radio'} id={`inline-radio-7`} className="mb-2" onClick={() => setIsQuestionInImageFormate("true")} />
              <Form.Check inline label="False" name="group4" type={'radio'} id={`inline-radio-8`} className="mb-2" onClick={() => setIsQuestionInImageFormate("false")} />
            </div>
            <Form.Label>Is Question In Fill Ups Formate</Form.Label>
            <div>
              <Form.Check inline label="True" name="group5" type={'radio'} id={`inline-radio-9`} className="mb-2" onClick={() => setIsQuestionInFillUpsFormate("true")} />
              <Form.Check inline label="False" name="group5" type={'radio'} id={`inline-radio-10`} className="mb-2" onClick={() => setIsQuestionInFillUpsFormate("false")} />
            </div>
            <Form.Label>Option 01</Form.Label>
            <Form.Control required type="text" placeholder="Option 01" className='mb-2' onChange={(e) => setOption01(e.target.value)} />
            <Form.Label>Option 02</Form.Label>
            <Form.Control required type="text" placeholder="Option 02" className='mb-2' onChange={(e) => setOption02(e.target.value)} />
            <Form.Label>Option 03</Form.Label>
            <Form.Control required type="text" placeholder="Option 03" className='mb-2' onChange={(e) => setOption03(e.target.value)} />
            <Form.Label>Option 04</Form.Label>
            <Form.Control required type="text" placeholder="Option 04" className='mb-2' onChange={(e) => setOption04(e.target.value)} />
            <Form.Label>Correct Option</Form.Label>
            <Form.Control required type="text" placeholder="Correct Option" className='mb-2' onChange={(e) => setCorrectOption(e.target.value)} />
            <Form.Label>Chapter Id</Form.Label>
            {/* <Form.Control required type="text" placeholder="Chapter Id" className='mb-2' onChange={(e) => setChapterId(e.target.value)} /> */}
            <select className='form-control' onChange={(e) => setChapterId(e.target.value)} value={chapterId} required style={{ width: "100%" }}>
              {allChapter.map((allChapter, i) => {
                return (
                  <option key={allChapter.id} value={allChapter.id}>
                    {allChapter.chapterName}
                  </option>
                );
              })}
              ;
            </select>
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

export default AddQues;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoDocumentsOutline, IoBulbOutline } from 'react-icons/io5';
import { projectStore, storeSelectedProject } from '../../reducers/projectReducer.js';
import { useToast } from '../../hooks/useToast.jsx';
import { CustomAlert } from '../../components/Alert/CustomAlert.jsx';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { ImageGenerator } from '../../components/ImageGenerator/ImageGenerator';
import './Projects.scss';

const NewProject = () => {
  const [error, setError] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [nextButton, setNextButton] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!showAlert) {
      setError('');
    }
    if (error !== '') {
      setShowAlert(true);
    }
  }, [showAlert, error]);

  const createNewProject = async (e: Event): Promise<void> => {
    e.preventDefault();
    const form: HTMLFormElement = e.target;
    const formData: FormData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const projectName: FormDataEntryValue = formJson.title;
    const projectDescription: FormDataEntryValue = formJson.description;

    if (projectName !== '' && projectDescription !== '') {
      const { uid } = currentUser;
      try {
        const { id: projectId } = await addDoc(collection(db, `users/${uid}/projects/`), {
          projectName,
          projectDescription,
        });

        const date: Date = new Date();
        const projectCreationTimestamp = date.toLocaleString('en-EN', { timeZone: 'UTC' });

        projectStore.dispatch(
          storeSelectedProject({ projectId, projectCreationTimestamp, projectName, projectDescription }),
        );
        setNextButton(true);
        toast.success('Your project was created successfully!');
      } catch (e) {
        toast.error(`Error creating project: ${e}`);
      }
    } else {
      setError('Please provide the name and description of the project');
    }
  };

  return (
    <div className="newProject">
      <Container>
        <Row>
          <Col className="border border-primary position-relative">
            <ImageGenerator />
          </Col>
          <Col>
            <Form onSubmit={createNewProject} className="d-flex flex-column gap-4">
              <InputGroup>
                <InputGroup.Text className="text-bg-primary border border-primary">Title</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Project title"
                  name="title"
                  size="lg"
                  className="border border-primary text-primary"
                />
              </InputGroup>
              <Form.Group className="w-100">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  rows={5}
                  name="description"
                  size="lg"
                  className="border border-primary text-primary"
                />
              </Form.Group>
              <div className="btn-group w-100">
                <Button
                  variant="outline-primary"
                  size="lg"
                  type="button"
                  className="w-50"
                  onClick={() => navigate('/projects')}
                >
                  <IoDocumentsOutline /> All Projects
                </Button>
                <Button variant="primary" size="lg" type="submit" disabled={nextButton} className="w-50">
                  Create New Project
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  type="button"
                  disabled={!nextButton}
                  className="w-50"
                  onClick={() => navigate('/')}
                >
                  <IoBulbOutline /> New Project
                </Button>
              </div>
            </Form>
            {error && (
              <div className="mt-4">
                <CustomAlert
                  message={error}
                  variant="warning"
                  show={showAlert}
                  setShowAlert={() => setShowAlert(false)}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export { NewProject };

import { useNavigate } from 'react-router-dom';
import { CustomCard } from '../../components/CustomCard/CustomCard';
import { projectsList } from './list';
import './Projects.scss';

const Projects = () => {
  const navigate = useNavigate();

  const chooseProject = (name: string) => {
    if (name === '') {
      navigate('/projects/new');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="projects">
      <div className="projects__list">
        {projectsList.map(({ placeholder, name, buttonText }) => (
          <CustomCard
            key={name}
            placeholder={placeholder}
            name={name}
            buttonText={buttonText}
            onClick={(name: string) => chooseProject(name)}
          />
        ))}
      </div>
    </div>
  );
};

export { Projects };

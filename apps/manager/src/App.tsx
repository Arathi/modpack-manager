import { useEffect, useState } from 'react';
import axios from "axios";

import type { Project } from "./domains/project";
import ProjectView from './components/project-view';

import "./App.less";

const App = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const projectCards = projects.map((project) => {
    return <ProjectView key={project.id} project={project} />
  });

  return (
    <div className="content">
      { projectCards }
    </div>
  );
};

export default App;

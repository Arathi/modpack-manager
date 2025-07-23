import { useEffect, useState } from 'react';
import type { Project } from "./domains/project";
import ProjectView from './components/project-view';
import axios from "axios";

const App = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const projectCards = projects.map((project) => {
    return <ProjectView key={project.id} project={project} />
  });

  useEffect(() => {
    const url = "https://www.curseforge.com/api/v1/mods/search?gameId=432&index=0&classId=6&pageSize=20&sortField=2";
    axios.get<CurseForgeResponse<CurseForgeProject[]>>(url, {
      proxy: {
        host: "127.0.0.1",
        port: 8118,
        protocol: "http",
      },
    }).then((resp) => {
      console.info("search mods: ", resp.data);
      const { data: mods } = resp.data;
      const projects = mods.map((mod) => ({
        id: mod.id,
        name: mod.name,
        slug: mod.slug,
        description: mod.summary,
        author: {
          id: mod.author.id,
          name: mod.author.name,
        },
        avatar: mod.avatarUrl,
        categories: mod.categories.map((category) => ({
          id: category.id,
          name: category.name,
          icon: category.iconUrl,
          slug: category.slug,
        })),
        createAt: mod.creationDate,
        updateAt: mod.updateDate,
      } satisfies Project));
      console.info("projects = ", projects);
      setProjects(projects);
    });
  }, []);
  
  return (
    <div className="content">
      { projectCards }
    </div>
  );
};

export default App;

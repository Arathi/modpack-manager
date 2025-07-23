import type { Project } from "../../domains/project";

const ProjectView: React.FC<{
  project: Project
}> = ({ project }) => {
  const { author, name, avatar, description } = project;
  const categoryViews = project.categories.map((category) => (
    <div key={category.id}>
      <img src={category.icon} alt={`category ${category.name}`} width={32} height={32} />
    </div>
  ));
  
  return (
    <div className="project-view">
      <div className="upper">
        <div className="avatar">
          <img src={avatar} alt={`${name} avatar`} width={128} height={128} />
        </div>
        <div>
          <div className="names">
            <span>{author.name}</span>
            <span> / </span>
            <span>{name}</span>
          </div>
          <div className="description">{ description }</div>
        </div>
      </div>
      <div className="categories">
        { categoryViews }
      </div>
    </div>
  );
}

export default ProjectView;

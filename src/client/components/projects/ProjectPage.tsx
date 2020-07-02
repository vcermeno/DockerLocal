import React, { useState, useEffect } from "react";

import AddRepos from "../addRepos/AddRepos";
import { Project, User, ProjectPageProps, Repo } from "../../../types/types";
import ProjectRepoListItem from "./ProjectRepoListItem";
import ComposeFileModal from "./ComposeFileModal";
import { findActiveProject } from "../../helpers/projectHelper";
import { getUsernameAndToken } from "../../helpers/cookieClientHelper";

const ProjectPage: React.FC<ProjectPageProps> = ({
  activeProject,
  userInfo,
  projectList,
  setProjectList,
}) => {
  const [showAddRepos, setShowAddRepos] = useState(false);
  const [projectRepoListItems, setprojectRepoListItems] = useState([]);

  //set state compose file modal
  const [showComposeModal, setShowComposeModal] = useState(false);

  // populate repo list items when active project changes and when request from home.tsx comes back to update project list
  useEffect(() => {
    const currentProject = projectList.find(
      (project) => project.projectId === activeProject
    );
    if (currentProject) {
      const newList = currentProject.projectRepos.map((repo) => {
        return (
          <ProjectRepoListItem
            key={`ProjectRepoListItem ${repo.repoId}`}
            {...{ repo, activeProject, projectList, setProjectList }}
          />
        );
      });
      setprojectRepoListItems(newList);
    }
  }, [activeProject, projectList]);

  const cloneRepos = async () => {
    const currentActiveProject: Project = findActiveProject(projectList, activeProject);

    const reposToClone = currentActiveProject.projectRepos.filter(({ isIncluded }) => isIncluded)

    const { username, accessToken } = await getUsernameAndToken();

    const body = JSON.stringify({
      username: username,
      accessToken: accessToken,
      repos: reposToClone,
    });

    console.log(username, " decrypte", accessToken);
    fetch("http://localhost:3001/api/clonerepos", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log("success", res))
      .catch((err) => console.log("fail", err));
  };

  return (
    <div>
      <div>Select your repositories: </div>
      <button
        className="button is-primary is-large"
        onClick={(): void => setShowAddRepos(true)}
      >
        Add Repositories
      </button>
      <button
        className="button is-link"
        onClick={(): Promise<void> => cloneRepos()}
      >
        Clone Repos
      </button>

      <button
        className="button is-link"
        onClick={(): void => setShowComposeModal(!showComposeModal)}
      >
        Compose File
      </button>

      {projectRepoListItems}

      {/* shows this element if showAddRepos is true */}
      {showAddRepos && (
        <AddRepos
          {...{
            showAddRepos,
            setShowAddRepos,
            activeProject,
            projectList,
            setProjectList,
          }}
        />
      )}

      {showComposeModal && (
        <ComposeFileModal {...{ showComposeModal, setShowComposeModal }} />
      )}
    </div>
  );
};

export default ProjectPage;

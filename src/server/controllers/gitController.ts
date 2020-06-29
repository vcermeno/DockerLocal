export {};

const exec = require("child_process").execFile;

import { Request, Response, NextFunction } from "express";

const gitController: any = {};

function execShellCommand(shellCommand: string, args: Array<string>) {
  return new Promise((resolve, reject) => {
    exec(
      shellCommand,
      args,
      (error: string, stdout: string, stderr: string) => {
        if (error) {
          console.warn(error);
        }
        resolve(stdout ? stdout : stderr);
      }
    );
  });
}

gitController.cloneRepo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, repos } = res.locals;

  // TODO: add repoName from res.locals
  const repoName = repos[1].name;

  // shell script clones github repo using SSH connection
  const shellCommand = "/home/katty/Code/DockerLocal/src/scripts/cloneRepo.sh";

  await execShellCommand(shellCommand, [username, repoName]);

  return next();
};

module.exports = gitController;

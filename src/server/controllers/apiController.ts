export { };
const fetch = require('node-fetch').default;
import { Request, Response, NextFunction } from 'express';

const apiController: any = {};

apiController.getUserRepos = async (req: Request, res: Response, next: NextFunction) => {
  console.log('GET_USER_REPOS - api');

  const { accessToken } = res.locals;
  const { username } = res.locals;

  const url = `https://api.github.com/user/repos`;
  const response = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const body = await response.json();
  res.locals.repos = [];
  for(let repo of body){
    res.locals.repos.push({name: repo.name, url: repo.url});
  }

  return next();
};


module.exports = apiController;
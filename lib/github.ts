import _ = require('lodash');

import {Promise} from 'es6-promise';

export interface GithubRepo {
  name: string,
  url: string
}

export interface GithubEvent {
  repo: GithubRepo
}

export function getEvents(username: string): Promise<GithubEvent[]> {
  let req = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    req.open('GET', 'https://api.github.com/users/' + username + '/events');
    req.onload = () => {
      if (req.status !== 200) {
        return reject(new Error("Got HTTP " + req.status));
      }
      let events = JSON.parse(req.responseText);
      resolve(events as GithubEvent[]);
    };
    req.onerror = () => {
      reject(new Error("An error occurred"));
    };
    req.send(null);
  });
}

export function getUniqueRepos(events: GithubEvent[]): GithubRepo[] {
  let repos = events.map(event => {
    return event.repo;
  });

  return _.uniqBy(repos, repo => repo.name);
}

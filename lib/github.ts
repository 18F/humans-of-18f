import {Promise} from 'es6-promise';

export interface GithubEvent {
  repo: {
    name: string,
    url: string
  }
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

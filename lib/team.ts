import {Promise} from 'es6-promise';

const TEAM_URL = 'team.json';

export interface TeamMember {
  full_name: String,
  image: String,
  github: String,
  location?: String,
  bio?: String,
  // These dates are formatted as YYYY-MM-DD.
  start_date: String,
  end_date: String
}

export function get(): Promise<TeamMember[]> {
  let req = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    req.open('GET', TEAM_URL);
    req.onload = () => {
      if (req.status !== 200) {
        return reject(new Error("Got HTTP " + req.status));
      }

      let members = JSON.parse(req.responseText).results as TeamMember[];

      members = members.filter(member => {
        // TODO: Filter out users who are no longer at 18F, if any exist.

        return !!member.github;
      }).map(member => {
        // http://stackoverflow.com/a/36380674
        member.image = 'https://github.com/' + member.github + '.png';

        return member;
      });

      resolve(members);
    };
    req.onerror = () => {
      reject(new Error("An error occurred"));
    };
    req.send(null);
  });
}

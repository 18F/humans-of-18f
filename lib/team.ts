import {Promise} from 'es6-promise';

const TEAM_URL = 'team.json';

export interface TeamMember {
  full_name: string,
  image: string,
  github: string,
  location?: string,
  bio?: string,
  start_date: Date,
  end_date?: Date
}

export function get(): Promise<TeamMember[]> {
  let req = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    req.open('GET', TEAM_URL);
    req.onload = () => {
      if (req.status !== 200) {
        return reject(new Error("Got HTTP " + req.status));
      }

      let members = JSON.parse(req.responseText).results;
      let now = new Date();

      members = members.filter(member => {
        return !!member.github;
      }).map(member => {
        // http://stackoverflow.com/a/36380674
        member.image = 'https://github.com/' + member.github + '.png';

        // These dates are formatted as YYYY-MM-DD (ISO 8601 dates).
        member.start_date = Date.parse(member.start_date);

        if (member.end_date) {
          // http://stackoverflow.com/a/22914738
          member.end_date = new Date(member.end_date);
        }

        return member;
      }).filter((member: TeamMember) => {
        let has_left = member.end_date && member.end_date < now;

        if (has_left) {
          console.log(member.full_name + " left on " + member.end_date);
        }

        // TODO: This seems inaccurate/out of date so we'll disable for now.
        // return !has_left;
        return true;
      });

      resolve(members);
    };
    req.onerror = () => {
      reject(new Error("An error occurred"));
    };
    req.send(null);
  });
}

import {Promise} from 'es6-promise';

const TEAM_URL = 'team.json';
const MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

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
      let severalWeeksAgo = Date.now() - MS_PER_WEEK * 8;

      members = members.filter(member => {
        return !!member.github;
      }).map(member => {
        // http://stackoverflow.com/a/36380674
        member.image = 'https://github.com/' + member.github + '.png';

        // These dates are formatted as YYYY-MM-DD (ISO 8601 dates).
        member.start_date = new Date(member.start_date);

        if (member.end_date) {
          // http://stackoverflow.com/a/22914738
          member.end_date = new Date(member.end_date);
        }

        return member;
      }).filter((member: TeamMember) => {
        if (!member.end_date) {
          return true;
        }

        // We'll only filter out folks who have left several weeks ago,
        // b/c sometimes 18F'ers have re-upped their employment but the
        // Team API hasn't been updated to reflect it yet.
        let has_left = member.end_date.getTime() < severalWeeksAgo;

        if (has_left) {
          console.log(member.full_name + " left on " + member.end_date);
        }

        return !has_left;
      });

      resolve(members);
    };
    req.onerror = () => {
      reject(new Error("An error occurred"));
    };
    req.send(null);
  });
}

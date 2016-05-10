import {Promise} from 'es6-promise';

// TODO: This might actually be at
// https://team-api.18f.gov/public/api/team/. Note that it doesn't
// have direct links to avatars, but does contain github username info,
// so we can potentially ask github for their avatar...

const BASE_URL = 'https://18f.gsa.gov/hub/';
const TEAM_URL = BASE_URL + 'api/team/';
const NO_IMG = BASE_URL + 'assets/images/team/logo-18f.jpg';

export interface TeamMember {
  full_name: String,
  image: String,
  location?: String,
  bio?: String,
  working_groups?: String[],
  projects?: String[],
  skills?: String[],
  interests?: String[]
}

export function get(): Promise<TeamMember[]> {
  let req = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    req.open('GET', TEAM_URL);
    req.onload = () => {
      if (req.status !== 200) {
        return reject(new Error("Got HTTP " + req.status));
      }

      let team = JSON.parse(req.responseText);

      let members = Object.keys(team).map((name) => {
        let member = team[name] as TeamMember;

        member.image = BASE_URL + member.image;

        return member;
      }).filter((member) => {
        return member.image !== NO_IMG;
      });

      resolve(members);
    };
    req.onerror = () => {
      reject(new Error("An error occurred"));
    };
    req.send(null);
  });
}

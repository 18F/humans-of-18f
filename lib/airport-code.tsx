import React = require('react');

export default function AirportCode(props: {airport: string}) {
  return (
    <a href={"https://duckduckgo.com/?q=" +
      encodeURIComponent(props.airport) +
      "+airport&ia=about"}
      target="_blank">
      {props.airport}
    </a>
  );
}

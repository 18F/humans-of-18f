import React = require('react');

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export default function FriendlyDate(props: { date: Date }) {
  let date = props.date;
  let content = MONTHS[date.getMonth()] + " " + date.getFullYear();

  return (
    <span>{content}</span>
  );
}

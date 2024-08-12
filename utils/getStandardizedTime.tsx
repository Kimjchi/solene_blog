import moment from "moment";

export function getHowLongAgo(date: string) {
  const momentDate = moment(date);
  if (-momentDate.diff(Date.now(), "seconds", true) < 60)
    return `Il y a ${-momentDate.diff(Date.now(), "seconds")} seconde(s)`;
  else if (-momentDate.diff(Date.now(), "minutes", true) < 60)
    return `Il y a ${-momentDate.diff(Date.now(), "minutes")} minute(s)`;
  else if (-momentDate.diff(Date.now(), "hours", true) < 24)
    return `Il y a ${-momentDate.diff(Date.now(), "hours")} heure(s)`;
  else if (-momentDate.diff(Date.now(), "days", true) < 30)
    return `Il y a ${-momentDate.diff(Date.now(), "days")} jour(s)`;
  else if (-momentDate.diff(Date.now(), "months", true) < 12)
    return `Il y a ${-momentDate.diff(Date.now(), "months")} mois`;
  else return `Il y a ${-momentDate.diff(Date.now(), "years")} ans`;
}

import moment from "moment";
import momentTZ from "moment-timezone";

export function toTimezone(time, zone, format = "YYYY/MM/DD HH:mm:ss ZZ") {
  return moment(time, format).tz(zone).format(format);
}

export function getCurrentDateTime() {
  return moment().toISOString();
}

export function getCurrentTimezone() {
  return momentTZ.tz.guess();
}

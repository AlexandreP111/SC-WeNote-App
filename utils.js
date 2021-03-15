/**
 * This file defines some random and simple utility functions that are needed
 * throughout the whole project.
 */

// Converts a Unix timestamp to a readable format:
// dd/mm/yyyy hh:mm
export function time_to_readable(time)
{
    let date = new Date(time);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let mins = date.getMinutes();

    let str = "" + (day>9 ? '' : '0') + day + "/" + (month>9 ? '' : '0') + month + "/" +
                year + " " + (hours>9 ? '' : '0') + hours + ":" + (mins>9 ? '' : '0') + mins;

    return str;
}

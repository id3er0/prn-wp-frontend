/**
 * Trim string
 * @param t
 * @returns {String}
 */
export default function trimString(t) {
  return `${t}`.replace(/[^а-яА-Яa-zA-Z0-9]/g, '').toLowerCase();
}

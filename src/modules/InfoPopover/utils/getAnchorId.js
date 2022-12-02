// Anchor ID must start with a non-digit character!
// https://stackoverflow.com/questions/37270787/uncaught-syntaxerror-failed-to-execute-queryselector-on-document
export default function getAnchorId(id) {
  return `anchor-id-${id}`;
}

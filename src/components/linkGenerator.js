export default function linkGenerator(rowLink) {
  let finalLink;
  if (rowLink == null) {
    return rowLink;
  }
  const index = rowLink.indexOf('.');
  if (index === -1) {
    finalLink = `http://${window.location.host}/${rowLink}`;
  } else {
    finalLink = rowLink;
  }
  return finalLink;
}

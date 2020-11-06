export default (string, delimiter=" ", joint=" ") => {
  if (string) {
    return string.split(delimiter)
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(joint)
  }
}

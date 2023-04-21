export default (data, type) => {
  const parser = new DOMParser();
  return parser.parseFromString(data, type);
};

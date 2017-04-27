module.exports = suffix => {
  const {URL, PORT, DEVELOPMENT} = process.env;
  return `${URL}${DEVELOPMENT === `true` ? `:${PORT}` : ``}${suffix}`;
};

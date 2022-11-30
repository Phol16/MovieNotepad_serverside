const movieFieldValidation = (request, response, next) => {
  const { title, imdbId, genre, posterURL } = request.body;

  if (!title || !imdbId || !genre || !posterURL) {
    return response.status(400).json({ error: 'Missing Input' });
  }

  next();
};

export default movieFieldValidation;

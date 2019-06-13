const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const resultQuery = Artist
    .find(buildQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);
  const countQuery = Artist.estimatedDocumentCount();
  return Promise.all([countQuery, resultQuery])
    .then(result => ({ offset, limit, count: result[0], all: result[1] }));
};


const buildQuery = (criteria) => {
  const query = {
    ...(criteria.name ? { $text: { $search: criteria.name } } : {}),
    ...(criteria.age
      ? {
        age: {
          $gte: criteria.age.min,
          $lte: criteria.age.max
        }
      }
      : {}
    ),
    ...(criteria.yearsActive
      ? {
        yearsActive: {
          $gte: criteria.yearsActive.min,
          $lte: criteria.yearsActive.max
        }
      }
      : {}
    ),
  };

  console.log(query);
  return query;
};

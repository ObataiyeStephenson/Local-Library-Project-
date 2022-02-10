function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  //
  return books.reduce((total, book) => {
    book.borrows.filter((copy) => (copy.returned === false ? total++ : null));
    return total;
  }, 0);
}

function getMostCommonGenres(books) {
  let genreCount = {};
  books.forEach((book) => {
    if (genreCount[book.genre]) {
      genreCount[book.genre]++;
    } else {
      genreCount[book.genre] = 1;
    }
  });
  let genreArray = [];
  for (let key in genreCount) {
    let value = genreCount[key];
    genreArray.push({
      name: key,
      count: value,
    });
  }
  genreArray.sort((a, b) => b.count - a.count);
  let results = genreArray.slice(0, 5);
  return results;
}

function getMostPopularBooks(books) {
  return books
    .sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length)
    .slice(0, 5)
    .map((book) => ({ name: book.title, count: book.borrows.length }));
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  books.forEach((book) => {
    authors.forEach((author) => {
      if (book.authorId === author.id) {
        popularAuthors.push({
          name: `${author.name.first} ${author.name.last}`,
          count: book.borrows.length,
        });
      }
    });
  });
  popularAuthors.sort((a, b) => b.count - a.count);
  let popularAuthorsReturn = popularAuthors.slice(0, 5);
  return popularAuthorsReturn;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

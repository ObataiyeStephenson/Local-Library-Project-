function _accountBorrows(account, books) {
  return books.filter((book) => {
    for (let copy of book.borrows) {
      if (copy.id === account.id) {
        return book;
      }
    }
  });
}

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((account, next) =>
    account.name.last.toLowerCase() < next.name.last.toLowerCase() ? -1 : 1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return _accountBorrows(account, books).length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let totalBorrowed = [];
  books.forEach((book) => {
    book.borrows.forEach((borrowed) => {
      if (borrowed.id === account.id && borrowed.returned === false) {
        totalBorrowed.push(book);
      }
    });
  });
  totalBorrowed.forEach((bookBorrowed) => {
    authors.forEach((author) => {
      if (author.id === bookBorrowed.authorId) {
        bookBorrowed["author"] = author;
      }
    });
  });
  return totalBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactAspBooks.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ReactAspBooks.Services
{
	public class BookService : IBookService
	{
		private readonly CrudBookContext _db;

		public BookService(CrudBookContext db)
		{
			_db = db;
            if (!_db.Books.Any())
            {
                _db.Books.Add(new Books { Id = 1, bookName = "Book 1", authorName = "Author 1" });
                _db.Books.Add(new Books { Id = 2, bookName = "Book 2", authorName = "Author 2" });
                _db.SaveChanges();
            }
        }

        public List<Books> GetAllBooks()
		{
			try
			{
				var books = _db.Books.ToList();

				return books;//_db.Books.ToList();
			}
			catch
			{ throw; }
		}

		//To Add new book record
		public Books CreateBook(Books book)
		{
			try
			{
				var newbook = new Books();
				newbook.Id = _db.Books.Count() + 1;
				newbook.bookName = book.bookName;
				newbook.authorName = book.authorName;

				_db.Books.Add(newbook);
				_db.SaveChanges();
				return newbook;
			}
			catch
			{ throw; }
		}

		//Get the details of a particular book
		public Books GetBookInfo(int id)
		{
			try
			{
				Books book = _db.Books.Find(id);
				return book;
			}
			catch
			{ throw; }
		}

		//To Delete the record of a particular book
		public Books DeleteBook(int id)
		{
			try 
			{
				Books book = _db.Books.Find(id);
				_db.Books.Remove(book);
				_db.SaveChanges();
				return book;
			}
			catch
			{
				throw;
			}
		}
	}
}

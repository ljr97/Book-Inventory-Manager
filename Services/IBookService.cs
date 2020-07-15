using ReactAspBooks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactAspBooks.Services
{
	public interface IBookService
	{
		List<Books> GetAllBooks();
		Books CreateBook(Books book);
		Books DeleteBook(int id);
		Books GetBookInfo(int id);
	}
}

import mongoose from "mongoose";
import db from "./db.js";
import Book from "./models/Book.js";

const books = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
];


// task 1
const insertBooks = async () => {
	await db();
	await Book.deleteMany({}); // Clear existing documents
	await Book.insertMany(books);
	console.log("Books inserted successfully");
	db.disconnect();
}
// insertBooks();

// task 2
const findAdventureBooks = async () =>{
try {
	await db();
	const adventureBooks = await Book.find({ genre: 'Adventure' });
	console.log("Adventure Books:", adventureBooks);
} catch (error) {
	console.error("Error finding books:", error);
}
}
findAdventureBooks();

const findBooksPublishedAfter = async (year) => {
  try {
    await db();
    const books = await Book.find({ published_year: { $gt: year } });
    console.log(`Books published after ${year}:`, books);
  } catch (error) {
    console.error("Error finding books:", error);
  }
};


findBooksPublishedAfter(1851);


const findBooksByAuthor = async (author) => {
  try {
	await db();
	const books = await Book.find({ author });
	console.log(`Books by ${author}:`, books);
  } catch (error) {
	console.error("Error finding books:", error);
  }
};

findBooksByAuthor("George Orwell");



const updateBookPrice = async (title, newPrice) =>{
	try {
		await db();
		const result = await Book.updateOne({title}, {$set: {price: newPrice}});
		console.log(`Updated ${result.modifiedCount} document(s)`);
	} catch (error) {
		console.error("Error updating book price:", error);
	}
}

updateBookPrice("The Great Gatsby", 15.99);



const deleteBookByTitle = async (title) => {
	try {
		await db();
		const result = await Book.deleteOne({title});
		console.log(`Deleted ${result.deletedCount} document(s)`);
	} catch (error) {
		console.error("Error deleting book:", error);
	}
}

deleteBookByTitle("The Alchemist");




// task 3 advanced filter

const findBooksInStockPublishedAfter = async () => {
  try {
	await db();
	const books = await Book.find({ in_stock: true, published_year: { $gt: 2010 } });
	console.log(`Books in stock published after 2010:`, books);
  } catch (error) {
	console.error("Error finding books:", error);
  }
};

findBooksInStockPublishedAfter();


const findBooksWithProjection = async () => {
  try {
	await db();
	const books = await Book.find({}, { title: 1, author: 1, price: 1, _id: 0 });
	console.log("Books with Projection (title, author, and price only):", books);
  } catch (error) {
	console.error("Error finding books:", error);
  }
};

findBooksWithProjection();



const displayBooksByPriceAscending = async () =>{
	try {
		await db();
		const books = await Book.find({}).sort({ price: 1 });
		console.log("Books sorted by price (ascending):", books);
	} catch (error) {
		console.error("Error finding books:", error);
	}
}

displayBooksByPriceAscending();

const displayBooksByPriceDescending = async () =>{
	try {
		await db();
		const books = await Book.find({}).sort({ price: -1 });
		console.log("Books sorted by price (descending):", books);
	} catch (error) {
		console.error("Error finding books:", error);
	}
}

displayBooksByPriceDescending();




  const findBookWithPagination = async (page) =>{
	try {
		await db();
		const books = await Book.find({})
			.skip((page - 1) * 5)
			.limit(5);
		console.log(`Books - Page ${page} with limit 5:`, books);

	} catch (error) {
		console.error('Error fetching books:', error);
	}
  }

  findBookWithPagination(1);


  const findAverageBookPriceByGenre = async () =>{
	try {
		await db();
		const result = await Book.aggregate([{$group: {_id: "$genre", averagePrice: {$avg: "$price"}}}]);
		console.log(`Average book price by genre:`, result);
	} catch (error) {
		console.error("Error calculating average book price:", error);
	}
  }

  findAverageBookPriceByGenre();

/* */

const findAuthorWithMostBooks = async () =>{
	try {
		await db();
		const result = await Book.aggregate([
			{$group: {_id: "$author", bookCount: {$sum: 1}}},
			{$sort: {bookCount: -1}},
			{$limit: 1}
		]);
		console.log("Author with most books:", result);	
	} catch (error) {
		
	}
}
findAuthorWithMostBooks();

const groupByPublicationDecade = async () =>{
	try {
		await db();
		const result = await Book.aggregate([
			{$group: {
				_id: {$subtract: ["$published_year", {$mod: ["$published_year", 10]}]}, count : {$sum: 1} }
		}]);
		console.log("Books grouped by publication decade:", result);
	} catch (error) {
		console.error("Error grouping books by decade:", error);
	}
}
groupByPublicationDecade();

const createIndexOnTitle = async () =>{
	try {
		await db();
		await Book.collection.createIndex({title: 1});
		console.log("Index created on title field");
	} catch (error) {
		console.error("Error creating index:", error);
	}
}
createIndexOnTitle();

const createCompoundIndexOnAuthorAndPublishYear = async () =>{
	try {
		await db();
		await Book.collection.createIndex({author: 1, published_year: 1});
		console.log("Compound index created on author and published_year fields");
	} catch (error) {
		console.error("Error creating compound index:", error);
	}
}
createCompoundIndexOnAuthorAndPublishYear();

const demonstratePerformanceWithExplain = async () =>{
	try {
		await db();
		const result = await Book.find({author: "George Orwell"}).explain("executionStats");
		console.log("Query execution stats:", JSON.stringify(result, null, 2));
	} catch (error) {
		console.error("Error demonstrating performance with explain:", error);
	}
}
demonstratePerformanceWithExplain();

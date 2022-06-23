
const express = require('express');
const app = express();

const mysql = require('mysql2');
const { send } = require('process');

app.use(express.static('abc'));

let params = {
	host: 'localhost',
	user: 'root',
	password: 'cdac',
	database: 'pleasework',
	port: 3306
};

const con = mysql.createConnection(params);



// search book details
app.get("/getBook", (req, resp) => {
	let bookid1 = req.query.bookid;
	console.log(bookid1);

	let details = { status: false, bookdetails: {} };

	con.query('select bookid,bookname,price from book where bookid=?', [bookid1],
		(error, bookRows) => {
			if (error) {
				console.log("Error Occured" + error);
			}
			else if (bookRows.length > 0) {
				details.status = true;
				details.bookdetails.bookid = bookRows[0].bookid;
				details.bookdetails.bookname = bookRows[0].bookname;
				details.bookdetails.price = bookRows[0].price;
			}
			console.log(bookRows);
			resp.send(details);
		});
});


//Update Book details


app.get("/update", (req, resp) => {
	let bookid2 = req.query.bookid2;
	let bookname2 = req.query.bookname2;
	let price2 = req.query.price2;
	console.log(bookid2,+" "+bookname2+" "+price2);

	let details = { status: false };

	con.query('update book set bookname=?,price=? where bookid=?', [bookname2,price2,bookid2],
		(error, bookRows) => {
			if (error) {
				console.log("Error Occured" + error);
			}
			else if (bookRows.affectedRows > 0) {
				details.status = true;
			}
			console.log(bookRows);
			resp.send(details);
		});
});




app.listen(8081, function () {
	console.log("server listening at port 8081...");
});
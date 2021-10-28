const express = require('express')
const app = express()
const mysql = require('mysql')

app.use(express.json())

//create connection 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_test_db'

})

//connect
db.connect((err) => {
    if(err) {
        throw err
    }
    console.log('MySql Connected...')
})


// routes to add Products into Database
app.post('/create', (req, res) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;

    db.query('INSERT INTO products (title, price, description, category) VALUES (?,?,?,?)', [title, price, description, category], (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send('Product Values Inserted...')
        }
    })
})

// get all the products

app.get('/allProducts', (req,res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if(err) {
            console.log(err)
        } else {
            res.send(results)
        }
    })
})



// get each the product by id

app.get('/:id', (req,res) => {
    const id = req.params.id
    db.query(`SELECT * FROM products WHERE id=${id}`, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})



// update each product by id

app.put('/:id', (req, res) => {

    const id = req.params.id

    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;

    db.query(`UPDATE products SET title='${title}', price='${price}', description='${description}', category='${category}' WHERE id=${id}`, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })


    
})




// delete each product by id

app.delete('/:id', (req, res) => {
    const id = req.params.id

    db.query(`DELETE FROM products WHERE id=${id}`, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.send('Product Deleted...')
        }
    })
})






app.listen('3000', () => {
    console.log('Server is started on port 3000');
})
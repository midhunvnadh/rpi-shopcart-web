var products = [
    { name: 'Pen', quantity: 2, price: 10.00 },
    { name: 'Book', quantity: 1, price: 20.00 },
]

export default function handler(req, res) {
    if (req.method === 'PUT') {
        var { name, quantity, price } = req.query;
        price = parseFloat(price) || 0;
        quantity = parseInt(quantity) || 0;

        var added = false;
        for (var i = 0; i < products.length; i++) {
            if (products[i].name === name && products[i].price === price) {
                added = true;
                console.log("Product!")
                products[i].quantity += parseInt(quantity);
            }
        }
        if (!added) {
            products.push({ name, quantity, price })
        }
    }
    if (req.method === 'DELETE') {
        var { index } = req.query;
        products = products.map((data, i) => {
            if (i == parseInt(index)) {
                data.quantity -= 1
            }
            return data
        }).filter(data => data.quantity > 0);
        console.log(products)
    }
    res.status(200).json(products.length > 0 ? products : [])
}
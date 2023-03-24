var products = [
    { name: 'Pen', quantity: 2, price: 10 },
    { name: 'Book', quantity: 1, price: 20 },
]

export default function handler(req, res) {
    if (req.method === 'PUT') {
        var { name, quantity, price } = req.query;
        price = parseInt(price) || 0;

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
        products = products.filter((_, i) => i !== parseInt(index));
        console.log(products)
    }
    res.status(200).json(products.length > 0 ? products : [])
}
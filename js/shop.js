// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
   {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
let cartList = [];
// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];
let totalPrice = 0;
let countProduct = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart  
    // 2. Add found product to the cartList array
/*
    for(let i = 0; i < products.length; i++){
        if(products[i].id === id) {
            cartList.push(products[i]);
            countProduct++;
        }
    }
    document.getElementById("count_product").innerHTML = countProduct;
    console.log(cartList)
*/
    addToCart(id)

}

// Exercise 2
function cleanCart() {
//    cartList = [];
    cart = [];
    document.getElementById("total_price").innerHTML = (totalPrice = 0)
    document.getElementById("count_product").innerHTML = (countProduct = 0)
    document.getElementById("cart_list").innerHTML = ""
}


// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    
/*
    for(let i = 0; i < cartList.length; i++){
        totalPrice += cartList[i].price;
    }
*/
    totalPrice = 0
    applyPromotionsCart()
    for(let i= 0; i < cart.length; i++){
        const hasDiscount = cart[i].hasOwnProperty("subtotalWithDiscount");

        if(hasDiscount){
            totalPrice += cart[i].subtotalWithDiscount
        }else{
            totalPrice += cart[i].subtotal
        }
    }

    document.getElementById("total_price").innerHTML = totalPrice  
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    //cart = [] 
    while (cartList.length > 0) {
        const product = cartList[0]
        const productExist = cart.includes(product)

        if (productExist) {
            product.quantity++  
        } else {
            product.quantity = 1
            cart.push(product)
        }

        cartList.shift();
   }
   console.log(cart);
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    for(let i = 0; i < cart.length; i++){
        cart[i].subtotal = cart[i].price * cart[i].quantity;

        const hasOffer = cart[i].hasOwnProperty("offer");
        const hasSufficientQuantity = hasOffer ? (cart[i].quantity >= cart[i].offer.number) : false;

        if(hasOffer && hasSufficientQuantity){
            const discount = cart[i].subtotal * cart[i].offer.percent / 100;
            cart[i].subtotalWithDiscount = cart[i].subtotal - discount;
        } else if (hasOffer && !hasSufficientQuantity) {
            cart[i].subtotalWithDiscount = cart[i].subtotal
        }
    }
/*
    cart.forEach((product) => {
       product.subtotal = product.price * product.quantity;

        const hasOffer = product.hasOwnProperty("offer");
        const hasSufficientQuantity = hasOffer ? (product.quantity >= product.offer.number) : false;

        if(hasOffer && hasSufficientQuantity){
           const discount =product.subtotal *product.offer.percent / 100;
           product.subtotalWithDiscount =product.subtotal - discount;
        }
    })
*/
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    calculateTotal();
    let shopList = [];
    for (let i = 0; i < cart.length; i++){
         shopList.push(
            `<tr>
             <th scope="row">${cart[i].name}</th>
             <td>$${cart[i].price}</td>
             <td>${cart[i].quantity}</td>
             <td>${cart[i].subtotal}</td>
             <td>$${cart[i].subtotalWithDiscount ? cart[i].subtotalWithDiscount : cart[i].subtotal}</td>
             <td><button type="button" onclick="addToCart(${cart[i].id})" class="btn btn-outline-dark">+</button></td>
             <td><button type="button" onclick="removeFromCart(${cart[i].id})" class="btn btn-outline-dark">-</button></td>
            </tr>`
         )
     }
     document.getElementById("cart_list").innerHTML = shopList.join(" ");
     document.getElementById("count_product").innerHTML = countProduct;    
}

// ** Nivell II **

// Exercise 8
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
    for(let i = 0; i < products.length; i++){
        if(products[i].id === id) {
            const product = products[i]
            const productExist = cart.includes(product)
            if (productExist) {
                    product.quantity++ 
            } else {
                product.quantity = 1
                cart.push(product)
            }
            countProduct++;
        }
    }
    printCart();   
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id === id){
            if(cart[i].quantity === 1){
                cart.splice(i,1)
            } else{
                cart[i].quantity--;
            }
            countProduct--;
        } 
    }
    printCart();
}

function open_modal(){
	console.log("Open Modal");
//    generateCart()
	printCart();   
}
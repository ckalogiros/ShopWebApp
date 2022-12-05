/*
    Local Storage Variable Names
        cartTotalOrders : The total order's count
        productsInCart  : The products in the cart (with no duplicates)
*/

function ResetLocalStorage()
{
    localStorage.setItem('cartTotalOrders', 0);
    
    const pr = "[]";
    localStorage.setItem('productsInCart', pr);

    window.location.reload(); // Reload page
}



/*
    TODO: Comment Function
    Declared and Invoked on page load
*/
(function (OnPageLoad)
{
    // Get all products listed in the DOM 
    const allProducts = document.querySelectorAll('.products');
    const buyButton   = document.querySelectorAll('.buyOrderBtn');
    for(let i=0; i<allProducts.length; i++)
    { 
        // Add event listener for ordering a product
        buyButton[i].addEventListener('click', ()=>{
            SetBuyOrder(allProducts[i]);
        });
    
        // Set the cart's total orders (show as text in browser)
        const totalOrdersCount = localStorage.getItem('cartTotalOrders');
        let cartTotalOrdersNode = document.querySelector('#totalOrders');
        if(totalOrdersCount !== null)
            cartTotalOrdersNode.innerText = totalOrdersCount;
        else
            cartTotalOrdersNode.innerText = 0;
    }
})();

function SetBuyOrder(cartItem)
{
    // We create a new structure for a product, instead of using the whole DOM node
    let item = {
        id:     cartItem.id,
        name:   cartItem.class,
        orders: 0,
        price:  cartItem.querySelector('.price').innerText,
        img:    cartItem.querySelector('img').id,
        index:  -1, // The index of the cart's array it will be stored to
    };

    let productFound = -1;
    let localStorCartProducts = [];
    const productsInCart = localStorage.getItem('productsInCart')
    /*
        !WATCH-OUT!. 
            Possible BUG, if local storage returns: 
                1. "null", 
                2. "" empty string, 
                3. [null, null, ...] an array of null objects
            Should we check for all possible combinations?
            Or watch over when we remove elements from productsInCart array?
    */
    let exists = productsInCart !== "[]" && productsInCart !== "";
    console.log(productsInCart);
    console.log(productsInCart === "[]");
    if(exists) // If there is at least 1 product in the cart
    {
        localStorCartProducts = JSON.parse(productsInCart); 
        const len = localStorCartProducts.length;

        // Search if the current, to be added product, allready exists in cart.
        // If allready exists, just update the product's count
        for(let i=0; i<len; i++) 
        {
            if(localStorCartProducts[i].id === item.id)
            {
                localStorCartProducts[i].orders++;
                item.index = i;
                productFound = i;
                break;
            }
        }
    }

    // If "empty cart" || "product does not exist in cart", add it.
    if(productFound === -1) 
    {
        item.orders = 1;
        localStorCartProducts.push(item);
        item.index = localStorCartProducts.length-1;
    }

    console.assert(item.index !== -1, "Item Index is NULL");
    console.log(localStorCartProducts);
    
    // Store cart back to local storage
    localStorage.setItem('productsInCart', JSON.stringify(localStorCartProducts));
    
    
    // Update total cart orders
    let totalOrdersCount = localStorage.getItem('cartTotalOrders');
    totalOrdersCount++;
    const cartTotalOrders = totalOrdersCount.toString(); 
    localStorage.setItem('cartTotalOrders', cartTotalOrders);
    
    // Update browser's text for cart's total orders
    let cartTotalOrdersNode = document.querySelector('#totalOrders');
    cartTotalOrdersNode.innerText = cartTotalOrders;

}



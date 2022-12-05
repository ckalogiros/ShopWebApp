/*
    Local Storage Variable Names
        cartTotalOrders : The total order's count
        productsInCart  : The products in the cart (with no duplicates)
*/

// const body = document.body;
// const html = document.documentElement;

// const height = Math.max(body.scrollHeight, body.offsetHeight,
//     html.clientHeight, html.scrollHeight, html.offsetHeight);



function ResetLocalStorage() {
    localStorage.setItem('cartTotalOrders', 0);
    const pr = "[]";
    localStorage.setItem('productsInCart', pr);
    window.location.reload(); // Reload page
}




(function (OnPageLoad) {
    // Get the total ammount of orders of all products combined(from the local storage)
    const totalOrdersCount = localStorage.getItem('cartTotalOrders');
    // Update browser's text of cart's total orders count
    const cartTotalOrdersNode = document.querySelector('#totalOrders');
    cartTotalOrdersNode.innerText = totalOrdersCount;

    let totalAmmount = 0;
    const localStorCartProducts = JSON.parse(localStorage.getItem('productsInCart'));

    const container = document.querySelector('.content');
    // container.style.marginLeft = '1em';
    // container.style.marginRight = '1em';
    // container.style.padding = '30px';
    for (let i = 0; i < localStorCartProducts.length; i++) {
        // Get the html container in which we are gonna populate the cart's products
        // const container = document.querySelector('#products');


        const product = localStorCartProducts[i];
        if (product !== null) {
            const div = document.createElement('div');
            // div.classList.add('cart-grid');
            div.classList.add('product');
            div.setAttribute('id', `product${product.id}`)
            
            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
            Add product name Container */
            // Create a parent div for product name and img
            const productInfo = document.createElement('productInfo');
            // productInfo.classList.add('cart-grid-prod');
            
            const productName = document.createElement('span');
            productName.innerText = `ITEM ${product.id}`;
            const img = document.createElement('img');

            img.src = product.img;
            productName.append(img);

            productName.classList.add('center');
            productName.style.marginTop = 'auto';
            productName.style.marginBottom = 'auto';
            productInfo.append(productName);

            div.append(productInfo);


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
                Add product price Container */
            // Create a parent div for each product
            const productPrice = document.createElement('div');
            // productPrice.classList.add('cart-grid-price');
            productPrice.classList.add('overflow-hidden');
            productPrice.classList.add('center');
            productPrice.innerText = "$" + product.price + ".00";
            productPrice.style.marginTop = 'auto';
            productPrice.style.marginBottom = 'auto';

            div.append(productPrice);


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
                Add Quantities Container */
            const quantity = document.createElement('quantity');
            // quantity.classList.add('cart-grid-quant');
            quantity.classList.add('flex');
            quantity.style.marginTop = 'auto';
            quantity.style.marginBottom = 'auto';

            // Add product's reduce orders button
            const leftArrowBtn = document.createElement('button');
            leftArrowBtn.classList.add('quant-btn');
            leftArrowBtn.setAttribute('id', `reduceOrder${product.id}`);
            { // {}: to save some space
                // leftArrowBtn.style.overFlow = 'hidden';
                leftArrowBtn.style.marginTop = 'auto';
                leftArrowBtn.style.marginBottom = 'auto';
                leftArrowBtn.style.textDecoration = "none";
                leftArrowBtn.style.padding = '0';
                leftArrowBtn.style.cursor = 'pointer';
                leftArrowBtn.style.paddingBottom = '.1em';
                leftArrowBtn.style.fontSize = '1.3em';
                leftArrowBtn.style.borderRadius = '50%';
                leftArrowBtn.style.borderWidth = '2px';
                leftArrowBtn.style.width = '1.07em';
                leftArrowBtn.style.height = '1.07em';
                leftArrowBtn.style.lineHeight = '0px';
                leftArrowBtn.style.position = 'relative';
                leftArrowBtn.innerText = '-';
            }
            leftArrowBtn.addEventListener('click', () => { ReduceOrdersCount(product.id); });
            quantity.append(leftArrowBtn);
            
            //Add product's order count 
            const productCount = document.createElement('span');
            productCount.setAttribute('id', `productOrders${product.id}`);
            productCount.innerText = product.orders;
            // productCount.style.backgroundColor = '#009885';
            quantity.append(productCount);


            // Add product's increment orders button
            const incrementOrderBtn = document.createElement('button');
            incrementOrderBtn.classList.add('quant-btn');
            incrementOrderBtn.setAttribute('id', `incrementOrder${product.id}`);
            { // {}: to save some space
                incrementOrderBtn.style.marginTop = 'auto';
                incrementOrderBtn.style.marginBottom = 'auto';
                incrementOrderBtn.style.textDecoration = "none";
                incrementOrderBtn.style.padding = '0';
                incrementOrderBtn.style.cursor = 'pointer';
                incrementOrderBtn.style.paddingBottom = '.1em';
                incrementOrderBtn.style.fontSize = '1.3em';
                incrementOrderBtn.style.borderRadius = '50%';
                incrementOrderBtn.style.borderWidth = '2px';
                incrementOrderBtn.style.width = '1.07em';
                incrementOrderBtn.style.height = '1.07em';
                incrementOrderBtn.style.lineHeight = '0px';
                incrementOrderBtn.style.position = 'relative';
                incrementOrderBtn.innerText = '+';
            }
            incrementOrderBtn.addEventListener('click', () => { IncrementOrdersCount(product.id); });
            quantity.append(incrementOrderBtn);

            quantity.classList.add('center');

            div.append(quantity);


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
            Add Total Ammount Container */
            const totalPrice = document.createElement('totalPrice');
            // totalPrice.classList.add('cart-grid-total');
            totalPrice.classList.add('center');
            totalPrice.classList.add('price-tag');
            totalPrice.style.marginTop = 'auto';
            totalPrice.style.marginBottom = 'auto';
            totalPrice.innerText = "$";
            
            const priceSpan = document.createElement('span');
            priceSpan.innerText = CalculateTotaPrice(product.orders, product.price).toString();
            priceSpan.setAttribute('id', `totalPrice${product.id}`);
            
            // totalPrice.style.backgroundColor = '#003311';

            totalAmmount += product.orders * product.price;


            totalPrice.append(priceSpan);
            div.append(totalPrice);


            /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
            Add Remove Order Button Container */
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('cart-grid-remove');
            removeBtn.classList.add('center');
            removeBtn.classList.add('ff-btn-symbol');
            removeBtn.style.marginTop = 'auto';
            removeBtn.style.marginBottom = 'auto';

            removeBtn.setAttribute('id', `removeOrder${product.id}`);
            { // {}: to save some space
                removeBtn.style.boxShadow = '0px 0px 4px 1px hsl(0 0% 20% / .4)';
                removeBtn.style.textDecoration = "none";
                removeBtn.style.padding = '0';
                removeBtn.style.cursor = 'pointer';
                removeBtn.style.paddingBottom = '.2em';
                removeBtn.style.fontSize = "1.3em";
                removeBtn.style.borderRadius = '50%';
                removeBtn.style.borderWidth = '2px';
                removeBtn.style.width = '1.1em';
                removeBtn.style.height = '1.1em';
                removeBtn.style.lineHeight = '0px';
                removeBtn.style.position = 'relative';
                removeBtn.innerText = 'x';
            }
            removeBtn.addEventListener('click', () => { RemoveProductFromCart(product.id); });

            div.append(removeBtn);


            // const separator = document.createElement('div');
            // separator.classList.add('cart-grid-line');
            // separator.classList.add('center');
            // separator.classList.add('separator-1');
            // div.append(separator);

            container.append(div);
        }
    }

    // Update Total Ammount
    const totalAmmountNode = document.querySelector('#totalAmmount');
    totalAmmountNode.innerText = "$" + totalAmmount + ".00";

    // console.log(localStorCartProducts)

})();

function ReduceOrdersCount(id) {
    const cart = JSON.parse(localStorage.getItem('productsInCart'));
    const index = FindIndexOfItemInCart(cart, id);
    const product = cart[index];

    if (index !== -1 && product.orders > 0) // Decrement only if there are orders for the product 
    {
        product.orders--;

        // Update the product's order count for the DOM
        const div = document.querySelector(`#productOrders${id}`);
        div.innerText = product.orders.toString();

        UpdateTotalOrders(-1);
        // Update Total price
        const totalPrice = document.querySelector(`#totalPrice${id}`);
        // console.log(`total-price-${id}`);
        // console.log("total-price:", totalPrice.innerText);
        totalPrice.innerText = CalculateTotaPrice(product.orders, product.price);
        // Update Total Ammount
        const totalAmmountNode = document.querySelector('#totalAmmount');
        let len = totalAmmountNode.innerText.length;
        let totalAmmount = parseFloat(totalAmmountNode.innerText.slice(1, len - 1));
        totalAmmount -= parseInt(product.price);
        totalAmmountNode.innerText = "$" + totalAmmount + ".00";

        // Update values back to local storage
        localStorage.setItem('productsInCart', JSON.stringify(cart));
    }
}

function IncrementOrdersCount(id) {
    const cart = JSON.parse(localStorage.getItem('productsInCart'));
    const index = FindIndexOfItemInCart(cart, id);
    const product = cart[index];

    if (index !== -1) {
        product.orders++;

        UpdateTotalOrders(1);
        // Update Total price
        const totalPrice = document.querySelector(`#totalPrice${id}`);
        totalPrice.innerText = CalculateTotaPrice(product.orders, product.price);
        // Update Total Ammount
        const totalAmmountNode = document.querySelector('#totalAmmount');
        let len = totalAmmountNode.innerText.length;
        let totalAmmount = parseFloat(totalAmmountNode.innerText.slice(1, len - 1));
        totalAmmount += parseInt(product.price);
        totalAmmountNode.innerText = "$" + totalAmmount + ".00";

        // Update the product's orders text for the DOM
        document.querySelector(`#productOrders${product.id}`).innerText = product.orders.toString();

        // Update local storage
        localStorage.setItem('productsInCart', JSON.stringify(cart));
    }
}

function RemoveProductFromCart(id) {
    const cart = JSON.parse(localStorage.getItem('productsInCart'));
    const index = FindIndexOfItemInCart(cart, id);
    const product = cart[index];

    if (index !== -1) {
        // console.log("removed:", index, " id:", product.id); 

        // Update Total Ammount
        const totalAmmountNode = document.querySelector('#totalAmmount');
        let len = totalAmmountNode.innerText.length;
        let totalAmmount = parseFloat(totalAmmountNode.innerText.slice(1, len - 1));
        totalAmmount -= parseInt(product.price) * parseInt(product.orders);
        totalAmmountNode.innerText = "$" + totalAmmount + ".00";

        // Remove the product's orders from the cart's total orders count
        UpdateTotalOrders(-product.orders);
        product.orders = 0;

        // Remove DOM elements
        document.querySelector(`#product${id}`).remove();

        // Remove product from the cart (products array)
        cart.splice(index, 1);

        // Update the rest of the array's elems indexes
        OnProductRemoveUpdateIndexes(cart, index);
        DebugArrayIndexes(cart); // Print the array

        // Update local storage
        localStorage.setItem('productsInCart', JSON.stringify(cart));
        // console.log(cart);

    }

}

function UpdateTotalOrders(val) {
    // Get value from local storage
    let totalOrdersCount = localStorage.getItem('cartTotalOrders');
    if (totalOrdersCount !== "") // If NOT empty string
    {
        let newTotalOrders = parseInt(totalOrdersCount);
        newTotalOrders += val;
        totalOrdersCount = newTotalOrders;
        localStorage.setItem('cartTotalOrders', totalOrdersCount); // Store back

        // Update cart orders text in browser
        const cartTotalOrdersNode = document.querySelector('#totalOrders');
        cartTotalOrdersNode.innerText = newTotalOrders.toString();
    }
}

function OnProductRemoveUpdateIndexes(array, fromIndex) {
    // console.log("from index: ", fromIndex, " length:", array.length);
    /*
        Because we are gonna remove one element,
        we just subtract 1 from the rest of the array element's "index" variable
    */
    for (let i = fromIndex; i < array.length; i++) {
        // console.log("index:", array[i].index, " i:", i );
        array[i].index--;
    }
}

function DebugArrayIndexes(array) {
    // for(let i=0; i<array.length; i++)
    //     if(array[i].index !== i)
    //         console.log("INDEX ERROR! index:", array[i].index, " i:", i );
}

function FindIndexOfItemInCart(localStorCartProducts, productId) {
    for (let i = 0; i < localStorCartProducts.length; i++)
        if (localStorCartProducts[i] && localStorCartProducts[i].id === productId)
            return i;
    return -1;
}

function ParseArrayToInt(arr) {
    const intArr = [0];
    let k = 0;
    for (let i = 0; i < arr.length; i++)
        if (!isNaN(parseInt(arr[i])))
            intArr[k++] = parseInt(arr[i]);
    return intArr;
}

function CalculateTotaPrice(count, price) {
    const pr = parseInt(price);
    const result = count * price;
    /*
        TODO: 
            Check if price is not a float, to add ".00" at the end.
            Else if price is a float, make sure it has min max floting point digits == 2 digits
    */
    return (result + ".00");
}


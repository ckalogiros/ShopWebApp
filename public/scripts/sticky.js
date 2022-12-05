
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  In order to update the 'cart's total products' value AND
 *  update the position of the sticky 'checkout' div,
 *  we must add listeners for mouse scroll and window resize;
 *  
 *  The window resize listener is to recalculate and update 
 *  the sticky 'checkout' div position
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */



/**
 * Global Handles
 */
var body = document.body;
// html = document.documentElement;
// var height = Math.max(body.scrollHeight, body.offsetHeight,
// html.clientHeight, html.scrollHeight, html.offsetHeight);
const menuNode = document.querySelector('menu');
let stickyMenuNode = document.getElementById('sticky-menu');
const checkoutNode = document.getElementById('checkOut');
let stickyCheckoutNode = document.getElementById('sticky-checkout');


/**
 * Event Listeners
 */

// Add Event Listener for browser's window resize
document.addEventListener('scroll', (e) => {
    SetStickyMenu();
    SetStickyCheckOut()
});


// Resize Event Listener
const content = document.querySelector('.content');
let prevContentRight = content.getBoundingClientRect().right;
addEventListener("resize", (e) => {
    
    const contentRight = content.getBoundingClientRect().right;

    SetStickyCheckOut();

    // Update with the new right offset on every call to 'onResize' event
    prevContentRight = contentRight; 
});



// Create 'sticky-checkout' for the first time.
if (stickyMenuNode === null) {
   
    stickyMenuNode = CreateStickyMenu();
    body.append(stickyMenuNode);
    stickyMenuNode.style.visibility = 'hidden';
    stickyMenuNode.style.display = 'none';
}

// Create 'sticky-checkout' for the first time.
if (stickyCheckoutNode === null) {
   
    stickyCheckoutNode = CreateStickyCheckout(0, 0);
    body.append(stickyCheckoutNode);
    stickyCheckoutNode.style.visibility = 'hidden';
    stickyCheckoutNode.style.display = 'none';
}



/**
 * Functionality
 */
// Sticky Menu Bar
// function CreateStickyMenu() {

//     const menu = document.createElement('menu');
//     menu.setAttribute('id', 'sticky-menu');
//     const home = document.createElement('a');
//     const about = document.createElement('a');
//     const cart = document.createElement('a');

//     // <menu class="menu letter-space-2 " style="padding: 0.5em 0 0.2em">
//     menu.classList.add('width-100');
//     menu.classList.add('menu');
//     menu.classList.add('letter-space-2');
//     menu.classList.add('fixed-top');
//     menu.style.marginTop = '0px';
//     menu.style.padding = '0.5em 0em 0.2em';

//     // <a class="nav-indicator-left menu-items no-wrap " href="index.html">Home</a>
//     home.classList.add('nav-indicator-left');
//     home.classList.add('menu-items');
//     home.classList.add('no-wrap');

//     // <a class="nav-indicator-left menu-items no-wrap " href="#">About</a>
//     about.classList.add('nav-indicator-left');
//     about.classList.add('menu-items');
//     about.classList.add('no-wrap');

//     // <a class="nav-indicator-left menu-items no-wrap " href="cart.html">Cart</a>
//     cart.classList.add('nav-indicator-left');
//     cart.classList.add('menu-items');
//     cart.classList.add('no-wrap');

//     /* * * * * * * *
//      Create the cart-icon with the round representation of Total Product Orders */
//     const table = document.createElement('table');
//     const td = document.createElement('td');
//     const posAbs = document.createElement('div');
//     const cartico = document.createElement('img');
//     const totalBall = document.createElement('span');

//     // <table class="menu-items pos-rel" >
//     table.classList.add('menu-items');
//     table.classList.add('pos-rel');
//     table.append(td);

//     //  <div class="pos-abs " style="bottom:-2px; padding: 1.0em 1.2em 1.1em;">
//     posAbs.classList.add('pos-abs');
//     posAbs.style.bottom = '-2px';
//     posAbs.style.padding = '1.0em 1.2em 1.1em';
//     td.append(posAbs);

//     // <img class=" img-icons left bottom " src="/images/icons/grocery-store.png">
//     cartico.classList.add('img-icons');
//     cartico.classList.add('left');
//     cartico.classList.add('bottom');
//     cartico.src = '/images/icons/grocery-store.png';
//     posAbs.append(cartico);

//     // <span class=" round right up letter-space-0" id="totalOrders"> 0</span>
//     const totalBallNode = document.getElementById('totalOrders');
//     totalBall.classList.add('round');
//     totalBall.classList.add('right');
//     totalBall.classList.add('up');
//     totalBall.classList.add('letter-space-0');
//     totalBall.setAttribute('id', 'totalOrders');
//     totalBall.innerText = totalBallNode.innerHTML;
//     posAbs.append(totalBall);


//     home.innerText = 'Home';
//     about.innerText = 'about';
//     cart.innerText = 'cart';

//     home.href = 'index.html';
//     about.href = '#';
//     cart.href = 'cart.html';


//     menu.append(home);
//     menu.append(about);
//     menu.append(cart);
//     menu.append(table);

//     return menu;
// }
 function CreateStickyMenu() {

    const menu = document.createElement('menu');
    menu.setAttribute('id', 'sticky-menu');
    const home = document.createElement('a');
    const about = document.createElement('a');
    const cart = document.createElement('a');

    // <menu class="menu letter-space-2 " style="padding: 0.5em 0 0.2em">
    menu.classList.add('full-ww');
    menu.classList.add('menu');
    menu.classList.add('letter-space-2');
    menu.classList.add('fixed-top');
    menu.style.marginTop = '0px';
    menu.style.padding = '0.5em 0em 0.2em';

    // <a class="nav-indicator-left menu-items no-wrap " href="index.html">Home</a>
    home.classList.add('nav-indicator-left');
    home.classList.add('menu-items');
    home.classList.add('no-wrap');

    // <a class="nav-indicator-left menu-items no-wrap " href="#">About</a>
    about.classList.add('nav-indicator-left');
    about.classList.add('menu-items');
    about.classList.add('no-wrap');

    // <a class="nav-indicator-left menu-items no-wrap " href="cart.html">Cart</a>
    cart.classList.add('nav-indicator-left');
    cart.classList.add('menu-items');
    cart.classList.add('no-wrap');

    /* * * * * * * *
     Create the cart-icon with the round representation of Total Product Orders */
    // const table = document.getElementById('cart-ico');

    home.innerText = 'Home';
    about.innerText = 'about';
    cart.innerText = 'cart';

    home.href = 'index.html';
    about.href = '#';
    cart.href = 'cart.html';


    menu.append(home);
    menu.append(about);
    menu.append(cart);
    // menu.append(table);

    return menu;
}

function SetStickyMenu() {

    /**
     * Set 'sticky-menuNode' div to 'visible' if:
     *      The page is scrolled beyond the menuNode's div top.
     */
    if (menuNode.getBoundingClientRect().top < 0) {

        menuNode.style.visibility = 'hidden';
        stickyMenuNode.style.visibility = 'visible';
        stickyMenuNode.style.display = 'flex';
        
        // Find and copy existing 'cart total orders table' to sticky-menu
        const stickyTable = document.getElementById('cart-ico');
        stickyMenuNode.append(stickyTable);

        // Remove the 'cart total orders table' from the regular-menu
        const table = menuNode.querySelector('#cart-ico');
        if(table)
            table.remove();
    }
    else {
        
        menuNode.style.visibility = 'visible';
        stickyMenuNode.style.visibility = 'hidden';
        stickyMenuNode.style.display = 'none';

        // Find and copy existing 'cart total orders table' to regular-menu
        const table = document.getElementById('cart-ico');
        menuNode.append(table);

        // Remove the 'cart total orders table' from the sticky-menu
        const stickyTable = stickyMenuNode.querySelector('#cart-ico');
        if(stickyTable)
            stickyTable.remove();
    }

}

// function SetStickyMenuTotalOrders() {

    // const stickyTotalOrdersSpan = stickyMenuNode.querySelector('span');
    // const totalOrdersSpan = document.getElementById('totalOrders');
    // stickyTotalOrdersSpan.innerText = totalOrdersSpan.innerHTML;
// }



// Sticky Checkout
function CreateStickyCheckout(yoffset, xoffset) {

    const htmlNode = document.createElement('div');
    const totamAmt = document.createElement('div');
    const sep = document.createElement('div');
    const pad = document.createElement('div');
    const procceed = document.createElement('a');
    
    htmlNode.setAttribute('id', 'sticky-checkout')
    htmlNode.classList.add('pad-1')
    htmlNode.classList.add('fs-400')
    htmlNode.classList.add('uppercase')
    htmlNode.classList.add('letter-space-0')
    htmlNode.classList.add('check-out')
    // htmlNode.classList.add('fixed-top');
    htmlNode.classList.add('fixed');
    htmlNode.style.right = xoffset + 'px';
    htmlNode.style.top = yoffset + 'px';
    
    
    totamAmt.classList.add('block')
    totamAmt.classList.add('pad-1')
    totamAmt.classList.add('no-wrap')
    totamAmt.setAttribute('id', 'sticky-TotalAmmountSpan')
    totamAmt.innerText = 'Total Ammount';

    sep.classList.add('underline-6')
    pad.classList.add('pad-1');

    procceed.classList.add('button');
    procceed.classList.add('uppercase');
    procceed.classList.add('check-out-btn');
    procceed.innerText = 'Proceed To Checkout';


    htmlNode.append(totamAmt);
    htmlNode.append(sep);
    htmlNode.append(pad);
    htmlNode.append(procceed);

    return htmlNode;
}

function SetStickyCheckOut() {

    // Don't run for 'index.html' page
    if (!checkoutNode)
        return;

    const checkOutBB = checkoutNode.getBoundingClientRect();
    const curMenuHeight = menuNode.offsetHeight;

    /**
     * Set 'sticky-checkoutNode' div to 'visible' if:
     *      The page is scrolled beyond the checkoutNode's div top.
     *  AND the width of the page is enough so that
     *      the checkoutNode div is not wrapped to the bottom of the page.
     */
    if (checkOutBB.top - curMenuHeight < 0
        && checkOutBB.top < 300 // Not wrapped
        && stickyCheckoutNode.style.display == 'none') {

        checkoutNode.style.visibility = 'hidden';
        stickyCheckoutNode.style.visibility = 'visible';
        stickyCheckoutNode.style.display = 'block';

        // const xoffset = body.offsetWidth - checkOutBB.right;
        // const yoffset = curMenuHeight;

        // SetStickyCheckoutPos(xoffset, yoffset);
        // SetStickyCheckoutTotalAmt();

        // Find and copy existing 'total ammount' span to regular-checkout
        const stickyTotalAmmountSpan = document.getElementById('sticky-TotalAmmountSpan');
        const stickyTotalAmmount = document.getElementById('totalAmmount');
        stickyTotalAmmountSpan.append(stickyTotalAmmount);

        // Remove the 'cart total orders table' from the regular-checkout
        const totalAmmount = checkoutNode.querySelector('#totalAmmount');
        if(totalAmmount)
            totalAmmount.remove();

    }
    else if (checkOutBB.top - curMenuHeight > 0
        && stickyCheckoutNode.style.display == 'block'
        || checkOutBB.top > 300) {

        checkoutNode.style.visibility = 'visible';
        stickyCheckoutNode.style.visibility = 'hidden';
        stickyCheckoutNode.style.display = 'none';

        // Find and copy existing 'total ammount' span to regular-checkout
        const totalAmmountSpan = document.getElementById('TotalAmmountSpan');
        const totalAmmount = document.getElementById('totalAmmount');
        totalAmmountSpan.append(totalAmmount);

        // Remove the 'cart total orders table' from the sticky-checkout
        const stickyTotalAmmount = stickyCheckoutNode.querySelector('#totalAmmount');
        if(stickyTotalAmmount)
            stickyTotalAmmount.remove();

    }
    const xoffset = body.offsetWidth - checkOutBB.right;
    const yoffset = curMenuHeight;
    SetStickyCheckoutPos(xoffset, yoffset);
}

function SetStickyCheckoutPos(xoffset, yoffset) {
   
    stickyCheckoutNode.style.right = xoffset + 'px';
    stickyCheckoutNode.style.top = yoffset + 'px';
}

function SetStickyCheckoutTotalAmt() {
   
    const stickyTotalAmtSpan = stickyCheckoutNode.querySelector('span');
    const totalAmtSpan = document.getElementById('totalAmmount');
    stickyTotalAmtSpan.innerText = totalAmtSpan.innerHTML;
}

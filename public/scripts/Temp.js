function SetStickyCheckOut() {

    // Don't run for 'index.html' page
    if (!checkoutNode)
        return;

    const checkOutRB = checkoutNode.getBoundingClientRect();
    const currCheckOutTop = checkOutRB.top;
    const curMenuHeight = menuNode.offsetHeight;

    /**
     * Set 'sticky-checkoutNode' div to 'visible' if:
     *      The page is scrolled beyond the checkoutNode's div top.
     *  AND the width of the page is enough so that
     *      the checkoutNode div is not wrapped to the bottom of the page.
     */
    if (checkOutRB.top - curMenuHeight < 0
        && checkoutNode.getBoundingClientRect().top < 300 // Not wrapped
        && stickyCheckoutNode.style.display == 'none') {

        checkoutNode.style.visibility = 'hidden';
        stickyCheckoutNode.style.visibility = 'visible';
        stickyCheckoutNode.style.display = 'block';

        const xoffset = body.offsetWidth - checkoutNode.getBoundingClientRect().right;
        const yoffset = curMenuHeight;

        SetStickyCheckoutPos(xoffset, yoffset);

    }
    else if (currCheckOutTop - curMenuHeight > 0
        && stickyCheckoutNode.style.display == 'block'
        || checkoutNode.getBoundingClientRect().top > 300) {

        checkoutNode.style.visibility = 'visible';
        // stickyCheckoutNode = document.getElementById('sticky-checkout');
        stickyCheckoutNode.style.visibility = 'hidden';
        stickyCheckoutNode.style.display = 'none';

    }
}
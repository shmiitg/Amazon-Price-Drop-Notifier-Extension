let addProduct = document.querySelector('#add-product');
let logout = document.querySelector('#logout');

addProduct.addEventListener('click', () => {
    let prodUrl = document.querySelector('#url').value;
    let price = document.querySelector('#price').value;
    let jsonData = {
        type: 'addProduct',
        prodUrl: prodUrl,
        price: price
    }
    console.log(jsonData);
    chrome.runtime.sendMessage(jsonData);
    window.close();
})

logout.addEventListener('click', () => {
    let jsonData = {
        type: 'logOut',
    }
    chrome.runtime.sendMessage(jsonData);
    window.close();
})
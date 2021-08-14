let userEmail;
let firebaseConfig = {
    apiKey: "AIzaSyBJh87Tv_yRcYBR1nDZjqOwtem6bYemUsU",
    authDomain: "extension-71ea7.firebaseapp.com",
    projectId: "extension-71ea7",
    storageBucket: "extension-71ea7.appspot.com",
    messagingSenderId: "706371350777",
    appId: "1:706371350777:web:28ae1e6e9a583fa82eb228",
    measurementId: "G-GC87XM6E15"
};

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'Login' || msg.type === 'Register') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        let auth = firebase.auth();
        let email = msg.email;
        let password = msg.password;
        if (msg.type === 'Login') {
            auth.signInWithEmailAndPassword(email, password).then(cred => {
                alert('You are logged in');
                chrome.browserAction.setPopup({
                    popup: "home.html"
                })
            }).catch(e => { alert('Wrong username or password') });
            localStorage.setItem('userEmail', email);
        }
        else if (msg.type === 'Register') {
            auth.createUserWithEmailAndPassword(email, password).then(cred => {
                alert('Registered! Login to continue');
            })
        }
    }
    else if (msg.type === 'logOut') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        let auth = firebase.auth();
        auth.signOut().then(alert('You are logged out'));
        chrome.browserAction.setPopup({
            popup: "popup.html"
        })
    }
    else if (msg.type === 'addProduct') {
        let prodUrl = msg.prodUrl;
        let price = msg.price;
        console.log(prodUrl);
        console.log(price);
        let route = "http://localhost:3000/products";
        $.ajax({
            type: "POST",
            url: route,
            dataType: "json",
            data: {
                prodUrl: prodUrl,
                price: price,
                email: localStorage.getItem('userEmail')
            },
            success: (res) => console.log(res),
            error: () => console.log('An error occured')
        });
        alert('You will be notified when the price drops');
    }
});




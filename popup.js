let loginBtn = document.getElementById('login-btn');
let signupBtn = document.getElementById('signup-btn');
let submitBtn = document.getElementById('submit-btn');
let btnShift = document.querySelector('#btn-shift');
let currClicked = 'Login';

loginBtn.addEventListener('click', () => {
    currClicked = 'Login';
    submitBtn.innerHTML = currClicked;
    btnShift.style.left = 0;
    btnShift.style.right = 'intial';
});

signupBtn.addEventListener('click', () => {
    currClicked = 'Register';
    submitBtn.innerHTML = currClicked;
    btnShift.style.right = 0;
    btnShift.style.left = 'initial';
});

submitBtn.addEventListener('click', () => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let jsonData = {
        type: currClicked,
        email: email,
        password: password
    }
    chrome.runtime.sendMessage(jsonData);
    window.close();
})

// let amazonextension = angular.module('amazonextension', ['ui.router'])
// amazonextension.config([
//     '$stateProvider',
//     '$urlRouterProvider',
//     function ($stateProvider, $urlRouterProvider) {
//         $stateProvider
//             .state('home', {
//                 url: '/home',
//                 templateUrl: 'home.html',
//                 controller: 'home'
//             })
//             .state('login', {
//                 url: '/login',
//                 templateUrl: 'login.html',
//                 controller: 'login'
//             })
//         $urlRouterProvider.otherwise('login');
//     }
// ]);

// let loginForm = angular.module('loginForm', []);

// loginForm.controller('myForm', ['$scope', function ($scope) {
//     $scope.customEmail = 'shm@gmail.com';
//     $scope.customPassword = '';
//     console.log($scope.customEmail);
//     console.log($scope.customPassword);
// }]);
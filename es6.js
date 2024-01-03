// arrow functions.

function foo(a, b) {
    return a + b;
}

let foo2 = (a, b) => a + b;

// Array destructuring.

let arr = [1, 2, 3, 4, 5];

let [a, b, ...rest] = arr;

// Object destructuring.

let obj = { x: 1, y: 2, z: 3, z2: 4 };

let { x, y, ...rest2 } = obj;

let num1 = 3, num2 = 5;
// swap
[num1, num2] = [num2, num1];

// default values
function defaultValues() {
    let obj2 = { x: 1, y: 2, z: 3, z2: 4 };

    let { x = 0, y = 0, z = 0, z2 = 0, w = 0 } = obj2;
}

// rest parameters (variable number of arguments)
function restParameters(...args) {
    console.log(args);
}

restParameters(1, 2, "hello", "world");

// spread operator

let arr2 = [1, 2, 3];

let arr3 = [0, ...arr2, 4];

console.log(arr3);

let obj3 = { x: 1, y: 2, z: 3 };

let obj4 = { ...obj3, z2: 4 };

console.log(obj4);

// template strings

let nameStr = "John";

let str = `1 + 2 = ${((a, b) => a + b)(1, 2) }`;

console.log(str);

// for of

let arr4 = [1, 2, 3, 4, 5];

for (let i of arr4) {
    console.log(i);
}

// classes

class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        console.log(`Hello ${this.name}`);
    }
}

let person = new Person("John");

person.sayHello();

// map, reduce, filter

// map taks a function and applies it to each element of the array.

let arr5 = [1, 2, 3, 4, 5];

function doubleIt(x) {
    return x * 2;
}

let arr6 = arr5.map(doubleIt);
// let arr6 = arr5.map(x => x * 2);

console.log(arr6);

// reduce takes
// 1. a function which takes
//   1. an accumulator
//   2. a next value.
//   and returns a new accumulator.
// 2. an initial value

let arr7 = [1, 2, 3, 4, 5]; // (5 * 6) / 2 = 15

function sumIt(acc, next) {
    return acc + next;
}

let sum = arr7.reduce(
    // (acc, next) => acc + next,
    sumIt,
    -3
);

console.log(sum);

// filter

let arr8 = [1, 2, 3, 4, 5];

function isEven(x) {
    return x % 2 === 0;
}

let arr9 = arr8.filter(
    // x => x % 2 === 0
    isEven
);

console.log(arr9);

// promises, async await.

/*

What is a Promise?

- A promise is an object that represents the eventual completion (success or failure) of an asynchronous operation, and its resulting value.

sync vs async

sync: function returns a value immediately.
async: function returns a promise.
Async exanples:
- When you make a network request.
*/


let responsePromise = fetch("https://jsonplaceholder.typicode.com/posts/3")

function extractJson(response) {
    return response.json();
}

function printData(json) {
    console.log(json);
}

function handleError(err) {
    console.log(err);
}

let jsonPromise = responsePromise
    .then(
        (response) => response.json(),
    )
    .catch(
        (err) => console.log(err)
    );


// jsonPromise
//     .then(printJson)
//     .catch(handleError)
//     .finally(() => console.log("done"));

let url = "https://jsonplaceholder.typicode.com/posts/3";
// url = "http://google.com";

// Chaining of promises.

// response.text() returns a promise for the text in the response body.
// response.json() returns a promise for the json in the response body.

fetch(url)
    .then((response) => response.text())
    .then((text) => console.log(text))
    .catch(handleError)
    .finally(() => console.log("done"));

// async network request
// async function get(url) {
//     let response = await fetch(url);
//     let data = await response.json();
//     return data;
// }

/// async await

// You mark a function as async if it returns a promise.
// You can use await inside an async function to wait for a promise to resolve.

async function get(url) {
    // waiting for the http response.
    let response = await fetch(url);
    // waiting for the body to be parsed as json.
    let data = await response.json();

    return data;
}

get(url)
    .then((data) => console.log(data))
    .catch(handleError)
    .finally(() => console.log("done"));

// async await with try catch.

async function get2(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

get2(url)
    .then((data) => console.log(data))
    .catch(handleError)
    .finally(() => console.log("done"));


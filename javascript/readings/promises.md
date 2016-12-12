# Promises

Promises are a tool for simplifying callbacks to asynchronous functions. Since the introduction of ES2015, they have been included natively in Javascript.

[API Documentation][documentation]

## The Problem

Sometimes we need to chain several asynchronous functions. For example, maybe we want to get our user's geolocation, then hit an API to `GET` the user's nearest surf spot, then hit a third API to get the surf conditions for that spot.

```javascript
function getForecastForLocation(){
  locationRequest({
    success: spotRequest({
      success: forecastRequest({
        success: handleSuccess,
        error: handleError
      }),
      error: handleError
    }),
    error: handleError
  });
}
```

We would have to define the success callback of one function to invoke the next, and each would have to handle its own errors. Nesting callbacks like this can only lead us to :fire: [callback hell][callback-hell] :fire: .

## The Solution

With promises, we can write:

```javascript
function getForecastForLocation(){
  locationRequest
  .then(spotRequest)
  .then(forecastRequest)
  .then(handleSuccess)
  .catch(handleError)
}
```

Let's learn how to do this.

## Functionality and Vocabulary

First let's define a couple terms:

  * _action_: the primary function of a promise (i.e., fetch data from an API)

Promises can exist in one of three states:

  * _fulfilled_: The promise's action has succeeded.
  * _rejected_: The promise's action has failed.
  * _pending_: The promise has been neither fulfilled nor rejected.

A promise is considered **settled** when it has either been fulfilled or rejected.

A few notes about functionality before moving on:

  * A promise can only succeed or fail once -- callbacks will not be invoked multiple times.
  * A promise cannot change its state from fulfilled to rejected or vice-versa.
  * If a promise has already been settled and a callback is added that matches the promise's state, that callback will be invoked immediately.

## Creating a Promise

We can create a new promise using the promise constructor function:

```javascript
const p = new Promise(executor)
```

The constructor function accepts a single `executor` argument, which is a function that takes up to two optional parameters: `resolve` and `reject`. Let's see an example:

```javascript
const p = new Promise((resolve, reject) => {
  if (/* success condition */){
    resolve("success");
  } else {
    reject("failure");
  }
});
```

## `then`

Promise objects have two important methods: `then` and `catch`. Both `then` and `catch` return **a new promise object**, making them chainable.

`then` accepts two parameters:
  * `onFulfilled`: the function to invoke if the promise is _fulfilled_
  * `onRejected`: the function to invoke if the promise is _rejected_

Essentially, `onFulfilled` is the `resolve` function and `onRejected` is the `reject` function.

```javascript
p.then(onFulfilled) // this *might* run
p.then(onFulfilled, onRejected) // one of these *will* run
```

### `resolve` and `reject`

`resolve` and `reject` are responsible for telling the promise what arguments to pass on (via `then` or `catch`) once the promise has been settled.

```javascript
const receiveResponse = msg => console.log(msg);

const request = new Promise(resolve => {  
  setTimeout(() => resolve('success'), 1000);
});

request.then(receiveResponse);
```

`receiveResponse` is the resolve callback, and will be invoked once `setTimeout` successfully goes off after one second. It receives `'success'` passed as an argument, and will print it out.

## `catch`

`catch` only accepts an `onRejected` parameter. This function is invoked if any promise in the chain is rejected. In the example below, the function `rejected` will run if `p`, `firstFulfilled`, or `secondFulfilled` throw an error.

```javascript
p.then(firstFulfilled).then(secondFulfilled).catch(rejected)
```

Consider this similar example:

```js
p.then(firstFulfilled, rejected).then(secondFulfilled)
```

The difference here is that `rejected` will only be invoked if `p` is rejected. It doesn't handle the errors for `firstFulfilled` or `secondFulfilled`, because it's not chained onto either of them.

Here's another case:

```javascript
p.then(onFulfilled, onRejected).catch(error)
```

If `somePromise` is rejected, `onRejected` will run but `error` will not, because `then` will return a fulfilled promise.

## Using Promises

While promises can be a little tricky to understand, they are extremely easy to use. The jQuery `ajax` method allows use of success callbacks and also returns a promise, so we can use this to compare and contrast the different techniques. We can avoid passing a callback to `ajax` by calling `then` on the return value and passing the callback to `then`.

```js
// Passing a callback

const fetchSuccess = cat => console.log(cat);
const fetchError = err => console.log(err);

const fetchCat = (catId, success, error) => (
  $.ajax({
    url: `/cats/${catId}`,
    method: 'GET',
    success,
    error
  })
);

fetchCat(1, fetchSuccess, fetchError);
```

```js
// Using a promise.

const fetchSuccess = cat => console.log(cat);
const fetchError = err => console.log(err);

const fetchCat = catId => $.ajax({ url: `/cats/${catId}` });
// Note the implicit return!

fetchCat(1).then(fetchSuccess).catch(fetchError);
```

Promises really excel at error handling and separating concerns. In the second example, the `fetchCat` function no longer needs to be involved with or know about the expected outcome.

## Advanced Topics

We have only covered the very basics of what promises are and how they work. Here are a few more advanced topics and links for more info:

* [Implicit rejection][so]: promises can be implicitly rejected if the constructor function throws an error.
* [Promise.all][all]: Accepts an array of promises, and creates a single promise that only gets fulfilled if every promise in the array fulfilled.
* A [polyfill][polyfill] is required for consistent functionality across older browsers.

Also, check out this [really well written article][rwwa].

[callback-hell]: http://callbackhell.com
[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[so]: http://stackoverflow.com/questions/28703241/promise-constructor-with-reject-call-vs-throwing-error
[all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[polyfill]: https://github.com/stefanpenner/es6-promise
[rwwa]: http://www.html5rocks.com/en/tutorials/es6/promises/

# Rainbow Routes

Today we're going to get our first experience using the React Router. The goal is to create a basic app that displays the colors of the rainbow. This rainbow, however, has something special about it - some of the colors are nested within others.

## Phase 0: Setup

Download the [zip file][zip-skeleton] of the skeleton. Poke around to get familiar with the setup; it should look pretty familiar. Run `npm install` to get it setup. Then make sure webpack is watching (`webpack --watch`), and start up the `http-server`.  

Navigate to `http://localhost:8080/` in your browser and verify you can see "Rainbow Router" header.  Currently there's no functionality - we'll fix that asap!

## Phase 1: Basic Routing Structure

Our first step is to build up the router structure we want.  Ultimately, we want our router structure to look like this:

URL                     | Components
------------------------|-----------
`/`                     | `Rainbow`
`/red`                  | `Rainbow -> Red`
`/red/orange`           | `Rainbow -> Red -> Orange`
`/red/yellow`           | `Rainbow -> Red -> Yellow`
`/green`                | `Rainbow -> Green`
`/blue`                 | `Rainbow -> Blue`
`/blue/indigo`          | `Rainbow -> Blue -> Indigo`
`/violet`               | `Rainbow -> Violet`


To start, let's add our first level of routes (i.e. red, green, blue, & violet).  Scroll to the bottom of `entry.jsx` and you'll see the basic framework of a router has already been set up.  

Now it's our job to add more routes.  For each desired route (red, green, blue, & violet), set the path attribute equal to the color name and assign the corresponding component.  

You'll notice all the color components have already been required at the top of the page.  Refer to tonight's readings on [Route Configuration][route-config-reading] for guidance on how to build routes.

Test that your code works!  Navigate to all the urls we just created, and you should see the color component pop up on the right-hand side.  Remember, these are React Routes, so the paths we created will come after the `#`.  For example, our red route will look like `localhost:8080/#/red`.

Next, let's go ahead and add the nested routes (i.e. orange, yellow, and indigo).  Same principle follows for setting the path and component attributes to the corresponding color.  For the time being, we won't be able to test these out, but we'll get to that later.  

[route-config-reading]: https://github.com/reactjs/react-router/blob/master/docs/guides/RouteConfiguration.md  

## Phase 2: Hash History

Navigating to our newly created routes manually is tiresome, so let's add functionality to take care of this process for us.  Take a look at the `rainbow` component - you'll see that each `<h4>` has a click listener and corresponding method already created.  

To make each of these click handlers change the path for us, we're going to use [`HashHistory`][hash-history], which allows us to dynamically change the hash portion of our url.  

**N.B.** Notice that the router was declared with its history property set to `HashHistory`.

To use `HashHistory`, we can simply push in the url we wish to navigate to.  For example, our `addRed` method might look as follows:

```js
  addRed() {
    HashHistory.push('/red');
  }
```

Fill out the remaining `addColor` methods.  Test that your code works by clicking on the color names in your browser and seeing that you are redirected correctly.  

## Phase 3: Nested Routes

Now let's add those nested routes (i.e. orange, yellow, & indigo).  No step-by-step instructions here - you got this!  

Next step is set up the click handlers to allow us to get to these nested routes.  You probably noticed text below the red and blue square, prompting you to add another color.  Our job now is to make those links work!  

Open up the `red.jsx` and `blue.jsx` files within the components folder.  You'll again see that click handlers have already been set up.  Go ahead and add code to all the click handler callbacks.  When you push the new route in the `hashHistory`, make sure it's appropriately nested!

Test that your code works by navigating through all the routes.  Time to celebrate! :tada: :rainbow: :tada:

[hash-history]: https://github.com/reactjs/react-router/blob/master/upgrade-guides/v2.0.0.md#using-history-with-router



[live-demo]: /
[zip-skeleton]: ./rainbow_routes.zip?raw=true

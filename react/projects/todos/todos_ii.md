# ReduxTodos Day 2 - All Together Now

## Overview

[Live Demo!][demo]

Today we will continue building from the frontend only todo app you built yesterday
and incorporate rails so that our todos can be persisted on the backend and users can be authenticated.
We will also learn to use and implement thunk middleware to handle asynchronous actions. Let's get started!

## Phase 0: Rails API

In this phase you will create a Rails API that stores `Todo`s in a database
and serves JSON in response to HTTP requests.

**NB**: We first saw use of a Rails API in Ajax Twitter! Today, we will create
an Rails API that will have controllers and models but will not have HTML
views. Instead of being a full-stack app, its purpose will be to serve
information between our Postgres database and React/Redux front-end. It will
respond to HTTP requests using `Controller#Actions`, the same way as before.
Its responses, however, will be JSON instead of HTML. Our app will render
views via React components that parse and display these JSON responses. User
interactions with React components will dispatch actions to our Redux store
that either fire ajax requests or render the newest application state.

Let's get started!

+ Create a new rails project using `--database=postgresql` and `--skip-turbolinks`
+ Update your Gemfile with `pry-rails`, and `annotate`.

### `Todo`s
+ Create a `Todo` model with a `title` string (required), a `body` string (required), and a `done` boolean (required).
  + Run `rails g model todo title body done:boolean`.
  + Add the necessary validations to the database and model.
    + NB: Validating boolean fields creates interesting bugs. `null: false` will
    fail because `false` is considered `null` by the db, and `presence: true`
    will fail because `false` is not considered present by the model. Instead,
    skip the database validation and use `validates :boolean_field_name, inclusion: { in: [true, false] }`
    at the model level to validate boolean fields.
+ Make sure Postgres is running on your machine
  + Run `rake db:setup`.
  + Run `rake db:migrate`.

**Test your setup** - Try creating a couple of todos in your database using the
rails console (`rails c`).

+ Create a `Api::TodosController` to handle our API requests for `Todo`s.
  + Run `rails g controller api/todos`.
  + It should create `app/controller/api/todos_controller.rb`.
+ Define `show`, `index`, `create`, `update`, and `destroy` actions in your controller.
+ Make your controller actions serve JSON-formatted responses.
+ Define a private helper method for `todos_params`.

For example, your `show` and `create` actions should look something like this:
```rb
# app/controller/api/todos_controller.rb
def show
  render json: Todo.find(params[:id])
end

def create
  @todo = Todo.new(todo_params)
  if @todo.save
    render json: @todo
  else
    render json: @todo.errors.full_messages, status: 422
  end
end
```

### Routes
+ Create routes for `:index`, `:show`, `:create`, `:destroy`, and `:update`.
+ Nest your routes under [namespace][namespace-docs] `api`.
+ In `config/routes.rb`, set `defaults: {format: :json}` for your `api` namespace.

Your `routes.rb` should look something like this:
```rb
Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :todos, only: [:index, :show, :create, :destroy, :update]
  end
end
```

**Test your routes** - You should get the following when you run `rake routes`.
```
api_todos GET    /api/todos(.:format)     api/todos#index {:format=>:json}
          POST   /api/todos(.:format)     api/todos#create {:format=>:json}
 api_todo GET    /api/todos/:id(.:format) api/todos#show {:format=>:json}
          PATCH  /api/todos/:id(.:format) api/todos#update {:format=>:json}
          PUT    /api/todos/:id(.:format) api/todos#update {:format=>:json}
          DELETE /api/todos/:id(.:format) api/todos#destroy {:format=>:json}
```

### StaticPages
+ Create a `StaticPagesController` that will serve a `root` view with `<div id="content"></div>`.
+ Update `routes.rb` to `root to: "static_pages#root"`.


You're almost ready to go!
+ Seed your database with a few todos for testing.
+ Start your server (`rails s`) so that it can respond to HTTP requests.
+ Visit [http://localhost:3000/][local-host]. It should render your root page.
  + Inspect the page and double check that `<div id="content"></div>` is present.

**Test your API** - Try out your API endpoints using `$.ajax`. You should be able
to send `POST`, `GET`, `PATCH`, and `DELETE` requests and receive the appropriate
responses in the console.

For example, try:

```
const success = data => console.log(data);
const error = e => alert(e);
$.ajax({
    method: 'GET',
    url: 'api/todos',
    success,
    error
  });
```

[local-host]: http://localhost:3000/
[namespace-docs]: http://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing

---

## Phase 1: Async Actions

Your entire todos project from yesterday will function as the frontend folder for your rails app with some slight modifications.
You will also need your package.json and webpack config which should be put in the root folder, but you do not need `index.html`.

Modify the output path in your webpack config to create bundle in `app/assets/javascripts` rather than `build`.

**Test your setup** - Set up your entry file `todo_redux.jsx` to render
`<h1>Todos App</h1>` into your root page's `#content` container. You should be able to visit
`localhost:3000` and confirm that it worked. You should have your entire work from
yesterday working on `localhost:3000` before continuing.

---
## Phase 2: Todos Redux Structure

In this phase you will expand our Redux loop to include the entire internet!
That is, make requests to our rails app and bring back todos from the database.
For this we will use an `APIUtil` and thunk action creators.

### API Utils

Your API utilities are what actually make the `$.ajax` requests that will hit
your backend and fetch or (eventually) update your data.
These utility functions should return a promise so that the caller of the
function can handle success and failure however they see fit.

Let's write our Todo API Util.

+ Create a file `util/todo_api_util.js`.
+ Write a function that takes no arguments, makes a request to `api/todos` with a method of `GET`, and returns a promise.

**Test your code** - Try running your function in the console and make sure
you can resolve the promise by passing a function to `then`.

### Thunk Middleware

Before we can start writing thunk action creators, we need a middleware to handle them.
make a new file `frontend/middleware/thunk.js`. From this, export a single middleware function.
This function should check the type of each incoming action and see if it is of type `function`.
If so, return `action(dispatch, getState)`. If not, return `next(action)`.
Refer to the middleware and thunk readings if you need more guidance.

Now modify your store to use your shiny new middleware. Inside `store.js`,
import `applyMiddlware` from `redux`, and the thunk middleware. As the last
argument to `createStore`, pass `applyMiddleware(thunk)`.

You can test that your thunk middleware is working by dispatching a function,
if the function is called it's working!

```js
store.dispatch((dispatch) => {
  console.log('If this prints out, the thunk middleware is working!')
})
```

### Thunk Action Creators

#### Fetching Todos

Let's write an action creator to fetch todos from the server. Inside
`frontend/actions/todo_actions`, import your `APIUtil`, and export a function `fetchTodos`
which returns another function. The returned function should take dispatch as an argument,
and when invoked, call the `APIUtil` to fetch all todos. Resolve the promise by dispatching
your synchronous `receiveTodos()` action.

Test it out! With your store and thunk action creator attached to the window you
should be able to populate your redux store with todos from the database like so.

```js
store.dispatch(fetchTodos());
```

Once it's working, inside `todo_list_container.js`, include `fetchTodos` in `mapDispatchToProps`.
Inside `todo_list.jsx`, inside `componentDidMount` call `this.props.fetchTodos`. Test that
when you load the page the todo list is populated from the database.

#### Creating Todos

Now that we can fetch todos from the database, let's add the ability to save todos to the database.
First add a new function to your `APIUtil` which takes a todo and posts it to the server.
Inside `frontend/actions/todo_actions`, add a new thunk action creator `createTodo`, which takes a todo as an argument.
The returned function, when invoked, should call the `APIUtil` to create a todo and resolve the promise by dispatching
your synchronous `receiveTodo(todo)` action.

Now inside the `todo_list_container.js`, instead of passing in `recieveTodo` in `mapDispatchToProps`,
pass in `createTodo`. Inside the todo form, instead of call `receiveTodo`, call `createTodo`.
Since we only want to clear the form if the post to the server is successful, clear the form after the promise resolves.
Since our thunk middleware returns the promise back to the caller, we can take on another `.then` to clear the form like so.

```js
// inside of handleSubmit
this.props.createTodo({ todo }).then(
  this.setState({ title: "", body: "" });
);
```

#### Error Handling

We now have to deal with the unfortunate possibility that our request may fail.
When we attempt to create a todo with invalid params, the server will render a json array of errors.
We need a place in our redux store to house these errors. Time for a new reducer!
Create `frontend/reducers/error_reducer`. It's initial state should be an empty array. Now let's write
some actions to modify this portion of state. Create `frontend/actions/error_actions`.
You only need two sync actions here, `receiveErrors(errors)` and `clearErrors`. You will
also need constants for each action, `RECEIVE_ERRORS` and `CLEAR_ERRORS`.

Back in your reducer, handle these actions by either returning `action.errors`, or an empty array.

Now that we have somewhere to store errors, when todo creation fails, dispatch those errors.
You will need to update your `createTodo` action like this.

```js
export function createTodo(todo) {
  return (dispatch) => {
    return APIUtil.createTodo(todo)
      .then(todo => dispatch(receiveTodo(todo)),
            err => dispatch(todoError(err.responseJSON)));
  };
}
```

Verify that your error state is populated if you try to create a todo with invalid params.
Then, inside your todo form component, display the todos. You will need to pass the errors through
the top level component and add error state to `mapStateToProps`.

#### Updating Todos

This will be very similar to creating todos, (the resulting action will still be `receiveTodo`)
but we need a different action because we will hit a different route on the back end.
Add `APIUtil.updateTodo(todo)` and a new thunk action creator `updateTodo(todo)`
which dispatches `receiveTodo` upon success and `receiveError` on failure.
Change your components to use your new action instead of calling receiveTodo directly.

#### Deleting Todos

You know the drill! Make your `APIUtil`, and thunk action creator (it should dispatch
`removeTodo` on success) for deletion. Update your components appropriately.

### Steps

Once your todos have all their original functionality back and persisting to the database,
go through the same process with steps! You will have to write:

* The migration
* The model
* The controller
* The API Util
* The actions
* The reducer

## Phase 3: Authentication

Right now all users of our todo app share the same todos. That's not gonna work in the long run,
let's authenticate users and only show them their own todos. We are going to authenticate our app the same way
we have in the past, frontend authentication is a topic that will be explored later this week.
You will not need redux (or javascript at all) for authentication today.

Create a user model with a
`username` and all other columns needed for authentication. You will also need a users and session controller.
Make rails views for `users/new` and `sessions/new` (they can probably share a form partial).
On successful account creation or log in, redirect users to `static_pages#root`.
Use `before_action` callbacks to ensure logged in users get redirected from sign in routes to `static_pages#root`
and logged out users are redirected from `root` to `sessions/new`. You can render a
log out button inside of `static_pages#root` outside of your react content.

Once you can sign up and sign in and out, associate todos with a user! Make a new migration to
add a `user_id` column to the `todos` table. In the todos controller, associate created todos with the `current_user` like so.

```ruby
def create
  @todo = current_user.todos.new(todo_params)
  # ... etc
```

Lastly, modify the index action to only render the current users todos.
You now have a fully authenticated todo app! Celebrate!

## Phase 4: Tags

## Bonus

+ Disable your update and delete buttons while the dispatch is pending.
Consider adding a `fetching` boolean to state and new sync actions like
`requestTodos` to tell the reducer to set `fetching` to true.
+ Add additional features:
  + Steps can have sub-steps (polymorphic associations)
  + Steps can have tags (make taggings polymorphic, consider using a concern)
  + Allow markdown or text styling in todos ([quill.js](https://quilljs.com/))
  + Allow users to update todo title & body
  + Sorting by priority
  + Adding a time when something is due
    + Sort by due date
    + Item pops up when it is due


[store_reading]: ../../readings/store.md
[middleware_reading]: ../../readings/middleware.md
[components_reading]: ../../readings/containers.md
[connect_reading]: ../../readings/connect.md
[props_and_state_reading]: ../../readings/props_and_state.md
[selector_reading]: ../../readings/selectors.md
[demo]: https://aa-todos.herokuapp.com/

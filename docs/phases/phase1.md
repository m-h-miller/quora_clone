# Phase 1: User Authentication, Question Model and JSON API
In Phase 1, I will begin by implementing user signup and authentication using BCrypt. There will be a basic landing page after signup that will contain the container for the application's root React component. The site should already be deployed live via Heroku on day 1.

Before building out the front end, I will begin by setting up a full JSON API for Questions.
Next, I will set up Flux, the React Router, and the React view structure for the main application. After the basic Flux architecture has been set up, a Question store will be implemented and a set of actions corresponding to the needed CRUD functionality created.
Once this is done, I will create React views for the Questions `Index`, `IndexItem` and `Form`. At the end of Phase 1b, Questions can be created, read, edited and destroyed in the browser.

## Rails
### Models
* User
* Question

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::QuestionsController (create, destroy, index, show, update)

### Views
* users/new.html.erb
* session/new.html.erb
* questions/index.json.jbuilder
* questions/show.json.jbuilder

## Flux
### Views (React Components)

### Stores

### Actions

### ApiUtil

## Gems/Libraries
* BCrypt

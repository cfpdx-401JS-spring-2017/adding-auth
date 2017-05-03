<img src="https://cloud.githubusercontent.com/assets/478864/22186847/68223ce6-e0b1-11e6-8a62-0e3edc96725e.png" width=30> Adding Auth
===

## Description

For this assignment, you'll be securing a new express-mongoose REST API data server that you'll be creating. 
You can pick the data/resource that you want to expose, but create something new for this 
assignment. Provide at least following CRUD methods: get all, get, add new (post).

The routes for the resource need to be protected, meaning a request has to come from a logged in user that presents an access token.

You'll need to provide:

* Unprotected auth routes for: `signin` and `signup` and `verify` for user management that return a token on success.
* A user model that can hash passwords and also compare a subsequent password
* Middleware function that "protects" the resource route

## Testing

* Write E2E/API auth tests for signup and signin.
* Write appropriate model and E2E/API tests for your resource. **You'll need to "sign up" at start of
test in order to access resource** as this will break tests that previously worked without a token. Something like:

```js
    let token = '';    
    before(() => {
        return request.post('/api/auth/signup')
            .send({ email: 'me@me.com', password: 'abc' })
            .then(res => {
                token = res.body.token;
            });
    });
```


## Bonus

* Add an auth verify route that checks if token is valid.
* Add a resource that checks a user's role and requires admin or some other elevated priviledge.

## Rubric:

* User Model: 2pts
* Sign in/up routes: 2pts
* Auth Middleware: 2pts
* Project Organization and Testing: 4pts

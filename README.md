##Lab: Adding Auth
#Dev: Keeley Hammond

In this lab, I:

* Wrote unprotected auth routes for: `signin` and `signup` and `verify` for user management that return a token on success.
* Created a user model that can hash passwords and also compare a subsequent password
* Wrote a middleware function that "protects" the resource route
* Wrote E2E/API auth tests for both signup and signin.
* Wrote appropriate model and E2E/API tests for my resource, "Poms". (Pomeranians are great). This included a post, a get by ID and a simple get.


## Bonuses Completed:

* Add an auth verify route that checks if token is valid. (Y)
* Add a resource that checks a user's role and requires admin or some other elevated priviledge. (N :( )
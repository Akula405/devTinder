Episode-3

- create repository
- intialize repository
- node modules,package.json,package-lock.json
- install aserver
- create a server
- listen to port number
- write request handlers for /test,/hello
- install nodemon and update scripts in package.json
- what are dependencies
- what is the use of "-g" in npm install
- difference of carret and Tilde("^","~")

Episode-4

- intialize git repository
- add gitignore file
- create a remote repo in github
- push all code to remote origin
- try different routes and route extensions ex.'/test' etc
- order of routes matter a lot
- install postman app and make workspace and test api call
- write logic to handle get,post,delete,patch api calls and test them in postman

Episode-5

- multiple Route handlers
- next()
- next function and errors along with res.send()
- app.use('/',[rh,rh2,rh3,rh4,rh5]) => we can also put all or some request handlers(rhs) in array
- reading query params
- reading dynamic routes
- explore routing and use of \*,?,+,() in routing
- use of regx (/a/ , /.\*fly$/ etc) in routing
- what is middleware and why we need middlewares
- difference of app.use() and app.all()
- dummy adminAuth middleware
- dummy userAuth middleware expet for uesr/login

Episode-6

- Create a free cluster on mongodb official website (mangodb Atlas)
- install mongoose library
- connect our app to the Database
- call the connectDb function and connect to data base before statrtin the application on server
- create a user Schema & user model
- create post/signup api and send data to database
- push some documents(data) using api calls from postman
- add express.json() middleware to our app
- make post/signup api dynamic from postman or end user

Episode-7

- make get/feed api to get all the users by using 'User.find({})' method
- make get/user api to get particular user by using 'User.findOne({emai:userEmail})' method
- make delete/user api to delete user by id using User.findByIdAndDelete(userId) or User.findByIdAndDelete({\_id:userId})
- make patch-/user api to update user data using User.findByIdAndUpdate() method

Episode-8

- User schema validations like required:true, unique:true etc, custom validate functions for new and existing users
- minLength,maxLength,min,max,defult,trim,uppercase,lowercase
- Adding timestamps
- Add maximum validations for all the user data according to documaentation
- API level validations like restrict the updating user data for the particular fieilds in API level etc on /patch and signup api
- Data sanitization(sanitizing the data before going into the data base)-Add API validations on each field
- Never trust requiest.body
- install validator library
- explore validator function and use validator function for email,password etc.

Episode-9

- Validate the signup api using the helper function
- Install bcrypt package
- Create passwordHash using bcrypt.hash and save the user data with encrypted password
- create login api
- compare passwords and throw erros if email and passwords are invalid

Episode-10

- install a cookie-parser
- send dummy cookie to user
- get /profile api and check the cookie back
- Install jwtwebtoken
- in /login api,after emaiand pasword validation create jwt token and send back to the user
- Read the cookies and find out the logged in user inside the /profile api
- implemented userAuth middleware to impliment authentication logic
- placed userAuth middleware in all the api requests excluding /login,/signup apis
- setting expiration time for jwt token and cookies

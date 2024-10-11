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

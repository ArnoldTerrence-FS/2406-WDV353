# **Module 1 Notes** 
_March 7, 2024_

## What is Node JS? 

To put it simply, Node.Js is a Javascript runtime built on Chrome's V8 JavaScript Engine.  

_"In more detail, Node.js is an ascynchronous event-driven JavaScript runtime, designed to build scalable network applications."_  

Asynchronous can mean you don't have to wait for an action to happen for anything else to happen. 

## Using Modules in Node.js  

_Modules are units of independent and reusable code. A module encapsulates related functionality, variables, and functions, making it easier to organize and maintain a codebase. Modules help in code reusability and separation of concerns, enhancing the overall maintainability and scalability of an application._

**Creating a Module:**  

_To create a module, you typically write your code in a separate file and expose specific elements (e.g., functions, variables) using **module.exports** or **exports**._

For example, let's create a simple module named myModule.js:
  
"  
// myModule.js
const greeting = 'Hello, ';

function greet(name) {
  return greeting + name;
}

module.exports = {
  greet
};  
"  

_In this example, we're exporting a greet function._  

**Using a Module in Another File:**

To use the module in another file, you require it. Here's how you would use the myModule.js module in another file:  

"  
const myModule = require('./myModule');

console.log(myModule.greet('Alice')); // Outputs: Hello, Alice  
"  

_The require function loads the module and returns the exported elements, allowing you to use them in the current file._

### **Using npm to Grab Packages:**  


_npm (Node Package Manager) is a tool that comes with Node.js and is used to install, manage, and publish packages or modules._

**Installing Packages:**

_To install a package using npm, open your terminal and run the following command:_
"  
npm install <package-name>  
"  
_Replace <package-name> with the name of the package you want to install._

_For example, to install the popular axios package for making HTTP requests, you would run:_

"  
bashCopy code<code>npm install axios
</code>  
"  

**Saving Dependencies to package.json:**

_You can save the installed packages as dependencies in your package.json file. This helps others replicate your project setup and also makes it easier for you to install all the necessary packages in one go._

_To save a package as a dependency, use the --save flag while installing:_

"  
npm install <package-name> --save  
"  
_Or, you can use the shorthand:_  
"  
npm install <package-name> -S  
"  

_This will update your package.json file with the installed package and version information._

{
  "dependencies": {
    "axios": "^0.21.1"
  }
}

_These are the basics of using modules in Node.js and utilizing npm to manage packages, a crucial aspect of modern JavaScript development._

*************************************  
## Zoom Lecture Notes  
*************************************  

**Random Codes** 

To check your version of node:  
"  
node -v  
"  


To start a project:  
"  
npm init -y  
"  

**Useful Packages**  

* nodemon:
    Helps reset server and make changes. You must instal the package and add the code to the following 'scripts' section in package.json:

    "  
    "dev": "nodemon server" 
    "  

    then run:

    "  
    npm run dev  
    "  



* dotenc:  
    Not sure yet, but helps create environments for development. You must do certain steps which is:  
    * instal package
    * create a '.env' file with the 'Port:"<portnumber>" 
    * tell the .js file how to use it: "require('dotenv').config()"  

* express:
    Lightweight framework to work with node and http and other parts of node. can give router and develop faster. Express is not only build for rest api but also for creating applications.


**Special NOTE** 
Not sure what happened after the archive session. Will pause right here.


**Special function**  

******************  
## Starting Node.js
******************  

To start, there are a couple important things. (Be sure to connect a repository if needed.)

1. use the template for Node.js: 
    * create a file named <server.js> in your folder. 
    * add the template: 
        "  
        const http = require('http');

        const server = http.createServer((req, res) => {
            res.setHeader("Content-Type", "application/json");
            res.end()
        });

        const port = 3000;

        server.listen(port, () => {
        console.log(`listening on ${port}`);
        });  
        "
    * This template can vary. Be sure that the port is correct. currently, this template is using port "3000" which is localport.  

2. use the following command(after checking node):
    * npm init -y 
        * this helps to bring the node modules and packages
    * nom install nodemon
        * this is a dependancy that help refresh the server during development  

3. DON'T FORGET **.gitignore** for your repository  

4. Edit the <package.json> file for your nodemon
    * under "scripts" add the following:  

        "start": "node server.js",
        "dev": "nodemon server.js"  

    * when in development, use 'npm run dev' 
    * cntrl + C - to exit  

5. Figure out your PORT
    * local port is 3000. Port is always included, even when using the node framework <express>  




*****************************  
## HTTP Request and Response 
*****************************  

What seems to be important is addressing your server.js. You will have to edit your <server> variable constantly to make changes. 

**Important Methods to remember**  

* .createServer((res,req) => {})
    - We use <http.createServer()> to create a server and listen to it on port
    - the names 'res' (response) and 'req' (require) are the basic components of the method.  

* .listen(port, () => {})
    - We use this to make sure the server is on the right port

* .setHeader()  

* .end()  

**Notes from the course about HTTP Request**

_Client Sends a Request:_

_A client (e.g., web browser) initiates the process by sending an HTTP request to a server. This request includes specific information about what the client wants from the server, such as a webpage, a resource (like an image), or data from an API._

_The HTTP request consists of:_

**Method**: Specifies the action to be performed (e.g., GET, POST, PUT, DELETE).
**URL (Uniform Resource Locator)**: The address of the resource being requested.
**Headers**: Additional information about the request, like content type or authentication.
**Body (optional)**: Additional data, typically included in POST or PUT requests.

_HTTP methods, also known as HTTP verbs, define the actions that a client can request to perform on a resource. Here are some common HTTP methods:_

**GET**: Used to retrieve information from the server. It should not have any side effects on the server.
**POST**: Used to submit data to be processed to a specified resource. It often results in a change in the server's state.
**PUT**: Used to update a current resource with new data or create a new resource if it doesn't exist.
**DELETE**: Used to remove a specific resource.
**PATCH**: Used to partially update a resource.
**OPTIONS**: Used to describe the communication options for the target resource.
**HEAD**: Similar to GET, but it only retrieves the headers and is often used to check the server's availability.

_Server Processes the Request:_

_The server receives the request and processes it based on the method, URL, headers, and body. It determines the appropriate action to take based on the request._

_Server Generates a Response:_

_Based on the request, the server generates an HTTP response. The response includes:_

**Status Code**: A three-digit code indicating the outcome of the request (e.g., 200 OK, 404 Not Found, 500 Internal Server Error).
**Headers**: Additional information about the response, like content type or caching directives.
**Body (optional)**: Data returned by the server, such as HTML content or JSON data.

_HTTP status codes are three-digit numbers returned by the server to indicate the status of a client's request. They are grouped into different classes based on the first digit of the code:_

**1xx (Informational)**: Indicates that the request was received and understood.
**2xx (Success)**: Indicates that the request was successful.
**3xx (Redirection)**: Indicates that further action needs to be taken to complete the request.
**4xx (Client Errors)**: Indicates that there was an error on the client's side.
**5xx (Server Errors)**: Indicates that the server failed to fulfill a valid request.

_Some common status codes include:_

* 200 OK: Request succeeded.
* 201 Created: Request succeeded and a new resource was created.
* 400 Bad Request: The server cannot understand the request due to a client error.
* 404 Not Found: The server can't find the requested resource.
* 500 Internal Server Error: A generic error message returned by the server when an unexpected condition was encountered.
Understanding these HTTP methods and status codes is crucial for developing and debugging web applications using Node and JavaScript.

_HTTP Response:_

_The HTTP response is sent back to the client, containing the status code, headers, and body. The status code indicates the success or failure of the request._

_Client Processes the Response:_

* The client receives the response and processes it based on the status code and the content of the response body. For example, it might render a webpage if the request was for an HTML file, or parse JSON data if the request was for an API._

_Rendering the Webpage or Data:_

* If the request was for a webpage, the client renders the HTML content received in the response. If the request was for data (e.g., from an API), the client uses the response data for further processing, such as displaying information to the user.

_This request and response cycle repeats for every HTTP interaction between the client and the server, forming the basis of communication on the web._

_Understanding this cycle helps developers debug issues, optimize performance, and build efficient and effective web applications._

******************************  
## Installing and Using Express
******************************  

**Express** is a Node Js FrameWork. It helps hide and edit ports, api keys and more. It also simplfies the process of defining and handling routes. 

To connect env to your server, you can do the following: 

1. Install Express
    * using 'npm install express dotenv'

2. change the <server.js> file to this template:  
    "  
    const http = require('http');
    require("dotenv").config();

    const server = http.createServer()

    server.listen(process.env.port, () => {
    console.log(`listening on ${process.env.port}`);
    });  
    "  
    * Notice the line <require("dotenv").config();>
    * Notice the updated methods of <.createServer> and <.listen> 

3. Create a new file in your folder called '.env'  
    * you will want to add your <port> in here. for example:
        port = "3000"

After installing and making sure Express is being used properly, you can now make an express Application within your folder.  

1. Create a folder named 'app' within your folder.  

2. create a .js file named 'app.js' within your app folder.  

3. use the required template in your app.js:  
    "  
    const express = require("express");  
    const app = express();  
    "  

You can use the app now to replace responses that would originally be in your server.js with routes in your app folder. 

1. Export your app module in your index.js file
    * using 'module.exports = app;'  

2. connect your index.js to your server.js  
    * adding 'const app = require("./app/")' to the top
    * connect the app variable to your <.createServer()> to make it <createServer(app)>  

Our request and responses will now be handled in the express app.

Now, you will need a route handler to organize context. 


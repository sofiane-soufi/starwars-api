<h2>Star Wars API</h1><br />
<h3>How to setup the back-end</h3><br />
- Upload your the file main.php and .htaccess to any directory on a web server that supports PHP.<br /><br />

<h3>How to run the UI</h3><br />
- Install the dependencies needed by executing the command  
<code>npm install</code><br />
- Open the file /api/frontend/src/App.js in a text editor and replace the url at line 28: <code>fetch('http://34.220.231.208/'+page+'?'+args)</code> by the url of the webserver where the page main.php is hosted.<br />
- Run the script by executing the command <code>npm run</code>. <br />

The UI will now run on port 3000.


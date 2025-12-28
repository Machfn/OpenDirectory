<h1>Open Directory</h1>
<p>
    Open Directory is a file server tool that is intended to make it easy to quickly setup document databases. <br \>
    <strong> Feature Set: </strong> <br \>
    <ul>
    Password Protection <br \>
    Web GUI <br \>
    Easy Addition of Directories - Zero Programming Needed <br \>
    Easy toggling of feature - All done through txt files <br \>
    </ul>

    Open Directory is built on nodejs using express, pages are rendered server-side using ejs
    making the look of pages fully customizable with basic html and css
</p>



<h2>Getting Started</h2>
Option #1 => Use the install script **coming soon** <br \>
Option #2: <br \>
    Steps: <br \>
        1. Make sure you have Nodejs installed <br \>
        2. Download this repository <br \>
        3. Open a terminal at the installed directory <br \>
        4. Run 'npm i' to install all of the needed node modules <br \>
        5. Add the path of the folders you want to have available on your webserver to the whitelist (make sure you give the root path of folders! Look at the examples!) <br \>
        6. Adjust the config file to your liking (find the documentation under 'The Config File' header <br \>
        7. run 'npm start' to start the webserver <br \>


<h2>The Config File</h2>
File Name: config.txt <br \>
Setting Definitions:<br \>
    PORT -> Defines the port that the webserver runs on <br \>
    OWNER -> Defines the owner that is displayed on select pages <br \>
    AUTH -> Turns on password authentication for file access (1 = ON, 0 = OFF) <br \>
    PASSWORD -> Defines the password for authentication (Password needed to access files) <br \>
    SECRET -> Defines the secret key that is used to generate the password cypher **Only important when AUTH=1** <br \>
    AUTHTIMEOUT -> Defines the length of time a visitor will stay signed in **Only important when AUTH=1** <br \>


<h2>The Whitelist File</h2>
File Name: folderWhiteList.txt <br \>n
Any folder path's defined in this file will be made available on the server <br \>
Rules: <br \>
    Each folder path must be seperated by on a new line (or seperated by a '\n') <br \>
    **Example:** <br \>
        ~folderWhiteList.txt <br \>
            /home/user/directory1 <br \>
            /home/user/directory2 <br \>
            /home/user/directory3 <br \>



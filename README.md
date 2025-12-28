<h1 style="text-align: center;">Open Directory</h1>





<h2>Getting Started</h2>
Option #1 => Use this install script **coming soon**
Option #2:
    Steps:
        1. Make sure you have Nodejs installed
        2. Download this repository
        3. Open a terminal at the installed directory
        4. Run 'npm i' to install all of the needed node modules
        5. Add the path of the folders you want to have available on your webserver to the whitelist (make sure you give the root directory! Look at the examples!)
        6. Adjust the config file to your liking (find the documentation under 'The Config File' header
        7. run 'npm start' to start the webserver


<h2>The Config File</h2>
File Name: config.txt
Setting Definitions:
    PORT -> Defines the port that the webserver runs on
    OWNER -> Defines the owner that is displayed on select pages
    AUTH -> Turns on password authentication for file access (1 = ON, 0 = OFF)
    PASSWORD -> Defines the password for authentication (Password needed to access files)
    SECRET -> Defines the secret key that is used to generate the password cypher **Only important when AUTH=1**
    AUTHTIMEOUT -> Defines the length of time a visitor will stay signed in **Only important when AUTH=1**


<h2>The Whitelist File</h2>
File Name: folderWhiteList.txt
Any folder path's defined in this file will be made available on the server
Rules:
    Each folder path must be seperated by on a new line (or seperated by a '\n')
    **Example:**
        ~folderWhiteList.txt
            /home/user/directory1
            /home/user/directory2
            /home/user/directory3



<h1>Open Directory</h1>





<h2>Getting Started</h2>
Option #1 => Use this install script **coming soon** \n
Option #2: \n\t
    Steps: \n\t
        1. Make sure you have Nodejs installed \n
        2. Download this repository \n
        3. Open a terminal at the installed directory \n
        4. Run 'npm i' to install all of the needed node modules \n
        5. Add the path of the folders you want to have available on your webserver to the whitelist (make sure you give the root directory! Look at the examples!) \n
        6. Adjust the config file to your liking (find the documentation under 'The Config File' header \n
        7. run 'npm start' to start the webserver \n


<h2>The Config File</h2>
File Name: config.txt \n
Setting Definitions:\n\t
    PORT -> Defines the port that the webserver runs on \n
    OWNER -> Defines the owner that is displayed on select pages \n
    AUTH -> Turns on password authentication for file access (1 = ON, 0 = OFF) \n
    PASSWORD -> Defines the password for authentication (Password needed to access files) \n
    SECRET -> Defines the secret key that is used to generate the password cypher **Only important when AUTH=1** \n
    AUTHTIMEOUT -> Defines the length of time a visitor will stay signed in **Only important when AUTH=1** \n


<h2>The Whitelist File</h2>
File Name: folderWhiteList.txt \n
Any folder path's defined in this file will be made available on the server \n
Rules: \n\t
    Each folder path must be seperated by on a new line (or seperated by a '\n') \n
    **Example:** \n\t
        ~folderWhiteList.txt \n\t
            /home/user/directory1 \n
            /home/user/directory2 \n
            /home/user/directory3 \n



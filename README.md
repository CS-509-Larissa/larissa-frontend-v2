# CS 509 Team Larissa

## Use Cases

### User Registration

**Since our lambda functions take awhile, the webpage will not know you are logged in until the `/me` endpoint responds. Just give it a couple minutes if you are using it for the first time in awhile**

To sign up, click the signup button in the top bar. You will fill out a form with a username and password, then click submit. Once you are registered, you will be sent back to the homepage.

To login, click the login button in the top bar. You will fill out a similar form to the one for signing up, and then you will be returned to the homepage once logged in.

To logout, click the logout button in the top bar. It will only be visible if you are already logged in.

### Create Top-Level Classification

To create a classification, click the blue "Add Classification" button on the left side of the screen. It will give you the option to set a name, but it won't let you pick a parent classification since only top-level classifications are supported.

### Create Algorithm

To create an algorithm, click the green "Add Algorithm" button ont he left side of teh screen. It will take you to a form where you will fill out details about the algorithm, and select the proper classification.

### Create Implementation

To create an implementation, select an existing algorithm from the treeview on the left side of the screen. Once the algorithm page loads, you will see a section called **Implementations**. Below it, there is a form where you can upload a file. Upload a text file, then click the yellow "Upload Implementation" button

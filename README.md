Web-comic host site
MERN STACK
Currently Deployed Version: http://ec2-3-21-56-228.us-east-2.compute.amazonaws.com/

Brief Introduction:
This is the code for a WIP website that is planned to eventually host a web comic potentially created by my friends. 

So far the base has been created such that new entries can be uploaded, browsed through and viewed in a manner similar to other sites. With this said, core functionality is up and running. The next intended step is to add in a more universal login system such as OAuth2 and scrap the old placeholder user account system. By implementing this, it will become easier to create comment, favorite,e-mail notification systems, among other features for potential users.

The code is built using Node.JS in a MERN stack framework, and the Database used is MongoDB via Atlas, deployed to an EC2 T2.Micro instance from AWS.

Current Progress:
- React Client built
- Server Frame built
- Established connection to mongoDB atlas
- Can load pages/images from the DB onto the webpage (server endpoints made, basic api)
- Established browsing links to each page in the DB from the frontend (that is to say potential comics should now be individually viewable)
- Added in user login/token system for regular users and admins
- Added comic upload feature for administrators
- Deployed test version to ec2 at: http://ec2-3-21-56-228.us-east-2.compute.amazonaws.com/
- Added Register Functionality for guests
- Added small profile functionality to users
- Added about authors page
- Added functional buttons to view previous or next comic "Issues"

Next Steps:
- Clean up website appearance, replace assets with custom art/designs
- Fix issue where Dropdown menu requires 2 clicks to open on initial refresh/render
- Add a way to logout a user without closing browser
- Add User Favorites list for comics

Down The Line:
- Add email verification system
- Add Password Recovery System
- Possibly scrap current user login/registration system in favor of OAuth2
- Add comment system for users to give feedback/thoughts on comics
- Add protected routes (security currently handled by encrypted tokens/cookies)






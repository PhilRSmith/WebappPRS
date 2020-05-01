Web-comic host site
MERN STACK
Currently Deployed Version: http://ec2-3-21-56-228.us-east-2.compute.amazonaws.com/

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
- Fix issue where Dropdown menu requires 2 clicks to open on initial refresh/render
- Add a way to logout a user without closing browser
- Clean up website appearance, replace assets with custom art/designs
- Add User Favorites list for comics

Down The Line:
- Add email verification system
- Add Password Recovery System
- Possibly scrap current user login/registration system in favor of OAuth2
- Add comment system for users to give feedback/thoughts on comics
- Add protected routes (security currently handled by encrypted tokens/cookies)






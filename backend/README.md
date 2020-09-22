# DoodleUp Backend

---

## API Endpoint

___

placeholder(replace localhost after hosting)

## Available APIs

___

`localhost:88888/asseturl?file_location=assets/<string:filename>`

`localhost:88888/asseturl?file_location=assets/soundFX/<string:filename>`

- **GET**: Get the url of the asset on Firebase Storage

`localhost:88888/signup`

- **POST**: Add User in firebase authentication and add an entry in realtime database
- Requires form(username, email, password)

`localhost:88888/signin`

- **POST**: Check if user exists
- Requires form(username, email, password)

`localhost:88888/resetpassword?email=<string:email>`

- **GET**: Get the result on whether password reset email is successfully sent

`localhost:88888/accountinfo/<string:idToken>`

- **GET**: Get user info - token, email

`localhost:88888/user/<username>`

- **GET**: Get result on whether user exists using Realtime database

`/autosave`

- **POST**: 

`/save`

- **POST**: 

`/progress?username=<string:username>&story=<string:index>`

- **GET**: Get user's progress for the selected story, else initialize


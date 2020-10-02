# DoodleUp Backend

## TODO

Progress saving of drawn photo

- Accept file from React Js -> store in flask working dir
- Upload file to Storage -> return Storage link
- Write Storage link & Username to Realtime Database 

## API Endpoint

`https://tanshengrong.pythonanywhere.com/`

## Available APIs

### User Endpoints 

`/signup`
- **POST**: Add User in firebase authentication and add an entry in realtime database
- Form Parameters: 
  - `username`
  - `email`
  - `password`
- Returns:
  - `200, "User created"`
  - `200, "The username has been taken"`
---
`/signin`

- **POST**: Check if user exists
- Form Parameters: 
  - `email`
  - `password`
- Returns:
  - `200, "Account successfully logged in"`
  - `400, "Does not exist, please create an account"`
---
`/accountinfo/:idToken`

- **GET**: Get user info - token, email
- Returns:
  - `200, Successful`
  - `400, Invalid token` 
---

### Game Progress Endpoints

`/progress?username=popo&storyid=001`
- **GET**: Gets the story progress of given story id. If story has never been started, the story progress gets initialized and returned. You can try the above endpoint to see.
- Returns:
``` 
{
stages: [
      {
        image_url: "www.google.com",
        stage_id: 1.1,
        status: "completed"
      },
      {
        image_url: "",
        stage_id: 1.2,
        status: "incomplete"
      }
]}
```

`/progress` [WIP: File saving management]

- **POST**: Saves story progress. Take note storyid is sensitive and shouldn't be an integer (e.g. 001 not 1). Integers will fk it up.
- Parameters:
  - `username`
  - `storyid`
- Returns:
  - `200, "Progress Saved"`
---
### Story Content Endpoints
`/content?storyid=001`
- **GET**: Gets the story content for given storyid. Above url works.
- Returns:
```
{
cover_image: "--imgblob--",
id: "001",
story_title: "Story 1",
stages: [
    {
      answer: "dog",
      description: "Once upon a time, there was a ___.",
      image: "--imageblob--",
      options: {
        bird: "--audiourl--",
        cat: "--audiourl--",
        dog: "--audiourl--",
        mouse: "--audiourl--"
      },
      type: "guessing"
    },
    {
      description: "Best drawing",
      image: "--imageblob--",
      type: "drawing"
    }
]}
```
else `400, "Story content not found"`
---
`/content`
- **POST**: For internal use.


---
### Testing and Other Endpoints



`https://tanshengrong.pythonanywhere.com/asseturl?file_location=assets/<string:filename>`

`https://tanshengrong.pythonanywhere.com/asseturl?file_location=assets/soundFX/<string:filename>`

- **GET**: Get the url of the asset on Firebase Storage


## Tools used

- [Firebase Authentication, Realtime Database, Firebase Storage](https://firebase.google.com)
- [Python Anywhere](https://www.pythonanywhere.com)

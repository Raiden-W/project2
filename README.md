# Retro Wasteland

## Description

A community platform allowing users to collect nostalgic items and share their stories about these retro things.

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault.
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault.
- **homepage** - As a user I want to see the homepage to have an overall concept and information about the website.
- **nav bar** - As a user I want to signup/ login and easily access the homepage, my profile, the item library and story page from anywhere of the whole website.
- **Nostalgia Library** - As a user I want to browse all the existing retro items even if I haven't logged in.
- **Stories** - As a user I want to browse all the stories shared by other users even if I haven't logged in.
- **item page** - As a user I want to see a specific item's page to know its detailed description and all the stories about this item.
- **sign up** - As a user I want to sign up and create a new account.
- **login** - As a user I want to log in and keep my authentication status so I can start to collect items and share my stories.
- **profile** - As a user I want to see all my collected items and stories about them, and also can edit my profile info.
- **story create/item collect** - As a user I want to collect an item and create my own story about the item to share it on the webpage.
- **story edit/delete** - As a user I want to edit or delete my stories from my profile.
- **item create** - As a user I want to create an item I want but doesn't exist in the library, and I can upload images and fill some details about this item.

## Backlog

List of other features outside of the MVPs scope

User profile:

- see my profile
- edit and save profile info and upload my profile picture
- see other users profile
- list of items colleced by myself/ another user
- list of stories created by myself/ another user
- click one item in the list to locate the item's story

Pop-up modals:

- when successfully created/edited a story, a message pops up to notify and gives a button to link to profile
- when successfully created a new item, a message pops up to notify
- the pages redirect after the pop-up message shows for 1.5s
- when hitting the story delete button, a message pops up to ask you to double-check the operation, you can either confirm or cancel

## ROUTES:

- GET /

  - renders the homepage

- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form
- POST /auth/signup
  - redirects to /profile if user logged in
  - renders the signup form if new user's password is weak or name already exists or passwords do not match in double-check
  - body:
    - username
    - password
    - passwordCheck
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form
- POST /auth/login
  - redirects to /profile if user logged in
  - renders the login form if username or password incorrect
  - body:
    - username
    - password
- POST /auth/logout

  - redirects to /login if user logged out
  - body: (empty)

- GET /nostalgia-lib

  - renders the nostalgic items library page
  - collect button to let user collect and create story on every item card

- GET /create-item
  - redirects to /auth/login if user didn't log in
  - renders create item form
- POST /create-item

  - redirects to /item/some-new-item-id if user successfully created a new item
  - body:
    - name
    - shortInfo
    - longInfo
  - [files]:
    - path

- GET /item/:itemId

  - renders the specific item page
  - includes the list of stories of this item
  - collect button to let user collect and create story on this item

- GET /stories
  - renders the page displaying all the existing stories
- GET /stories/:itemId/create-story
  - redirects to /profile/#some-collected-item if user has already colletced the same item and created a story before
  - renders the create story form
- POST /stories/:itemId/create-story
  - redirects to /profile/#some-newly-collected-item after user successfully colletced this item and created a story
  - body:
    - text
- GET /stories/edit/:storyId
  - renders the edit story form
  - passes the old story.text to the form
- POST /stories/edit/:storyId
  - redirects to /profile/#some-collected-item after user altered the story of this item
  - body:
    - text
- GET /stories/delete/:storyId

  - redirects to /profile after user deleted this story

- GET /profile
  - redirects to /auth/login if user didn't log in
  - automatically creates a default profile if user does not has one
  - renders the profile page
  - includes the list of stories created by this user
- GET /profile/edit
  - redirects to /auth/login if user didn't log in
  - renders the edit profile form
  - passes the old profile info to the form
- GET /profile/:userId
  - renders the profile page of any user
  - includes the list of stories created by any user
  - hides all the edit, delete and log out buttons
- POST /profile/edit
  - redirects to /profile after user altered the profile info
  - delete the old profile picture in Cloudinary by its filename and restore the filename of the new profile picture
  - body:
    - birth
    - intro
  - file:
    - path
    - filename

## Models

User model

```
username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    },
password: {
    type: String,
    required: true
}
```

Nostalgic item model

```
name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    },
imgUrl: {
    type: [String],
    required: true,
},
shortInfo: {
    type: String,
    Default: 'Feel kind of nostalgic huh?',
},
longInfo: {
    type: String,
    Default: `Nostalgia is associated with a longing for the past, its personalities, possibilities, and events, especially the "good ol' days" or a "warm childhood`,
},
collectedBy: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
},
createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
},
stories: {
    type: [Schema.Types.ObjectId],
    ref: 'Story',
},
```

Story model

```
text: {
    type: String,
    required: true,
},
itemId: {
    type: Schema.Types.ObjectId,
    ref: 'Nostalgic item',
},
createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
}
```

Profile model

```
picUrl: {
    type: String,
    default:
    'https://res.cloudinary.com/duo0ik2tp/image/upload/v1682958685/default-profile-pic_qmwhbo.jpg',
},
oldPicFilename: String,
intro: {
    type: String,
    default: 'The user does not have any introduction.',
},
birth: String,
createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
},
```

## Links

### Trello

[Link to trello board](https://trello.com/b/gTYOvptP/project2-ironhack)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/sarahpst/project2)

[Deploy Link](https://retro-watseland.adaptable.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/18C3J2RxF5_vpOuRojMMD_Rgb14yOTYcXnQQqRSpr_Ys/edit?usp=sharing)

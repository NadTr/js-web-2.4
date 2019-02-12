# Welcome to the exercise 2.4 of Becode js-web

For this exercise, I use the Becode Template

To see the result on [GithubPage](https://nadtr.github.io/js-web-2.4/)



## The exercise:  **Character Manager**

In this exercise we will use the [Character Database API](https://character-database.becode.xyz/) to make a Character Manager.

#### 2.4.1 - List the characters

Display the list of all the characters contained in the database. You can use a table or a list of cards to display them, at your convenience.

Make sure the following fields are displayed:

* `name`
* `short_description`

#### 2.4.1 - Display image

Also add the image in your list of characters.

**Hint**: [Data URIs](https://css-tricks.com/data-uris/)

#### 2.4.2 - Long description

When we click on one of the characters in the list, display a [modal window](https://en.wikipedia.org/wiki/Modal_window) that will show all the information about that specific character including the `description` field. You can use the modals provided by Bootstrap or any other solution as long as it looks and work like a model. Also be warned that the `description` field is in Markdown and, of course, we want to display it as HTML in your application.

#### 2.4.3 - Creation of a character

Add a "Create" button that will open a modal. That modal should contain a form with an input for each of the following fields:

* `name`
* `shortDescription`
* `description` (you can just let the user enter Markdown)

When the form is completed create the character, close the modal and reactualize the list of characters.

#### 2.4.4 - Edition of a character

Add an edit button next to each character in the list. When clicked it opens a modal allowing to edit the character.

#### 2.4.5 - Images edition

Modify both the create and edit modals to allow the edition of the image.

**Hint**: [Reading local files in JavaScript](https://www.html5rocks.com/en/tutorials/file/dndfiles/)

#### 2.4.6 - Delete

Add a "Delete" button to delete characters. It should display a modal asking for confirmation.

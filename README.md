# BackTREK

## Introduction

For this project we'll be returning to the TREK API, using Backbone to build an application that can handle data in complex ways.

This is an individual, [stage 2](https://github.com/Ada-Developers-Academy/pedagogy/blob/master/rule-of-three.md#stage-2) project.

## Learning Goals

- Generate HTML using Underscore templates
- Use Backbone and jQuery to work with a complex API
- Manage application data using Backbone models and collections
- Build an attractive, robust, and feature-rich user interface

## General Requirements

The code you write should obey the following rules:

- Use Backbone's event workflow. Code that responds to DOM events should be separate from code that updates the DOM.
- Any dynamic elements on the page shall be rendered using Underscore templates
- Any errors encountered while interacting with the API shall be politely reported to the user

## Wave 1: Displaying Data

In wave 1, you'll use our new functionality (Underscore templates, Backbone models and collections) to achieve feature parity with the original TREK project.

- A user can click a link to see a list of trips
- A user can click on a trip to see details of that trip

## Wave 2: Creating Data

In wave 2, your focus should be on sending data to the server and handling the response. Remember to pay careful attention to error handling!

- A user can create a new trip
- A user can reserve a spot on a trip
  - Question: is Backbone API integration useful here? How would this work? What other options are there?

## Wave 3: Organizing Data

### Sorting

Users should be able to sort the list of trips by:
- Name
- Category
- Continent
- Duration
- Budget

### Filtering

Add a form to the top of your site. The form should have a dropdown to select `Name`, `Category`, `Continent` or `Max Budget`, as well as a text box.

When the user types in the text box, the list of trips will be filtered to only show trips that match.
- What does it mean for a trip to match?

The list of displayed trips should be updated with every keystroke. This means that making a new query against the API every time will be too slow. Instead, you should filter your list in JavaScript.

Your app should gracefully handle the case where none of the trips match the filter.

## Optional Wireframes

These wireframes are optional. Some of the content matches closely with what we've done before, but some (such as getting validation failures to appear inline) is quite challenging!

For an extra challenge, once a user has attempted to submit a form unsuccessfully and validation errors have been shown, have the errors resolve themselves as the user types.

#### Normal View

![Normal View](images/wireframe.jpg)

#### Add-Trip Modal

Foundation includes modal functionality, but it can be tricky to get it to work right. Instead, [roll your own](https://www.w3schools.com/howto/howto_css_modals.asp)!

![Add Trip Modal](images/wireframe-modal.png)

We're building a demonstration of an e-commerce reporting platform.The layout will start with a typical login page centered in a white box on a dark background. 

The rest of the app will have a typical layout to common Software as a Service platforms with a left sidebar featuring main areas of interest with sub-menus, a center area for content, a header bar, and then also an off-canvas menu that slides in from the right anytime you add or edit a table row.

The pages just showing data must have responsive tables with headers that are sticky as you scroll down the page. Headers must be clickable to sort, and include search, download, date-range, and a picker to select which types of headers should be available to see. Many also need a "Total" row at the bottom

The dashboard page is a modular grid of items which will have some sort of method to drag/drop items into the grid, expand them to be larger/smaller, and re-arrange them. Empty grid items should be clickable for adding elements via a modal. 

## Left sidebar content:

Dashboard
Inventory
 - Categories
 - Groups
 - Retail Products
Management
 - Customers
 - Users
Payment
 - Cash
 - Check
 - Credit Card
Purchase
 - Canceled Purchases
 - Completed Purchases
 - Open Purchases
 Feedback/Support

## Header Content

Company Name
Location Picker
Support Link
User (logged in indicator)

## Dashboard Content

- modularized grid 4 cols 2 rows.
- Include a user profile image, name, title
- Payment bar chart over the past week. Bars split into cash/check/creditcard/giftcard section
- New customer list (name, email, date added)
- Low inventory list (item name, sku, qty)
- Purchases line graph over last week. Show 2 lines, 1 for purchases, 1 for cancelled
- Quick Links
- customize dashboard layout button
- Modal to add widgets to dashboard. Maybe pick a widget type like "line graph, bar graph, etc, and then the data you want represented, and then a timeframe." After adding, use UI elements to say "expand this to the next grid section"

## General tech needed

- Icons (iconify)
- Responsive, smart, customizable and sortable tables
- A Demo method of storing & displaying table data WITHOUT a database. This will just be a demo SPA app. 
- Fancy looking charts and graphs for the home page
- Let's use Vue for this demo

## Design
 - We want a dark, cool gray background with white "surface" areas
 - As far as the dashboard grid, look at example.webp in this directory. It is not a 1 to 1 design, but it gives you a general sense of the grid layout we want to achieve.
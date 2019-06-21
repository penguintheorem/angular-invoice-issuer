#######README

#to run the app

- run "npm install" from the command line.

- run "ng serve" to start the dev server on http://localhost:4200. 

- run "ng test" to start unit testing.

#notes

- the main "invoice maker module" has been loaded lazily after 
passing for the Home.

- for the "invoice cost calculator" i've choosen the "OnPush" detection changes
strategy to get better performance, having some runtime calculation.

- i've preferred to separe the form and the products table.

- i've added some error messages, an additional button to remove the discount and inserting again. Hoping interpreted requirements correctly.

- i've just added some example unit testing for some business logic calculations.

#further developments

- more unit testing.

- improve UI.

- a custom (not boostrap) responsive design for the UI.

- improve error management.

- ...
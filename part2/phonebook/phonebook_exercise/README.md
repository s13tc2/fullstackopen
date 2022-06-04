# Exercises 2.6 - 2.10 and 2.15 - 2.18

[Forms](https://fullstackopen.com/en/part2/forms)

1. Let's create a simple phonebook. In this part we will only be adding names to the phonebook. Let us start by implementing the addition of a person to phonebook.
2. Prevent the user from being able to add names that already exist in the phonebook. JavaScript arrays have numerous suitable methods for accomplishing this task. Keep in mind how object equality works in Javascript. Issue a warning with the alert command when such an action is attempted
3. Expand your application by allowing users to add phone numbers to the phone book. You will need to add a second input element to the form (along with its own event handler)
4. Implement a search field that can be used to filter the list of people by name
5. If you have implemented your application in a single component, refactor it by extracting suitable parts into new components
6. Currently, the numbers that are added to the phonebook are not saved to a backend server. Fix this situation.
7. Extract the code that handles the communication with the backend into its own module by following the example shown earlier in this part of the course material.
8. Make it possible for users to delete entries from the phonebook. The deletion can be done through a dedicated button for each person in the phonebook list. 
9. Change the functionality so that if a number is added to an already existing user, the new number will replace the old number. 
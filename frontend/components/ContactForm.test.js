import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

beforeEach(() => {
    render(<ContactForm/>)
})

const header = () => screen.queryByText('Contact Form', { exact: false })
const firstNameInput = () => screen.getByPlaceholderText("Edd")
const errorMessage = () => screen.queryByText('Error:', { exact: false })
const submitBtn = () => screen.queryByText('Submit', { exact: false })
const errorMessages = () => screen.getAllByText('Error:', { exact: false })
const lastNameInput = () => screen.getByPlaceholderText("Burke")
const emailInput = () => screen.getByPlaceholderText("bluebill1049@hotmail.com")

describe('Contact Form component - Finished Tests', () => {
    test('renders without errors', () => {
        //Passes as is_handled in beforeEach above
    });
    
    test('renders the contact form header', () => {
        expect(header()).toBeVisible()
        expect(header()).toBeInTheDocument() 
    });
    
    test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
        fireEvent.change(firstNameInput(), { target: { value: 'Debi' } })
        expect(errorMessage()).toBeVisible()
    });

    test('renders THREE error messages if user enters no values into any fields.', async () => {
        fireEvent.click(submitBtn())
        expect(errorMessages()).toHaveLength(3)
    });
    
    test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        fireEvent.change(firstNameInput(), { target: { value: "Luffy"} })
        fireEvent.change(lastNameInput(), { target: { value: "D.Monkey"} })
        fireEvent.click(submitBtn())
        expect(errorMessage()).toBeVisible()
    });
})

/************************************************************************* */



test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

beforeEach(() => {
    render(<ContactForm/>)
})

const firstNameInput = () => screen.getByPlaceholderText("Edd")
const lastNameInput = () => screen.getByPlaceholderText("Burke")
const emailInput = () => screen.getByPlaceholderText("bluebill1049@hotmail.com")
const errorMessage = () => screen.queryByText('Error:', { exact: false })

test('renders without errors', () => {
    //Passes as is_handled in beforeEach above
});

test('renders the contact form header', () => {
    const header = screen.queryByText('Contact Form', { exact: false })
    expect(header).toBeVisible()
    expect(header).toBeInTheDocument() 
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    fireEvent.change(firstNameInput(), { target: { value: 'Debi' } })
    expect(errorMessage()).toBeVisible()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

});

test('renders all fields text when all fields are submitted.', async () => {

});

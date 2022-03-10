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
const messageInput = () => screen.queryByLabelText("Message")

describe('Contact Form component - Finished Tests', () => {
    test('t1: renders without errors', () => {
        //Passes as is_handled in beforeEach above
    });
    
    test('t2: renders the contact form header', () => {
        expect(header()).toBeVisible()
        expect(header()).toBeInTheDocument() 
    });
    
    test('t3: renders ONE error message if user enters less then 5 characters into firstname.', async () => {
        fireEvent.change(firstNameInput(), { target: { value: 'Debi' } })
        expect(errorMessage()).toBeVisible()
    });

    test('t4: renders THREE error messages if user enters no values into any fields.', async () => {
        fireEvent.click(submitBtn())
        expect(errorMessages()).toHaveLength(3)
    });

    test('t5: renders ONE error message if user enters a valid first name and last name but no email.', async () => {
        fireEvent.change(firstNameInput(), { target: { value: "Luffy"} })
        fireEvent.change(lastNameInput(), { target: { value: "D.Monkey"} })
        fireEvent.click(submitBtn())
        expect(errorMessage()).toBeVisible()
    });

    test('t6: renders "email must be a valid email address" if an invalid email is entered', async () => {
        fireEvent.change(emailInput(), { target: { value: 'karaokePanda@gmail' } })
        const emailError = screen.queryByText('Error: email must be a valid email address.')
        expect(emailError).toBeVisible()
    });
    test('t7: renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
        fireEvent.change(firstNameInput(), { target: { value: "Retsuko" } })
        fireEvent.change(emailInput(), { target: { value: 'karaokePanda@gmail.com' } })
        fireEvent.click(submitBtn())
        const lastNameError = screen.queryByText('Error: lastName is a required field.')
        expect(lastNameError).toBeVisible()
    });
    test('t8: renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
        fireEvent.change(firstNameInput(), { target: { value: "Luffy"} })
        fireEvent.change(lastNameInput(), { target: { value: "D.Monkey"} })
        fireEvent.change(emailInput(), { target: { value: 'strawHatcaptain@gmail.com' } })
        fireEvent.click(submitBtn())
        
        await screen.findByText('You Submitted:')
        await screen.findByText('First Name:', { exact: false })
        await screen.findByText('Last Name:', { exact: false })
        await screen.findByText('Email:', { exact: false })
        
        const messagePost = screen.queryByText('Message: ')
        expect(messagePost).not.toBeInTheDocument()    
    });
    
    test('t9: renders all fields text when all fields are submitted.', async () => {
        fireEvent.change(firstNameInput(), { target: { value: "Luffy"} })
        fireEvent.change(lastNameInput(), { target: { value: "D.Monkey"} })
        fireEvent.change(emailInput(), { target: { value: 'strawHatcaptain@gmail.com' } })
        fireEvent.change(messageInput(), { target: { value: "I'm gonna be king of the pirates!" } })
        fireEvent.click(submitBtn())
            
        await screen.findByText('You Submitted:')
        await screen.findByText('First Name:', { exact: false })
        await screen.findByText('Last Name:', { exact: false })
        await screen.findByText('Email:', { exact: false })
        await screen.findByText('Message:', { exact: false })
    });
})

/************************************************************************* */



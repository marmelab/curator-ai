
// Handle the email submission for registration
async function submitEmail(event) {
    event.preventDefault(); // Prevent the default form submission, i.e. let this function handeling it

    // Get the filled value for the email
    const email = document.getElementById('email').value;

    try {
        // Call the specified route
        const response = await fetch('/submit-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        // Get the response of the call
        const result = await response.json();
        if (response.ok) {
            // If everything went all right
            // We send the response as an alert
            alert(result.message);
        } else {
            // If something went wrong
            // We send the response as an alert
            alert(result.message);
        }

    } catch (error) {
        // Tell in the console that an error occures
        console.error('Error submitting email:', error);
        // Send the following message as an alert
        alert('Error during registration. Please try again later.');
    }
}

window.submitEmail = submitEmail;
async function submitEmail(event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;

  try {
      const response = await fetch('/submit-email', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
      });

      const result = await response.json();
      if (response.ok) {
          alert(result.message); 
      } else {
          alert(result.message);
      }

  } catch (error) {
      console.error('Error submitting email:', error);
      alert('Error during registration. Please try again later.');
  }
}

window.submitEmail = submitEmail;
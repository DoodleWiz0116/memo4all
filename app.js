// app.js
const input = document.getElementById('input');

input.addEventListener('input', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/input', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: input.value }),
    });

    if (response.ok) {
      console.log('User input submitted successfully');
    } else {
      console.error('Error submitting user input');
    }
  } catch (error) {
    console.error(error);
  }
});
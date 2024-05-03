const textContainer = document.getElementById('text-container');
let lastEntryTime = Date.now();

textContainer.addEventListener('input', () => {
  const currentTime = Date.now();
  const elapsedTime = currentTime - lastEntryTime;

  if (elapsedTime >= 5 * 60 * 1000) {
    const text = textContainer.innerText;

    fetch('/api/entry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Entry saved:', data);
        lastEntryTime = currentTime;
      })
      .catch((error) => {
        console.error('Error saving entry:', error);
      });
  }
});
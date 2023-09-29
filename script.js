if (!window.localStorage.getItem('uid')) {
  window.location = '/start/'
}

async function run() {
  const response = await fetch('https://zymono.com/myschoolapi/getschool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid: window.localStorage.getItem('uid') }),
  });

  if (response.ok) {
    const school = await response.json();
    // console.log(school)

    document.getElementById('report').addEventListener('submit', function(event) {
      event.preventDefault()

      document.getElementById('button').disabled = true
      document.getElementById('button').textContent = 'Loading...'
      
      const apiKey = 'db2e08783da783967be5eb3f488a1e6a';
      const apiUrl = 'https://api.imgbb.com/1/upload';

      const formData = new FormData();
      const inputFile = document.getElementById('image-input').files[0];
      formData.append('image', inputFile);
      formData.append('key', apiKey);
      fetch(apiUrl, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const imageUrl = data.data.url;

            fetch('//zymono.com/api/report', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id: school.school, //Panel Key from https://zymono.com/me/ (Same as API key)
                user: document.getElementById('name').value, //User being reported
                imgURL: imageUrl, //Url of an image for evidence (You can leave this blank)
                reason: document.getElementById('reason').value, //Reason for report
                device: window.location.hostname //Platform (E.g. Minecraft, Xbox, Discord, etc)
              })
            })
            .then(function(res) {
              window.location = '/reported/'
            })
          }
        })
    })
  } else {
    window.location = '/start/'
  }

  console.log(response)
}

run()
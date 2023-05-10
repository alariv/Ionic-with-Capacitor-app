function sendRequest() {
	const input = document.getElementById("numberInput").value;
	const url = `https://reqres.in/api/users/${input}`;
	fetch(url)
	  .then(response => response.json())
	  .then(data => {
		const obj = JSON.parse(JSON.stringify(data))
		nimi.innerHTML = JSON.stringify("Nimi: " + obj.data.first_name + " " + obj.data.last_name).replace(/"/g, '');
		email.innerHTML = JSON.stringify("Email: " + obj.data.email).replace(/"/g, '');
		pilt.innerHTML = "<img src='" + JSON.stringify(obj.data.avatar).replace(/"/g, '') + "' style='width: 300px'> "
		
	  })
	  .catch(error => console.error(error)); // kuvab konsoolis veateate
}
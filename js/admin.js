let userInp = document.querySelector(".user-inp");
let passInp = document.querySelector(".pass-inp");
let registerForm = document.querySelector(".login-form");

registerForm.addEventListener("submit", async(e) => {
  try {
    e.preventDefault();
		let username = userInp.value;
		let password = passInp.value;
		if (username !== '' && password !== '') {
			let auth = await fetch('https://dummyjson.com/auth/login', {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify({
					username,
					password,
				}),
			});
			let res = await auth.json();
			if (res.token) {
				localStorage.setItem('access_token', res.token);
				localStorage.setItem('userId', res.id);
				location.href = '/pages/index.html';
			} else {
				localStorage.removeItem('access_token');
			}
		}
	} catch (err) {
		console.log(err);
	}
	
});
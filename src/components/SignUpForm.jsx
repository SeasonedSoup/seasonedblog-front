import { useState } from "react";

function SignUpForm() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function signup(e) {
        e.preventDefault();

        const url = "http://localhost:8000/api/signup"

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({
                username,
                email,
                password
                }),
            });

            if(!result.ok) {
                throw new Error(`Error status: ${result.status}`);
            }
            
            const data = await result.json();
            console.log('Success:', data);
            alert('Sign-up successful!');

        } catch(error) {
            console.error(error);
            alert("Signup failed check console.")
        }
    }
    return (
        <>
            <h1>Sign-Up Form</h1>

            <form method="POST" onSubmit={signup}>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label htmlFor="email">Email:  </label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}/>

                <button>Submit</button>
            </form>
        </>
    )
}

export default SignUpForm;

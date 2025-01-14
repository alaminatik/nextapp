import React from 'react'

import { useRouter } from 'next/router'; // Correct hook for navigation
import swal from 'sweetalert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    marginTop: theme.spacing(5),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  card: {
    maxWidth: 500,
    margin: '20px auto',
    padding: theme.spacing(3),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}));




export default function LoginPage() {
  const router = useRouter();
  const classes = useStyles();

  const navigateToHome = () => {
    router.push('/'); // Example navigation to '/home'
};

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.currentTarget); // Get form data
    const email = formData.get('email'); // Extract email
    const password = formData.get('password'); // Extract password

    try {
      // Send a POST request to the API
      const response = await fetch('http://127.0.0.1:8000/api/sanctum/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to the profile page on success
        const responseData = await response.json();
        localStorage.setItem('accessToken', responseData.data.token);
        localStorage.setItem('userId', responseData.data.id);
        localStorage.setItem('user', JSON.stringify(responseData.data));
        // console.log(response);
        router.push('/profile');
      } else {
        const errorData = await response.json(); // Parse error response
        swal('Error', response ? errorData.message: '' || 'Invalid credentials.', 'error');
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Sign In</h2>
        <p className="text-dark">Enter your credentials to continue</p>
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label htmlFor="email" className="form-label fw-medium text-dark">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control form-control-lg shadow-sm border-primary"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* Password input */}
      <div className="mb-4">
        <label htmlFor="password" className="form-label fw-medium text-dark">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control form-control-lg shadow-sm border-primary"
          placeholder="Enter your password"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className={classes.submit}
      >
        Login
      </button>

      
    </form>
  );
}

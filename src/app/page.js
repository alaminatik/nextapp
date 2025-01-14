"use client"; // Ensures this is treated as a Client Component

import { useRouter } from 'next/navigation'; // Correct hook for navigation

export default function LoginPage() {
  const router = useRouter();

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
        localStorage.setItem('accessToken', responseData.token);
        localStorage.setItem('userId', responseData.id);
        localStorage.setItem('user', JSON.stringify(responseData));
        // console.log(response);
        router.push('/profile');
      } else {
        const errorData = await response.json(); // Parse error response
        console.error("Login failed:", errorData.message || "Unknown error");
        // Optionally, display an error message to the user
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-5 p-5 border rounded shadow-lg bg-white">
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
        className="btn btn-primary w-100 py-2 fs-5 shadow-sm hover-effect"
      >
        Login
      </button>

      
    </form>
  );
}

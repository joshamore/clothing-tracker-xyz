import { useState } from 'react';
import { supabase } from '../helpers/supabaseClient';
import Navbar from '../components/Navbar';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState(null);

  const validatePasswordMatch = () => {
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    setLoading(true);
    setValidationError(null);

    // Validating password input
    const validatePassword = validatePasswordMatch();
    if (!validatePassword) {
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      alert('Check your email for your confirmation link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <h1>Sign Up</h1>

      <div>
        <input
          type='email'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type='password'
          placeholder='Repeat Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {validationError && <em>{validationError}</em>}

      <br />

      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          disabled={loading}
        >
          {loading ? <span>Loading</span> : <span>Create account</span>}
        </button>
      </div>
    </div>
  );
};

export default Login;

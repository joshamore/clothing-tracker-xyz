import { useState } from 'react';
import { supabase } from '../helpers/supabaseClient';
import CoreLayout from '../components/CoreLayout';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoreLayout>
      <h1>Log In (Existing user)</h1>
      <p>Log in via magic link with your email below</p>
      <div>
        <input
          type='email'
          placeholder='Your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin(email);
          }}
          disabled={loading}
        >
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </div>
    </CoreLayout>
  );
};

export default Login;

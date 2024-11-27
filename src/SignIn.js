import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here, e.g., send data to server
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email is required</span>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && <span>Password is required and must be at least 8 characters</span>}
      </div>

      <button type="submit">Sign In</button>
    </form>
  );
}

export default SignIn;
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Corrected Zod Schema
const userSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    age: z
      .preprocess((value) => Number(value), z.number().min(18, 'You must be at least 18 years old')),
    number: z.string().min(10, 'Invalid phone number'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['confirmPassword'],
      });
    }
  });

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" {...register('age')} />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="number">Phone Number:</label>
        <input type="tel" id="number" {...register('number')} />
        {errors.number && <p>{errors.number.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyForm;

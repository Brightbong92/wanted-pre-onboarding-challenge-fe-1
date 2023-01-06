import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../apis/auth/AuthApi.mutation';

type FormType = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormType>();

  const { mutate: loginMutate } = useLoginUserMutation();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
    const { email, password } = data;
    loginMutate(
      { email, password },
      {
        onSuccess: (res) => {
          navigate(`/`);
        },
        onError: (err) => {
          alert(err);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>
        <input
          type="text"
          placeholder="email"
          {...register('email', {
            required: true,
            pattern: /^[0-9a-zA-Z]+@+[a-z]+[.]+[a-z]{2,3}/g,
            // ^: 시작
            // [0-9a-zA-Z]: 숫자, 대소문자
            // +@: @앞에 입력된 문자가 [0-9a-zA-Z]
            // +[a-z]: [a-z]앞에 입력된게 @이면서 소문자만
            // +[.]: [.] 앞에 [a-z] 소문자만
            // +[a-z]: [a-z] 앞에 .만
            // {2,3}: 2~3자리
            // g: 전체를 찾는다
          })}
        />
      </p>

      <p>
        <input
          type="password"
          placeholder="password"
          {...register('password', {
            required: true,
            minLength: 8,
            // pattern: /[0-9a-z!@#$%^&*()_+=-]{8}/i,
          })}
        />
      </p>

      <button type="submit" disabled={isSubmitting}>
        login
      </button>
    </form>
  );
};

export default LoginForm;

import PrimaryButton from '@/components/common/buttons/PrimaryButton'
import Input from '@/components/common/form/Input'
import InputError from '@/components/common/form/InputError'
import Label from '@/components/common/form/Label'
import Toggle from '@/components/common/form/Toggle'
import GuestLayout from '@/components/layouts/GuestLayout'
import { LoginRequest, useLogin } from '@/hooks/mutations/useLogin'
import axios from '@/lib/axios'
import { useForm, SubmitHandler } from "react-hook-form"

export default function Login() {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
      shouldRemember: true
    }
  });

  const { mutate, isPending, } = useLogin();

  const watchedShouldRemember = watch('shouldRemember');

  // const csrf = () => axios.get('/sanctum/csrf-cookie')

  const handleLogin: SubmitHandler<LoginRequest> = async (data) => {
    // await csrf();
    mutate(data);
  }

  return (
    <GuestLayout>
      <div>
        <form
          className="space-y-4 w-[20rem]"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className='space-y-1'>
            <Label>Email</Label>
            <Input {...register('email', { required: true })} type="email" className='' />
            {errors.email && <InputError message="Email is required." />}
          </div>

          <div className='space-y-1'>
            <Label>Password</Label>
            <Input {...register('password', { required: true })} type="password" className='' />
            {errors.password && <InputError message="Password is required." />}
          </div>

          <div className='flex items-center space-x-4'>
            <span className='text-sm'>Remember Me?</span>
            <Toggle enabled={watchedShouldRemember} setEnabled={(value) => setValue('shouldRemember', value ? true : false)} />
          </div>
          {errors.shouldRemember && <InputError message="Remember me is required." />}

          <div className="flex justify-end">
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}

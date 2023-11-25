import Input from '@/components/common/form/Input';
import InputError from '@/components/common/form/InputError';
import Label from '@/components/common/form/Label';
import GuestLayout from '@/components/common/layouts/GuestLayout';
import { IRegisterRequest, useRegister } from '@/hooks/mutations/useRegister';
import { useForm, SubmitHandler } from "react-hook-form";

const RegisterPage = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue, setError } = useForm<IRegisterRequest>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    });

    const { mutate, isPending } = useRegister(setError);

    const handleRegistration: SubmitHandler<IRegisterRequest> = async (data) => {
        console.log(data);
        mutate(data);
    }

    return (
        <GuestLayout>
            <div>
                <form
                    className="space-y-4 w-[20rem]"
                    onSubmit={handleSubmit(handleRegistration)}
                >
                    <div className='space-y-1'>
                        <Label>Name</Label>
                        <Input
                            type="name"
                            {...register('name', { required: { value: true, message: "Name is required." } })}
                        />
                        {errors.name && <InputError message={errors.name.message} />}
                    </div>

                    <div className='space-y-1'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            {...register('email', { required: { value: true, message: "Email is required." } })}
                        />
                        {errors.email && <InputError message={errors.email.message} />}
                    </div>

                    <div className='space-y-1'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            {...register('password', { required: { value: true, message: "Password is required." } })}
                        />
                        {errors.password && <InputError message={errors.password.message} />}
                    </div>

                    <div className='space-y-1'>
                        <Label>Confirm Password</Label>
                        <Input
                            type="password"
                            {...register('password_confirmation', { required: { value: true, message: "Password confirmation is required." } })}
                        />
                        {errors.password_confirmation && <InputError message={errors.password_confirmation.message} />}
                    </div>

                    <div className="flex justify-end">
                        <button className="btn btn-primary" type="submit">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </GuestLayout>
    )
}

export default RegisterPage;
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../UI/Form';
import { Button } from '../UI/button';
import { Input } from '../UI/input';
import axios from 'axios';

const formSchema = z.object({
  userName: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .max(30),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  phoneNumber: z
    .string()
    .min(10, { message: 'Moible number must contain 10 characters' })
    .max(10, { message: 'Moible number must contain 10 characters' }),
});

export const AddUserForm = () => {
  const NewUserForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      email: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API}/users`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error:any) {
      NewUserForm.setError('email',error.response.data);
      console.log(error.response.data.message);
    }

  };

  return (
    <div>
      <Form {...NewUserForm}>
        <form
          onSubmit={NewUserForm.handleSubmit(onSubmit)}
          className="space-y-6 mt-3"
        >
          <FormField
            control={NewUserForm.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={NewUserForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={NewUserForm.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Form>
    </div>
  );
};

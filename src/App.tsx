import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(3),
  age: z.preprocess(Number, z.number().positive()), //.optional),
  //with this preprocess it takes string into number
});
//.required(); if we say partial it wont be required.
type Inputs = z.infer<typeof schema>;

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("firstName")} />
        <p>{errors.firstName?.message}</p>

        <input {...register("age")} />
        <p>{errors.age?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
}

//Zod: https://github.com/colinhacks/zod
//pnpm add zod
//yup => https://www.npmjs.com/package/@hookform/resolvers

import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
  remember: boolean;
}

const schema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  remember: z.boolean({ required_error: "Remember is required" }),
});

function App() {
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormInput>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <InputText {...register("firstName")} />
      {errors.firstName && <div> {errors.firstName.message} </div>}
      <label>Remember</label>
      <Controller
        name={"remember"}
        control={control}
        rules={{ required: "Email Address is required" }}
        render={({ field }) => (
          <div>
            <Checkbox
              checked={field.value}
              aria-invalid={errors.remember ? "true" : "false"}
              inputRef={field.ref}
              onChange={(e) => field.onChange(e.checked)}
            ></Checkbox>
            {errors.remember && <div> {errors.remember.message} </div>}
          </div>
        )}
      />
      <label>Gender Selection</label>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Dropdown
            {...field}
            options={Object.values(GenderEnum).map((gender) => ({
              value: gender,
            }))}
            optionLabel="value"
            placeholder="Select gender"
            filter
            className="w-full md:w-14rem"
          />
        )}
      />
      <input type="submit" />
    </form>
  );
}

export default App;

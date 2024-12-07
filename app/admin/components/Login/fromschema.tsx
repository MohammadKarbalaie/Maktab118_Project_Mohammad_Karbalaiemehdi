import * as z from "zod";

export const schema = z.object({
  username: z
    .string()
    .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
    .nonempty("نام کاربری الزامی است"),
  password: z
    .string()
    .min(8, "رمز عبور باید حداقل شامل 8 کاراکتر و عدد باشد")
    .nonempty("رمز عبور الزامی است"),
});

export interface FormValues {
  username: string;
  password: string;
}

export interface FieldValues {
    username: string;
    password: string;
  }

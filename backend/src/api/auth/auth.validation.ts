import { z } from "zod";

export const registerStepOneSchema = z.object({
  body: z.object({
    fullName: z
      .string({ required_error: "Full name is required" })
      .min(3, { message: "Full name must be at least 3 characters long" }),

    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),

    // Frontenddan 3 ta alohida raqamni kutamiz
    dobYear: z
      .number({ required_error: "Year of birth is required" })
      .int()
      .min(1900, "Invalid year")
      .max(new Date().getFullYear(), "Invalid year"),

    dobMonth: z
      .number({ required_error: "Month of birth is required" })
      .int()
      .min(1, "Invalid month")
      .max(12, "Invalid month"),

    dobDay: z
      .number({ required_error: "Day of birth is required" })
      .int()
      .min(1, "Invalid day")
      .max(31, "Invalid day"),
  }).refine((data) => {
      // Yoshni tekshirish uchun qo'shimcha refine.
      // Bu yerda bizda yil, oy, kun bor, shuning uchun aniq hisoblashimiz mumkin.
      try {
        const birthDate = new Date(data.dobYear, data.dobMonth - 1, data.dobDay);
        // Sananing o'zi to'g'ri ekanligini tekshirish (masalan, 31-fevral emasligini)
        if (birthDate.getFullYear() !== data.dobYear || birthDate.getMonth() !== data.dobMonth - 1 || birthDate.getDate() !== data.dobDay) {
          return false;
        }
        
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age >= 13;
      } catch {
        return false;
      }
    }, {
      message: "You must be at least 13 years old and provide a valid date",
      path: ["dobDay"], // Xatoni qaysi maydonga bog'lash kerakligi
    }),
});

export const verifyEmailSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
      
    verificationCode: z
      .string({ required_error: "Verification code is required" })
      .length(6, { message: "Verification code must be 6 characters long" })
      .regex(/^\d+$/, { message: "Verification code must only contain numbers" }),
  }),
});

// ... boshqa importlar va sxemalar ...

export const setPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character (e.g., !@#$%^&*)" }),

    confirmPassword: z
      .string({ required_error: "Password confirmation is required" }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
});
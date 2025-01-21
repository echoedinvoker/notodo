'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { paths } from "@/paths";
import { Notodo } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// const createNotodoSchema = z.object({
//   name: z.string().min(2).max(100),
//   description: z.string(),
//   weight: z.number().min(0).max(10).optional(),
// });
//
interface CreateAchievementFormState {
  errors: {
    name?: string[];
    description?: string[];
    thresholdes?: string[];
    pointsPerHour?: string[];
    _form?: string[];
  };
  success?: boolean;
}
//
// type ValidatedNotodoData = z.infer<typeof createNotodoSchema>;

export async function createAchievement(formState: CreateAchievementFormState, formData: FormData): Promise<CreateAchievementFormState> {
  console.log(formData)
  const session = await auth();
  if (!session || !session.user) {
    return { errors: { _form: ["You must be logged in to create a notodo"] } }
  }
  return await Promise.resolve({ errors: {}, success: true });
  // TODO: implement validation to form data
  // const validationResult = await validateNotodoData(formData);
  // if ('errors' in validationResult) {
  //   return validationResult;
  // }
  //
  // const creationResult = await createNotodoInDatabase(validationResult, session.user.id);
  // if ('errors' in creationResult) {
  //   return creationResult;
  // }
  //
  // revalidatePath(paths.homePage(userId))
  // redirect(paths.notodoListPage(userId));
  // return { errors: {}, success: true };
}

// TODO: mutate validation codes to fix this case
// async function validateNotodoData(formData: FormData): Promise<ValidatedNotodoData | CreateNotodoFormState> {
//   try {
//     const weightValue = formData.get("weight");
//     return createNotodoSchema.parse({
//       title: formData.get("title"),
//       content: formData.get("content"),
//       weight: weightValue ? parseFloat(weightValue as string) : undefined
//     });
//   } catch (error) {
//     return { errors: (error as z.ZodError).flatten().fieldErrors } as CreateNotodoFormState;
//   }
// }
//
// async function createNotodoInDatabase(data: ValidatedNotodoData, userId: string): Promise<Notodo | CreateNotodoFormState> {
//   try {
//     return await db.notodo.create({
//       data: {
//         ...data,
//         userId,
//       },
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return { errors: { _form: [error.message] } };
//     }
//     return { errors: { _form: ["An unknown error occurred"] } };
//   }
// }

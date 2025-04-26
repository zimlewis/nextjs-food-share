'use server';
import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

const isInvalidString = (string) => {
    return !string || string.trim() === ''
}

export const shareMeal = async (prevState, formData) => {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creatorEmail: formData.get('email')
    };

    if (isInvalidString(meal.title)) return {
        message: 'Invalid title'
    };

    if (isInvalidString(meal.summary)) return {
        message: 'Invalid summary'
    };

    if (isInvalidString(meal.instructions)) return {
        message: 'Invalid instructions'
    };

    if (isInvalidString(meal.creator)) return {
        message: 'Invalid creator\'s name'
    };

    if (isInvalidString(meal.creatorEmail)) return {
        message: 'Invalid email'
    };

    if (!meal.image || meal.image.size === 0) return {
        message: 'Invalid image'
    };
    

    const slug = await saveMeal(meal);
    revalidatePath('/meals');
    redirect(`/meals/${slug}`);
}
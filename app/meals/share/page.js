'use client';

import classes from './page.module.css';
import ImagePicker from '@/components/image-picker/image-picker';
import SubmitButton from '@/components/meals/meal-form-submit';
import { useActionState } from 'react'

import { shareMeal } from '@/libs/action';

const Share = () => {
    const [state, formAction] = useActionState(shareMeal, {message: null})

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker name="image" label="Image" />
                    <p>{state.message || ''}</p>
                    <p className={classes.actions}>
                        <SubmitButton />
                    </p>
                </form>
            </main>
        </>
    )
}

export default Share
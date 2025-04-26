import { getMeal } from '@/libs/meals'
import classes from './page.module.css'
import Image from 'next/image'

import burger from '@/assets/burger.jpg'
import { notFound } from 'next/navigation'

export const generateMetadata = async ({ params }) => {
    const { slug } = await params;
    const meal = await getMeal(slug);
    return {
        title: meal.title,
        description: meal.summary
    };
}

const Meal = async ({ params }) => {
    const { slug } = await params;
    const meal = await getMeal(slug);

    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />')

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image alt={meal.title} src={meal.image} unoptimized fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal.instructions
                }}></p>
            </main>
        </>
    )
}

export default Meal
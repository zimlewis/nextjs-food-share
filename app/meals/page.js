import Link from 'next/link';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/libs/meals';
import { Suspense } from 'react';
import LoadingPage from './loading-out';

const MealsList = async () => {
    const meals = await getMeals();

    return <MealsGrid meals={meals} />
}

const Meals = () => {
    return (
        <>
            <header className={classes.header}>
                <h1>
                    Delicious meals <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href={"/meals/share"}>
                        Share your recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<LoadingPage />}>
                    <MealsList />
                </Suspense>
            </main>
        </>
    )
}

export default Meals
import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';

import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const { isLoading, error, sendRequest: fetchMeals } = useHttp();

    useEffect(() => {
        const transformMeals = (data) => {
            const meals = [];
            for (const key in data) {
                const { name, description, price } = data[key];
                meals.push({
                    id: key,
                    name,
                    description,
                    price,
                });
            }
            setMeals(meals);
        };

        fetchMeals(
            {
                url: 'https://react-http-1804b-default-rtdb.firebaseio.com/meals.json',
            },
            transformMeals
        );
    }, [fetchMeals]);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Loading Meals...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.mealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const mealsList = meals.map((meal) => {
        return (
            <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        );
    });

    return (
        <section className={classes.meals}>
            <Card>
                {!isLoading && !error && mealsList.length > 0 && (
                    <ul>{mealsList}</ul>
                )}
                {!isLoading && error && <p>{error}</p>}
                {/* {isLoading && <p>Loading meals....</p>} */}
            </Card>
        </section>
    );
};

export default AvailableMeals;

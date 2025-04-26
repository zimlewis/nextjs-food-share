import sql from 'better-sqlite3';
import slugify from 'slugify'
import xss from 'xss';

const db = sql('meals.db');

export const getMeals = async () => {
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 2000);
    // });

    // throw new Error("failed");
    return db.prepare('SELECT * FROM meals').all().map((meal) => {
        const imageBuffer = meal.image; // Assuming `image` is the BLOB column
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        const mimeType = 'image/png'; // Change this based on your actual image format
        return {
            ...meal,
            image: `data:${mimeType};base64,${base64Image}`,
        };
    });
};

export const getMeal = async (slug) => {
    const meal = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
    if (!meal) return null;

    const imageBuffer = meal.image; // Assuming `image` is the BLOB column
    const base64Image = Buffer.from(imageBuffer).toString('base64');
    const mimeType = 'image/png'; // Change this based on your actual image format
    meal.image = `data:${mimeType};base64,${base64Image}`;

    return meal;
}

export const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const arrayBuffer = await meal.image.arrayBuffer();
    meal.image = Buffer.from(arrayBuffer);
    // slug TEXT NOT NULL UNIQUE,
    // title TEXT NOT NULL,
    // image BLOB,
    // summary TEXT NOT NULL,
    // instructions TEXT NOT NULL,
    // creator TEXT NOT NULL,
    // creator_email TEXT NOT NULL
    db.prepare(`
        INSERT INTO meals(slug, title, image, summary, instructions, creator, creator_email) VALUES (
           ?,
           ?,
           ?,
           ?,
           ?,
           ?,
           ?
        )
     `).run(meal.slug, meal.title, meal.image, meal.summary, meal.instructions, meal.creator, meal.creatorEmail);
    return meal.slug;

}
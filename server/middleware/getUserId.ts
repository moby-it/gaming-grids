import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);
    const token = cookies['sb-access-token'];
    if (token) {
        const user = jwt.decode(token);
        if (!user)
            throw createError({
                statusCode: 403,
                statusMessage: 'Invalid token was submitted',
            });
        event.context.userId = user.sub;
    }
});

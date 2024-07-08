import { createReadStream } from 'node:fs';
import * as path from 'node:path';
export default defineEventHandler((event) => {
    return sendStream(
        event,
        createReadStream(path.join(process.cwd(), '.output', 'public', 'sha.txt'))
    );
});


import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Supabase URL and Key should be loaded via node --env-file=.env

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('Missing Supabase credentials in .env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadLogo() {
    const filePath = path.resolve('public/media/LOGO-B.png');
    const fileName = 'LOGO-B-fix.png';
    const bucketName = 'driver-photos';

    console.log(`Uploading ${fileName} to bucket ${bucketName}...`);

    try {
        const fileBuffer = fs.readFileSync(filePath);

        // 2. Upload the file
        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, fileBuffer, {
                contentType: 'image/png',
                upsert: true,
                cacheControl: '0'
            });

        if (error) {
            throw error;
        }

        console.log('Upload successful:', data);

        // 3. Generate public URL
        const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(fileName);

        console.log('PUBLIC_URL_START');
        console.log(urlData.publicUrl);
        console.log('PUBLIC_URL_END');

    } catch (error) {
        console.error('Error:', error.message);
    }
}

uploadLogo();

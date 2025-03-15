const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const db = require('../dbConfig');

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Configure Google Cloud Storage
const storage = new Storage({
    keyFilename: process.env.GOOGLE_CLOUD_KEY_FILE,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});
const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET);

// Profile Picture Upload
router.post('/upload-profile-picture', upload.single('profile_picture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const blob = bucket.file(`profile-pictures/${req.user.id}-${Date.now()}`);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (error) => {
            res.status(500).json({ error: 'Failed to upload file' });
        });

        blobStream.on('finish', async () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            
            // Update user's profile picture URL in database
            await db.query(
                'UPDATE users SET profile_picture_url = $1 WHERE id = $2',
                [publicUrl, req.user.id]
            );

            res.status(200).json({ url: publicUrl });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Experience Routes
router.get('/experiences', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM experiences WHERE user_id = $1 ORDER BY start_date DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/experiences', async (req, res) => {
    try {
        const { title, company, start_date, end_date, description } = req.body;
        const result = await db.query(
            `INSERT INTO experiences (user_id, title, company, start_date, end_date, description)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [req.user.id, title, company, start_date, end_date, description]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating experience:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/experiences/:id', async (req, res) => {
    try {
        const { title, company, start_date, end_date, description } = req.body;
        const result = await db.query(
            `UPDATE experiences 
             SET title = $1, company = $2, start_date = $3, end_date = $4, description = $5
             WHERE id = $6 AND user_id = $7
             RETURNING *`,
            [title, company, start_date, end_date, description, req.params.id, req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/experiences/:id', async (req, res) => {
    try {
        const result = await db.query(
            'DELETE FROM experiences WHERE id = $1 AND user_id = $2 RETURNING *',
            [req.params.id, req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error('Error deleting experience:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Certification Routes
router.get('/certifications', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM certifications WHERE user_id = $1 ORDER BY issue_date DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching certifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/certifications', async (req, res) => {
    try {
        const { 
            name, 
            issuing_organization, 
            issue_date, 
            expiry_date, 
            credential_id, 
            credential_url 
        } = req.body;
        
        const result = await db.query(
            `INSERT INTO certifications (
                user_id, name, issuing_organization, issue_date, 
                expiry_date, credential_id, credential_url
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [
                req.user.id, name, issuing_organization, issue_date,
                expiry_date, credential_id, credential_url
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating certification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/certifications/:id', async (req, res) => {
    try {
        const { 
            name, 
            issuing_organization, 
            issue_date, 
            expiry_date, 
            credential_id, 
            credential_url 
        } = req.body;
        
        const result = await db.query(
            `UPDATE certifications 
             SET name = $1, issuing_organization = $2, issue_date = $3,
                 expiry_date = $4, credential_id = $5, credential_url = $6
             WHERE id = $7 AND user_id = $8
             RETURNING *`,
            [
                name, issuing_organization, issue_date, expiry_date,
                credential_id, credential_url, req.params.id, req.user.id
            ]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Certification not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating certification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/certifications/:id', async (req, res) => {
    try {
        const result = await db.query(
            'DELETE FROM certifications WHERE id = $1 AND user_id = $2 RETURNING *',
            [req.params.id, req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Certification not found' });
        }
        
        res.json({ message: 'Certification deleted successfully' });
    } catch (error) {
        console.error('Error deleting certification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 
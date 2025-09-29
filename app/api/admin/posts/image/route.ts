// pages/api/upload-image.ts - Image upload API
import { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import path from 'path'
import fs from 'fs/promises'

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        // Ensure upload directory exists
        const uploadDir = './public/uploads'
        await fs.mkdir(uploadDir, { recursive: true })

        const form = formidable({
            uploadDir,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024, // 5MB limit
            filter: ({ mimetype }) => {
                return mimetype && mimetype.includes('image')
            },
        })

        const [fields, files] = await form.parse(req)
        const file = Array.isArray(files.image) ? files.image[0] : files.image

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' })
        }

        // Generate unique filename
        const timestamp = Date.now()
        const originalName = file.originalFilename || 'image'
        const extension = path.extname(originalName)
        const filename = `${timestamp}${extension}`

        // Move file to permanent location
        const oldPath = file.filepath
        const newPath = path.join(uploadDir, filename)

        await fs.rename(oldPath, newPath)

        const url = `/uploads/${filename}`
        res.status(200).json({ url })

    } catch (error) {
        console.error('Upload error:', error)
        res.status(500).json({ error: 'Upload failed' })
    }
}

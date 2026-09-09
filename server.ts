import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'CAPACITY CONNECT API',
    organization: 'Ministry of Earth Sciences (MoES) | India Meteorological Department (IMD)',
    timestamp: new Date().toISOString(),
  });
});

// Capacity AI Chat Endpoint with Grounded Retrieval & Strict Role Authorization
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { prompt, context, userRole } = req.body;

    // Strict role authorization check
    if (!['TRAINEE', 'TRAINER', 'ADMIN'].includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: 'Unauthorized user role specified for AI context generation.',
      });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(200).json({
        fallback: true,
        message: 'No GEMINI_API_KEY detected in environment; using local domain knowledge engine.',
      });
    }

    // Role-aware system instructions & security boundaries
    let roleBoundary = '';
    if (userRole === 'TRAINEE') {
      roleBoundary = `Role-Aware Context [TRAINEE]: You are assisting a trainee officer. Focus strictly on their registered competencies, learning history, course enrollments, assessment scores, and skill gaps. Do not reveal other trainees' private records or administrative settings.`;
    } else if (userRole === 'TRAINER') {
      roleBoundary = `Role-Aware Context [TRAINER]: You are assisting a faculty expert/trainer. Focus on their teaching expertise, authored courses, modules, resource materials, and authorized trainee performance statistics.`;
    } else if (userRole === 'ADMIN') {
      roleBoundary = `Role-Aware Context [ADMIN]: You are assisting an institutional administrator/Director General. Provide aggregate platform statistics, competency demand across RMCs, trainer availability, course completion metrics, and WMO compliance audit data.`;
    }

    const systemInstruction = `You are "Capacity AI", the intelligent learning and competency development assistant for CAPACITY CONNECT, the institutional capacity-building portal for the Ministry of Earth Sciences (MoES) and India Meteorological Department (IMD).
${roleBoundary}
Hallucination Protection: Always ground your answers about courses, trainers, competencies, and recommendations strictly in the verified structured portal context provided below. Do NOT invent trainers, fake course names, or arbitrary statistics.

Verified Portal Data Context:
${JSON.stringify(context || {}, null, 2)}

Provide clear, structured, encouraging, and technically sound guidance with concise bullet points where appropriate.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemInstruction}\n\nUser Question:\n${prompt}` }],
        },
      ],
    });

    const responseText = response.text || '';
    return res.json({
      text: responseText,
      success: true,
      model: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(200).json({
      fallback: true,
      error: error.message || 'Gemini service error, using domain knowledge engine fallback.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CAPACITY CONNECT server active on port ${PORT}`);
  });
}

startServer();

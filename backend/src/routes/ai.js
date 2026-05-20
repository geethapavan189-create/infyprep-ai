const express = require('express');
const router = express.Router();
const axios = require('axios');
const { verifyToken } = require('../middleware/auth');

// AI Chat - Solve questions, explain concepts
router.post('/chat', verifyToken, async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Use OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are InfyPrep AI Assistant, specialized in helping students prepare for Infosys placements, HackWithInfy, and InfyTQ exams. You help with:
- Aptitude problem solving with shortcuts and tricks
- Reasoning puzzle explanations
- Coding problem hints and solutions
- Interview preparation tips
- Formula explanations
- Resume review and ATS scoring
Always provide step-by-step explanations and mention shortcut methods when available.`,
          },
          ...(context || []),
          { role: 'user', content: message },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (error) {
    // Fallback response if API fails
    res.json({
      reply: getLocalResponse(req.body.message),
    });
  }
});

// AI Explain question
router.post('/explain', verifyToken, async (req, res) => {
  try {
    const { question, options, correctAnswer, topic } = req.body;
    
    const prompt = `Explain this ${topic} question step by step:
Question: ${question}
Options: ${options?.join(', ')}
Correct Answer: ${correctAnswer}

Provide:
1. Step-by-step solution
2. Shortcut method (if any)
3. Key formula used
4. Similar question pattern tip`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert aptitude and reasoning tutor. Explain clearly with shortcuts.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 800,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ explanation: response.data.choices[0].message.content });
  } catch (error) {
    res.json({ explanation: 'AI explanation temporarily unavailable. Please check the solution provided.' });
  }
});

// Resume ATS Score
router.post('/ats-score', verifyToken, async (req, res) => {
  try {
    const { resumeText } = req.body;
    
    const prompt = `Analyze this resume for an Infosys placement and provide:
1. ATS Score (out of 100)
2. Strengths
3. Weaknesses
4. Suggestions for improvement
5. Keywords to add for Infosys

Resume:
${resumeText}`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert resume reviewer for IT placements.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ analysis: response.data.choices[0].message.content });
  } catch (error) {
    res.json({ analysis: 'Resume analysis temporarily unavailable.' });
  }
});

// Local fallback responses
function getLocalResponse(message) {
  const lower = message.toLowerCase();
  
  if (lower.includes('percentage')) {
    return `**Percentage Formulas & Tricks:**
• Percentage = (Value/Total) × 100
• X% of Y = (X × Y) / 100
• Increase% = (Increase/Original) × 100
• Decrease% = (Decrease/Original) × 100

**Shortcut:** To find X% of a number, move decimal left by 2 and multiply by X.
Example: 15% of 200 = 200 × 0.15 = 30

**Successive Percentage:** If price increases by a% then b%, net = a + b + (ab/100)`;
  }
  
  if (lower.includes('time') && lower.includes('work')) {
    return `**Time and Work Formulas:**
• If A can do work in 'n' days, A's 1 day work = 1/n
• Combined work: 1/A + 1/B = 1/Total
• If A is twice as efficient as B, A takes half the time

**LCM Method (Shortcut):**
1. Take LCM of given days
2. Find per-day work of each person
3. Add for combined work
4. Divide total work by combined rate`;
  }
  
  if (lower.includes('profit') || lower.includes('loss')) {
    return `**Profit & Loss Formulas:**
• Profit = SP - CP
• Loss = CP - SP
• Profit% = (Profit/CP) × 100
• SP = CP × (100 + Profit%)/100
• If discount = d% and markup = m%, then Profit% = m - d - (md/100)

**Shortcut:** For successive discounts a% and b%: Effective = a + b - (ab/100)`;
  }
  
  return `I'm InfyPrep AI Assistant! I can help you with:
• Aptitude shortcuts and formulas
• Reasoning problem solving
• Coding problem explanations
• Interview preparation
• Resume review

Ask me any specific question about your preparation!`;
}

module.exports = router;

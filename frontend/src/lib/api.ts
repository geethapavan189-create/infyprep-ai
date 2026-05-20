import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth?.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  updateStreak: () => api.post('/auth/streak'),
};

export const questionsAPI = {
  getByTopic: (category: string, topic: string, params?: any) =>
    api.get(`/questions/${category}/${topic}`, { params }),
  getById: (id: string) => api.get(`/questions/single/${id}`),
  submit: (data: any) => api.post('/questions/submit', data),
  bookmark: (questionId: string) => api.post('/questions/bookmark', { questionId }),
  getTopics: (category: string) => api.get(`/questions/topics/${category}`),
};

export const codeAPI = {
  run: (data: { code: string; language: string; input?: string }) =>
    api.post('/code/run', data),
  submit: (data: { code: string; language: string; problemId: string }) =>
    api.post('/code/submit', data),
  getProblems: (params?: any) => api.get('/code/problems', { params }),
  getProblem: (id: string) => api.get(`/code/problems/${id}`),
};

export const testsAPI = {
  getAll: (params?: any) => api.get('/tests', { params }),
  getById: (id: string) => api.get(`/tests/${id}`),
  submit: (id: string, data: any) => api.post(`/tests/${id}/submit`, data),
  getHistory: () => api.get('/tests/history/me'),
};

export const progressAPI = {
  getAnalytics: () => api.get('/progress/analytics'),
  getCoding: () => api.get('/progress/coding'),
};

export const aiAPI = {
  chat: (message: string, context?: any[]) => api.post('/ai/chat', { message, context }),
  explain: (data: any) => api.post('/ai/explain', data),
  atsScore: (resumeText: string) => api.post('/ai/ats-score', { resumeText }),
};

export const leaderboardAPI = {
  getAll: (params?: any) => api.get('/leaderboard', { params }),
  getRank: () => api.get('/leaderboard/rank'),
};

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  addQuestion: (data: any) => api.post('/admin/questions', data),
  updateQuestion: (id: string, data: any) => api.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id: string) => api.delete(`/admin/questions/${id}`),
  addCodingProblem: (data: any) => api.post('/admin/coding-problems', data),
  addMockTest: (data: any) => api.post('/admin/mock-tests', data),
  getStats: () => api.get('/admin/stats'),
};

export default api;

export const SYSTEM_PROVIDER_DEFAULTS = {
    baseUrl: '/api/v1', // System managed
    apiKey: '', // System managed
    model: 'gpt-4o',
    systemPrompt: 'You are an expert Draw.io diagram assistant. You have access to the current XML of the diagram. When asked to modify the diagram, provide the full updated XML in a code block. When asked to explain, reference specific cell IDs or values.',
    temperature: 0.7,
    maxTokens: 2000,
};

export const OPENAI_COMPATIBLE_PROVIDER_DEFAULTS = {
    baseUrl: 'https://api.openai.com/v1',
    apiKey: '',
    model: 'gpt-4o',
    systemPrompt: 'You are an expert Draw.io diagram assistant. You have access to the current XML of the diagram. When asked to modify the diagram, provide the full updated XML in a code block. When asked to explain, reference specific cell IDs or values.',
    temperature: 0.7,
    maxTokens: 5000,
};

export const DRAWIO_DEFAULTS = {
    baseUrl: 'https://embed.diagrams.net',
};

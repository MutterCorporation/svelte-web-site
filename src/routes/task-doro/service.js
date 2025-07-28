// Service simples para Task-Doro (Pomodoro Timer)

/**
 * Salva sessão do Pomodoro no localStorage
 * @param {Object} session - Dados da sessão
 */
export function saveSession(session) {
    try {
        const sessions = getSessions();
        sessions.push({
            ...session,
            id: Date.now(),
            date: new Date().toISOString()
        });
        localStorage.setItem('pomodoro_sessions', JSON.stringify(sessions));
    } catch (error) {
        console.error('Erro ao salvar sessão:', error);
    }
}

/**
 * Busca sessões salvas
 * @returns {any[]} Lista de sessões
 */
export function getSessions() {
    try {
        const sessions = localStorage.getItem('pomodoro_sessions');
        return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
        console.error('Erro ao buscar sessões:', error);
        return [];
    }
}

/**
 * Limpa todas as sessões
 */
export function clearSessions() {
    try {
        localStorage.removeItem('pomodoro_sessions');
    } catch (error) {
        console.error('Erro ao limpar sessões:', error);
    }
}

/**
 * Busca estatísticas do usuário
 * @returns {any} Estatísticas
 */
export function getStats() {
    try {
        const sessions = getSessions();
        const today = new Date().toDateString();
        const thisWeek = getWeekStart(new Date());
        
        const todaySessions = sessions.filter(s => 
            new Date(s.date).toDateString() === today
        );
        
        const weekSessions = sessions.filter(s => 
            new Date(s.date) >= thisWeek
        );
        
        return {
            totalSessions: sessions.length,
            todaySessions: todaySessions.length,
            weekSessions: weekSessions.length,
            totalMinutes: sessions.reduce((total, s) => total + (s.duration || 25), 0),
            averagePerDay: sessions.length > 0 ? 
                Math.round(sessions.length / getDaysSinceFirst(sessions)) : 0
        };
    } catch (error) {
        console.error('Erro ao calcular estatísticas:', error);
        return {
            totalSessions: 0,
            todaySessions: 0,
            weekSessions: 0,
            totalMinutes: 0,
            averagePerDay: 0
        };
    }
}

/**
 * Salva configurações do timer
 * @param {Object} settings - Configurações
 */
export function saveSettings(settings) {
    try {
        localStorage.setItem('pomodoro_settings', JSON.stringify(settings));
    } catch (error) {
        console.error('Erro ao salvar configurações:', error);
    }
}

/**
 * Busca configurações salvas
 * @returns {any} Configurações
 */
export function getSettings() {
    try {
        const settings = localStorage.getItem('pomodoro_settings');
        return settings ? JSON.parse(settings) : {
            workTime: 25,
            breakTime: 5,
            longBreakTime: 15,
            autoStart: false,
            soundEnabled: true
        };
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        return {
            workTime: 25,
            breakTime: 5,
            longBreakTime: 15,
            autoStart: false,
            soundEnabled: true
        };
    }
}

// Funções auxiliares
function getWeekStart(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}

function getDaysSinceFirst(sessions) {
    if (sessions.length === 0) return 1;
    
    const first = new Date(sessions[0].date);
    const now = new Date();
    const diffTime = Math.abs(now - first);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
}
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Tipos de tema disponíveis
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
};

/**
 * Detecta a preferência de tema do sistema
 * @returns {'light' | 'dark'}
 */
function getSystemTheme() {
  if (!browser) return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Carrega o tema salvo no localStorage ou usa auto como padrão
 * @returns {'light' | 'dark' | 'auto'}
 */
function getStoredTheme() {
  if (!browser) return THEMES.AUTO;
  return localStorage.getItem('theme') || THEMES.AUTO;
}

/**
 * Resolve o tema atual baseado na configuração
 * @param {string} theme - Tema configurado ('light' | 'dark' | 'auto')
 * @returns {'light' | 'dark'}
 */
function resolveTheme(theme) {
  if (theme === THEMES.AUTO) {
    return getSystemTheme();
  }
  return theme;
}

// Store do tema configurado (light, dark, auto)
export const themeConfig = writable(getStoredTheme());

// Store do tema atual resolvido (light, dark)
export const currentTheme = writable(resolveTheme(getStoredTheme()));

// Store para indicar se está carregando
export const themeLoading = writable(true);

/**
 * Aplica o tema no documento
 * @param {string} theme - Tema a ser aplicado ('light' | 'dark')
 */
function applyTheme(theme) {
  if (!browser) return;
  
  const root = document.documentElement;
  const body = document.body;
  
  // Remove classes anteriores
  root.classList.remove('light', 'dark');
  body.classList.remove('light', 'dark');
  
  // Adiciona nova classe
  root.classList.add(theme);
  body.classList.add(theme);
  
  // Define atributo para CSS
  root.setAttribute('data-theme', theme);
  
  // Atualiza meta tag para mobile
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.content = theme === 'dark' ? '#000000' : '#ffffff';
  }
}

/**
 * Define o tema e persiste no localStorage
 * @param {string} newTheme - Novo tema ('light' | 'dark' | 'auto')
 */
export function setTheme(newTheme) {
  if (!Object.values(THEMES).includes(newTheme)) {
    console.warn(`Tema inválido: ${newTheme}`);
    return;
  }

  // Atualiza store da configuração
  themeConfig.set(newTheme);
  
  // Resolve tema atual
  const resolved = resolveTheme(newTheme);
  currentTheme.set(resolved);
  
  // Aplica no DOM
  applyTheme(resolved);
  
  // Persiste no localStorage
  if (browser) {
    localStorage.setItem('theme', newTheme);
  }
}

/**
 * Alterna entre os temas de forma cíclica: auto -> light -> dark -> auto
 */
export function toggleTheme() {
  themeConfig.update(current => {
    switch (current) {
      case THEMES.AUTO: return THEMES.LIGHT;
      case THEMES.LIGHT: return THEMES.DARK;
      case THEMES.DARK: return THEMES.AUTO;
      default: return THEMES.AUTO;
    }
  });
}

/**
 * Inicializa o sistema de temas
 */
export function initTheme() {
  if (!browser) return;

  const stored = getStoredTheme();
  const resolved = resolveTheme(stored);
  
  // Aplica tema imediatamente
  applyTheme(resolved);
  
  // Atualiza stores
  themeConfig.set(stored);
  currentTheme.set(resolved);
  
  // Escuta mudanças na preferência do sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    themeConfig.update(current => {
      if (current === THEMES.AUTO) {
        const newResolved = getSystemTheme();
        currentTheme.set(newResolved);
        applyTheme(newResolved);
      }
      return current;
    });
  });
  
  // Subscribe para mudanças de configuração
  themeConfig.subscribe(config => {
    const resolved = resolveTheme(config);
    currentTheme.set(resolved);
    applyTheme(resolved);
    
    if (browser) {
      localStorage.setItem('theme', config);
    }
  });
  
  // Marca como carregado
  themeLoading.set(false);
}

// Auto-inicializa se estiver no browser
if (browser) {
  initTheme();
} 
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const LANGUAGES_DIR = join(process.cwd(), 'data', 'languages');

type SupportedLanguage = 'en' | 'fr';

interface LanguageData {
  language: SupportedLanguage;
}

/**
 * ensures the languages directory exists
 */
function ensureLanguagesDirectory(): void {
  if (!existsSync(LANGUAGES_DIR)) {
    mkdirSync(LANGUAGES_DIR, { recursive: true });
  }
}

/**
 * get the file path for a guild's language preference
 */
function getGuildFilePath(guildId: string): string {
  return join(LANGUAGES_DIR, `${guildId}.json`);
}

/**
 * load language preference for a guild
 * returns 'fr' as default if no preference is saved
 */
export function loadLanguage(guildId: string): SupportedLanguage {
  ensureLanguagesDirectory();

  const filePath = getGuildFilePath(guildId);

  if (!existsSync(filePath)) {
    return 'fr';
  }

  try {
    const data = readFileSync(filePath, 'utf-8');
    const parsed = JSON.parse(data) as LanguageData;

    if (parsed.language === 'en' || parsed.language === 'fr') {
      return parsed.language;
    }

    return 'fr';
  } catch {
    return 'fr';
  }
}

/**
 * save language preference for a guild
 */
export function saveLanguage(guildId: string, language: SupportedLanguage): void {
  ensureLanguagesDirectory();

  const filePath = getGuildFilePath(guildId);
  const data: LanguageData = { language };

  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

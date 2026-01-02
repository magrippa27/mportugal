import { useState } from 'react';
import { type Language, getLocalizedUrl, languages, switchLanguageUrl } from '../../i18n/utils';

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  lang: Language;
  navItems: NavItem[];
  currentPath: string;
}

export default function MobileNav({ lang, navItems, currentPath }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 hover:text-primary-700 transition-colors"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed top-0 right-0 bottom-0 w-64 bg-[#f5f3f0] shadow-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-700 hover:text-primary-700"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={getLocalizedUrl(item.href, lang)}
                  className="text-gray-700 hover:text-primary-700 py-2 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Language</p>
              <div className="flex flex-col space-y-2">
                {Object.entries(languages).map(([code, name]) => {
                  const flags: Record<string, string> = {
                    en: '🇬🇧',
                    es: '🇪🇸',
                    pt: '🇵🇹',
                  };
                  return (
                    <a
                      key={code}
                      href={switchLanguageUrl(currentPath, code as Language)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        code === lang
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                      }`}
                    >
                      <span className="text-xl">{flags[code]}</span>
                      <span>{name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


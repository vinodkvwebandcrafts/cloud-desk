"use client";

import { Cloud } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white text-lg">CloudDesk</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {t.footerSupport}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerHelpCenter}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerContactUs}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerSystemStatus}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {t.footerCompany}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerAbout}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerBlog}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerCareers}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {t.footerLegal}
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerPrivacy}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerTerms}</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors cursor-pointer">{t.footerCookies}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {t.footerCopyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

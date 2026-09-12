import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Check } from 'lucide-react';

export const PWAInstallButton: React.FC<{ variant?: 'primary' | 'compact' }> = ({ variant = 'primary' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showChromeHelp, setShowChromeHelp] = useState(false);

  if (isInstalled) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-300">
        <Check className="w-3.5 h-3.5 text-emerald-600" />
        <span>ایپ انسٹال ہے</span>
      </div>
    );
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowChromeHelp(true);
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <button
          id="pwa-install-compact-btn"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold shadow-sm transition active:scale-95"
          title="App Install کریں"
        >
          <Download className="w-3.5 h-3.5" />
          <span>ایپ انسٹال</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-purple-100 text-right">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <button onClick={() => setShowIOSGuide(false)} className="p-1 rounded-full hover:bg-slate-100">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
                <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  iPhone پر انسٹال کریں
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                1. سفاری (Safari) براؤزر میں نیچے <strong>Share</strong> کے بٹن پر کلک کریں۔<br />
                2. مینو کو اوپر کریں اور <strong>Add to Home Screen</strong> منتخب کریں۔<br />
                3. اوپر دائیں جانب <strong>Add</strong> دبائیں۔
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white hover:bg-purple-700 transition"
              >
                سمجھ گیا (ٹھیک ہے)
              </button>
            </div>
          </div>
        )}

        {showChromeHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-purple-100 text-right">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <button onClick={() => setShowChromeHelp(false)} className="p-1 rounded-full hover:bg-slate-100">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
                <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                  <Download className="w-5 h-5 text-purple-600" />
                  ایپ انسٹالیشن
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                براؤزر کے اوپری مینو میں <strong>(⋮) 3 نقطوں</strong> پر کلک کریں اور <strong>Install DREAM MOVIE HUB</strong> یا <strong>Add to Home screen</strong> منتخب کریں۔
              </p>
              <button
                onClick={() => setShowChromeHelp(false)}
                className="w-full rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white hover:bg-purple-700 transition"
              >
                ٹھیک ہے
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <button
        id="pwa-install-main-btn"
        onClick={handleInstallClick}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-bold text-sm md:text-base shadow-md hover:shadow-lg transition transform active:scale-95"
      >
        <Download className="w-5 h-5" />
        <span>📲 App Install کریں</span>
      </button>

      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-purple-100 text-right">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <button onClick={() => setShowIOSGuide(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
              <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-600" />
                iPhone / iPad پر انسٹالیشن
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              1. سفاری (Safari) کے ٹول بار میں <strong>Share</strong> کے نشان پر ٹیپ کریں۔<br />
              2. فہرست میں نیچے جا کر <strong>Add to Home Screen</strong> پر کلک کریں۔<br />
              3. اوپر <strong>Add</strong> کا بٹن دبائیں۔ اب ایپ موبائل اسکرین پر شامل ہو جائے گی!
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white hover:bg-purple-700 transition"
            >
              ٹھیک ہے، شکریہ!
            </button>
          </div>
        </div>
      )}

      {showChromeHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-purple-100 text-right">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <button onClick={() => setShowChromeHelp(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
              <h3 className="text-lg font-bold text-purple-900 flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-600" />
                کروم پر انسٹال کریں
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              کروم براؤزر میں اوپر دائیں جانب <strong>3 نقطوں (⋮)</strong> پر ٹیپ کریں اور <strong>Install App</strong> یا <strong>Add to Home screen</strong> منتخب فرمائیں۔
            </p>
            <button
              onClick={() => setShowChromeHelp(false)}
              className="w-full rounded-xl bg-purple-600 py-2.5 text-sm font-bold text-white hover:bg-purple-700 transition"
            >
              سمجھ گیا
            </button>
          </div>
        </div>
      )}
    </>
  );
};

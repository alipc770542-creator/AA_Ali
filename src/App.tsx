/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, BackgroundItem, AnimalCharacter, Language, ViralTemplate } from './types';
import { BACKGROUNDS, ANIMALS } from './data/mockData';
import { Header } from './components/Header';
import { HomeTab } from './components/HomeTab';
import { CharacterTab } from './components/CharacterTab';
import { LibraryTab } from './components/LibraryTab';
import { SceneTab } from './components/SceneTab';
import { ViralStudioTab } from './components/ViralStudioTab';
import { ToastContainer, ToastMessage } from './components/Toast';
import { OfflineIndicator } from './components/OfflineIndicator';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [lang, setLang] = useState<Language>('en'); // English-first as requested
  const [selectedBG, setSelectedBG] = useState<BackgroundItem>(BACKGROUNDS[0]);
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalCharacter | null>(ANIMALS[0]);
  const [customFace, setCustomFace] = useState<string | null>(null);
  const [characterName, setCharacterName] = useState<string>('Cartoon Hero');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Synchronize document direction and lang attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFaceChange = (url: string | null, name: string) => {
    setCustomFace(url);
    if (name) setCharacterName(name);
    if (url) {
      setSelectedAnimal(null); // Prioritize custom face when uploaded
    }
  };

  const handleSelectAnimal = (animal: AnimalCharacter) => {
    setSelectedAnimal(animal);
    setCustomFace(null); // Prioritize animal character when selected from library
  };

  const handleApplyViralTemplate = (template: ViralTemplate) => {
    // Check if background matches or select first AI background
    if (template.id === 'viral-1') {
      const castle = BACKGROUNDS.find((b) => b.id === 'ai-castle') || BACKGROUNDS[0];
      setSelectedBG(castle);
    } else if (template.id === 'viral-3') {
      const cyber = BACKGROUNDS.find((b) => b.id === 'ai-cyber') || BACKGROUNDS[0];
      setSelectedBG(cyber);
    } else if (template.id === 'viral-4') {
      const forest = BACKGROUNDS.find((b) => b.id === 'ai-forest') || BACKGROUNDS[0];
      setSelectedBG(forest);
    }
  };

  const isEn = lang === 'en';

  return (
    <div
      className="min-h-screen bg-[#F5EFFB] flex flex-col font-sans text-slate-800 antialiased"
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Header with Navigation Tabs & Language Toggle */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'ur' : 'en')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomeTab onNavigate={setActiveTab} lang={lang} />
        )}

        {activeTab === 'character' && (
          <CharacterTab
            customFace={customFace}
            characterName={characterName}
            onFaceChange={handleFaceChange}
            onUseInScene={() => setActiveTab('scene')}
            onToast={showToast}
          />
        )}

        {activeTab === 'library' && (
          <LibraryTab
            selectedBG={selectedBG}
            selectedAnimal={selectedAnimal}
            onSelectBG={setSelectedBG}
            onSelectAnimal={handleSelectAnimal}
            onGoToScene={() => setActiveTab('scene')}
            onToast={showToast}
          />
        )}

        {activeTab === 'scene' && (
          <SceneTab
            selectedBG={selectedBG}
            selectedAnimal={selectedAnimal}
            customFace={customFace}
            characterName={characterName}
            onToast={showToast}
            onGoToViral={() => setActiveTab('viral')}
          />
        )}

        {activeTab === 'viral' && (
          <ViralStudioTab
            selectedBG={selectedBG}
            selectedAnimal={selectedAnimal}
            customFace={customFace}
            characterName={characterName}
            onApplyTemplate={handleApplyViralTemplate}
            onGoToScene={() => setActiveTab('scene')}
            onToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-purple-100 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <p className="font-bold text-slate-700 font-brand tracking-wider">
            DREAM MOVIE HUB &copy; {new Date().getFullYear()}
          </p>
          <p className="text-purple-700 font-semibold">
            {isEn
              ? 'The Complete 2D Cartoon Animation Studio — Generate AI Prompts, Lock Faces, Download Ready-Made 4K Backgrounds & Go Viral!'
              : '2D Animation کا سب سے بڑا سٹوڈیو — باآسانی AI ویڈیو پرامپٹ بنائیں اور کارٹون اینیمیٹ کریں'}
          </p>
        </div>
      </footer>

      {/* Toast Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Offline Status Indicator */}
      <OfflineIndicator />
    </div>
  );
}

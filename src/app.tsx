import { useState } from 'preact/hooks';
import type { JSX } from 'preact';
import { Onoper } from 'onoper-core';

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const handleInputChange = (event: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    setInputValue(event.currentTarget.value);

    try {
      const transformed = new Onoper().execute(event.currentTarget.value);
      setOutputValue(transformed);
    } catch (e) {}
  };

  return (
    <main class="h-screen w-full bg-slate-50 font-sans flex flex-col">
      <div class="grid grid-cols-3 gap-8 w-full max-w-7xl mx-auto flex-grow p-8">
        
        <section class="flex flex-col col-span-1">
          <h1 class="text-2xl font-bold text-slate-800 mb-4">Editor</h1>
          <div class="flex-grow flex flex-col bg-white rounded-xl shadow-md border border-slate-200">
            <textarea
              class="w-full flex-grow p-4 bg-transparent rounded-xl focus:outline-none resize-none font-mono text-sm text-slate-700 placeholder:text-slate-400"
              value={inputValue}
              onInput={handleInputChange}
              placeholder="Escreva algo aqui..."
            />
          </div>
        </section>

        <section class="flex flex-col col-span-2">
          <h1 class="text-2xl font-bold text-slate-800 mb-4">Preview</h1>
          <div class="w-full flex-grow p-4 bg-slate-100 rounded-xl shadow-inner border border-slate-200 relative overflow-hidden">
            <pre
              class="absolute w-full h-full flex left-0 top-0 p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-auto"
              dangerouslySetInnerHTML={{ __html: outputValue || "<p>No output</p>" }}
            />
          </div>
        </section>

      </div>
    </main>
  );
}
import { useState, useRef, useEffect } from 'preact/hooks';
import { Onoper } from 'onoper-core';
import * as monaco from 'monaco-editor';

const METACHARACTERS = [
  { symbol: "-", description: "Define um item da lista (opcional)" },
  { symbol: "!", description: "Define um problema, deve ser filho de um item" },
  { symbol: ">", description: "Define um link para o item com o ID especificado" },
  { symbol: "#", description: "Define um comentário e deve ser filho de um item" },
];

export function App() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current && !monacoInstance.current) {
      monacoInstance.current = monaco.editor.create(editorRef.current, {
        value: inputValue,
        language: 'plaintext',
        theme: 'vs-light',
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: true,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        autoIndent: 'full',
        minimap: { enabled: false }
      });

      // Evento de mudança no editor
      monacoInstance.current.onDidChangeModelContent(() => {
        const value = monacoInstance.current?.getValue() || '';
        setInputValue(value);
        updateOutput(value);
      });
    }

    return () => {
      if (monacoInstance.current) {
        monacoInstance.current.dispose();
      }
    };
  }, []);

  const updateOutput = (value: string) => {
    try {
      const transformed = new Onoper().execute(value);
      setOutputValue(transformed);
    } catch (err) {
      const e = err as Error;
      setOutputValue(`<div class="p-4 text-red-600 bg-red-50 rounded">Erro: ${e.message}</div>`);
    }
  };

  return (
    <main class="h-screen w-full bg-slate-50 font-sans flex flex-col">
      {/* Header com título e botão de ajuda */}
      <header class="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-slate-800">Onoper Playground</h1>
        <button 
          onClick={() => setShowHelp(!showHelp)}
          class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center"
        >
          <span class="mr-2">
            📚
          </span>
          Tutorial
        </button>
      </header>

      {showHelp && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold text-slate-800">Metacaracteres do Onoper</h2>
                <button 
                  onClick={() => setShowHelp(false)}
                  class="text-slate-500 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
              
              <div class="space-y-4">
                {METACHARACTERS.map((char) => (
                  <div class="flex items-start">
                    <span class="inline-block bg-blue-100 text-blue-800 rounded px-2 py-1 font-mono text-sm mr-3">
                      {char.symbol}
                    </span>
                    <p class="text-slate-700">{char.description}</p>
                  </div>
                ))}
              </div>
              
              <div class="mt-8 pt-4 border-t border-slate-200">
                <h3 class="font-medium text-slate-800 mb-2">Exemplo:</h3>
                <pre class="bg-slate-100 p-3 rounded text-sm overflow-auto">
                {(
                  "- Item 1\n" +
                  "  ! Problema 1\n" +
                  "  ! Problema 2\n" +
                  "  # Este é um comentário explicativo\n"
                )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      <div class="grid grid-cols-2 lg:grid-cols-5 gap-8 w-full max-w-7xl mx-auto flex-grow p-8">
        
        <section class="flex flex-col h-full lg:col-span-2">
          <h2 class="text-lg font-semibold text-slate-700 mb-3">Editor</h2>
          <div class="py-8 pr-12 pl-0 flex-grow bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
            <div ref={editorRef} class="w-full h-full" />
          </div>
        </section>

        <section class="flex flex-col h-full lg:col-span-3">
          <h2 class="text-lg font-semibold text-slate-700 mb-3">Preview</h2>
          <div class="flex-grow p-4 bg-slate-100 rounded-xl shadow-inner border border-slate-200 relative overflow-hidden">
            <div
              class="absolute w-full h-full left-0 top-0 p-4 bg-white rounded-xl shadow-md border border-slate-200 overflow-auto"
              dangerouslySetInnerHTML={{ __html: outputValue || "<p class='text-slate-400'>Digite algo no editor para ver o resultado</p>" }}
            />
          </div>
        </section>

      </div>
    </main>
  );
}
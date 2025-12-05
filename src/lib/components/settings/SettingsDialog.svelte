<script lang="ts">
  import { settings, type AppSettings } from '../../stores/appStore';
  import { X, Save, Bot, PenTool, RotateCcw } from 'lucide-svelte';

  let { open = $bindable() } = $props();

  let localSettings = $state<AppSettings>(JSON.parse(JSON.stringify($settings)));
  let activeTab = $state<'llm' | 'drawio'>('llm');

  const DEFAULTS = {
      llm: {
          baseUrl: 'https://api.openai.com/v1',
          apiKey: '',
          model: 'gpt-4o',
          temperature: 0.7,
          maxTokens: 2000,
          systemPrompt: 'You are an expert Draw.io diagram assistant. You have access to the current XML of the diagram. When asked to modify the diagram, provide the full updated XML in a code block. When asked to explain, reference specific cell IDs or values.',
      },
      drawio: {
          baseUrl: 'https://embed.diagrams.net',
      },
  };

  function save() {
    settings.set(localSettings);
    open = false;
  }

  function resetField(category: 'llm' | 'drawio', field: string) {
    // @ts-ignore
    localSettings[category][field] = DEFAULTS[category][field];
  }
</script>

{#if open}
<div class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity">
  <div class="bg-white w-[600px] h-[600px] overflow-hidden rounded-2xl border border-neutral-200 shadow-2xl flex flex-col transform transition-all scale-100">
    
    <!-- Header -->
    <div class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-white">
      <h2 class="text-xl font-semibold text-neutral-800 tracking-tight">Settings</h2>
      <button 
        onclick={() => open = false}
        class="text-neutral-400 hover:text-neutral-600 transition-colors p-1 hover:bg-neutral-50 rounded-full"
      >
        <X size={20} />
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-neutral-100 px-6 gap-6">
      <button 
        class="py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 {activeTab === 'llm' ? 'border-blue-500 text-blue-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}"
        onclick={() => activeTab = 'llm'}
      >
        <Bot size={16} /> LLM Configuration
      </button>
      <button 
        class="py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 {activeTab === 'drawio' ? 'border-orange-500 text-orange-600' : 'border-transparent text-neutral-500 hover:text-neutral-700'}"
        onclick={() => activeTab = 'drawio'}
      >
        <PenTool size={16} /> Draw.io Configuration
      </button>
    </div>

    <!-- Content -->
    <div class="p-6 overflow-y-auto bg-neutral-50/50 flex-1 h-[500px]">
      
      {#if activeTab === 'llm'}
        <!-- LLM Settings -->
        <div class="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          <!-- System Prompt -->
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-neutral-700 block">System Prompt</label>
              <button onclick={() => resetField('llm', 'systemPrompt')} class="text-neutral-400 hover:text-blue-600 transition-colors" title="Reset to default">
                <RotateCcw size={14} />
              </button>
            </div>
            <textarea 
              bind:value={localSettings.llm.systemPrompt}
              class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-shadow shadow-sm placeholder:text-neutral-400 h-24 resize-none"
              placeholder="Enter system prompt..."
            ></textarea>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-neutral-700 block">Base URL</label>
              <button onclick={() => resetField('llm', 'baseUrl')} class="text-neutral-400 hover:text-blue-600 transition-colors" title="Reset to default">
                <RotateCcw size={14} />
              </button>
            </div>
            <input 
              type="text" 
              bind:value={localSettings.llm.baseUrl}
              class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-shadow shadow-sm placeholder:text-neutral-400"
              placeholder="https://api.openai.com/v1"
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-neutral-700 block">API Key</label>
              <button onclick={() => resetField('llm', 'apiKey')} class="text-neutral-400 hover:text-blue-600 transition-colors" title="Reset to default">
                <RotateCcw size={14} />
              </button>
            </div>
            <input 
              type="password" 
              bind:value={localSettings.llm.apiKey}
              class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-shadow shadow-sm placeholder:text-neutral-400"
              placeholder="sk-..."
            />
          </div>

          <div class="grid grid-cols-2 gap-5">
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-neutral-700 block">Model</label>
                <button onclick={() => resetField('llm', 'model')} class="text-neutral-400 hover:text-blue-600 transition-colors" title="Reset to default">
                  <RotateCcw size={14} />
                </button>
              </div>
              <input 
                type="text" 
                bind:value={localSettings.llm.model}
                class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-shadow shadow-sm placeholder:text-neutral-400"
                placeholder="gpt-4o"
              />
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium text-neutral-700 block">Temperature</label>
                <button onclick={() => resetField('llm', 'temperature')} class="text-neutral-400 hover:text-blue-600 transition-colors" title="Reset to default">
                  <RotateCcw size={14} />
                </button>
              </div>
              <input 
                type="number" 
                step="0.1"
                min="0"
                max="2"
                bind:value={localSettings.llm.temperature}
                class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-shadow shadow-sm"
              />
            </div>
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-neutral-700 block">Max Tokens</label>
              <button onclick={() => resetField('llm', 'maxTokens')} class="text-neutral-400 hover:text-blue-600 transition-colors" title="Reset to default">
                <RotateCcw size={14} />
              </button>
            </div>
            <input 
              type="number" 
              step="100"
              bind:value={localSettings.llm.maxTokens}
              class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-shadow shadow-sm"
            />
          </div>
        </div>
      {:else}
        <!-- Draw.io Settings -->
        <div class="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-neutral-700 block">Draw.io Base URL</label>
              <button onclick={() => resetField('drawio', 'baseUrl')} class="text-neutral-400 hover:text-orange-600 transition-colors" title="Reset to default">
                <RotateCcw size={14} />
              </button>
            </div>
            <input 
              type="text" 
              bind:value={localSettings.drawio.baseUrl}
              class="w-full bg-white border border-neutral-200 rounded-lg px-4 py-2.5 text-sm text-neutral-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-shadow shadow-sm placeholder:text-neutral-400"
              placeholder="https://embed.diagrams.net"
            />
            <p class="text-xs text-neutral-500 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block"></span>
              Requires page reload to take effect.
            </p>
          </div>
        </div>
      {/if}

    </div>

    <!-- Footer -->
    <div class="p-4 border-t border-neutral-100 flex justify-end gap-3 bg-white">
      <button 
        onclick={() => open = false}
        class="px-5 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors"
      >
        Cancel
      </button>
      <button 
        onclick={save}
        class="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-all shadow-sm hover:shadow-md active:scale-95"
      >
        <Save size={16} /> Save Changes
      </button>
    </div>
  </div>
</div>
{/if}

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as monaco from 'monaco-editor';
  import { currentXml, chatHistory, isChatOpen } from '../../stores/appStore';

  let editorContainer: HTMLDivElement;
  let editor: monaco.editor.IStandaloneCodeEditor;
  let isInternalChange = false;

  onMount(() => {
    // Initialize Monaco Editor
    editor = monaco.editor.create(editorContainer, {
      value: $currentXml,
      language: 'xml',
      theme: 'vs',
      automaticLayout: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
    });

    // Add "Send to LLM" action
    editor.addAction({
      id: 'send-to-llm',
      label: 'Send to LLM',
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: (ed) => {
        const selection = ed.getModel()?.getValueInRange(ed.getSelection()!);
        if (selection) {
          // Add to chat history
          chatHistory.update(h => [...h, {
            role: 'user',
            content: `Here is a snippet of the XML:\n\`\`\`xml\n${selection}\n\`\`\`\nCan you explain or modify this?`,
            timestamp: Date.now()
          }]);
          // Open chat if closed
          isChatOpen.set(true);
        }
      }
    });

    // Listen for editor changes
    editor.onDidChangeModelContent(() => {
      if (!isInternalChange) {
        const value = editor.getValue();
        // Update store, but flag to avoid loop if store updates back
        // Actually, store update will trigger subscription, so we need to handle that.
        // But here we just update the store. The store subscription should check if value changed.
        currentXml.set(value);
      }
    });

    // Subscribe to store changes
    const unsubscribe = currentXml.subscribe((value) => {
      if (editor && value !== editor.getValue()) {
        isInternalChange = true;
        const position = editor.getPosition();
        editor.setValue(value);
        if (position) {
            editor.setPosition(position);
        }
        isInternalChange = false;
      }
    });

    return () => {
      unsubscribe();
      editor.dispose();
    };
  });
</script>

<div bind:this={editorContainer} class="h-full w-full"></div>

<style>
  /* Ensure container takes full height */
  div {
    min-height: 0;
  }
</style>

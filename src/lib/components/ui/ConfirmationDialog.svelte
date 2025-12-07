<script lang="ts">
    import { X, AlertTriangle, AlertCircle } from "lucide-svelte";

    export let open: boolean = false;
    export let title: string = "Confirm Action";
    export let message: string = "Are you sure you want to proceed?";
    export let confirmText: string = "Confirm";
    export let cancelText: string = "Cancel";
    export let variant: "danger" | "default" = "default";

    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    function onConfirm() {
        dispatch("confirm");
        open = false;
    }

    function onCancel() {
        dispatch("cancel");
        open = false;
    }
</script>

{#if open}
    <div
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all animate-in fade-in duration-200"
    >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all scale-100 animate-in zoom-in-95 duration-200"
            onclick={(e) => e.stopPropagation()}
        >
            <div class="p-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0">
                        {#if variant === "danger"}
                            <div
                                class="p-2 bg-red-100 text-red-600 rounded-full"
                            >
                                <AlertTriangle size={24} />
                            </div>
                        {:else}
                            <div
                                class="p-2 bg-blue-100 text-blue-600 rounded-full"
                            >
                                <AlertCircle size={24} />
                            </div>
                        {/if}
                    </div>
                    <div class="flex-1">
                        <h3
                            class="text-lg font-semibold text-neutral-900 leading-6 mb-2"
                        >
                            {title}
                        </h3>
                        <p class="text-sm text-neutral-500 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>
            </div>

            <div
                class="bg-neutral-50 px-6 py-4 flex justify-end gap-3 border-t border-neutral-100"
            >
                <button
                    onclick={onCancel}
                    class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors focus:ring-2 focus:ring-neutral-200 outline-none"
                >
                    {cancelText}
                </button>
                <button
                    onclick={onConfirm}
                    class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors shadow-sm outline-none focus:ring-2 focus:ring-offset-1 {variant ===
                    'danger'
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                        : 'bg-neutral-900 hover:bg-neutral-800 focus:ring-neutral-700'}"
                >
                    {confirmText}
                </button>
            </div>
        </div>
    </div>
{/if}

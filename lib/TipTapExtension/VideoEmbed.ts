// extensions/VideoEmbed.ts
import { Node, mergeAttributes } from '@tiptap/core'

export interface VideoEmbedOptions {
    HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        videoEmbed: {
            /**
             * Insert a video embed
             */
            setVideo: (options: { src: string }) => ReturnType
        }
    }
}

export const VideoEmbed = Node.create<VideoEmbedOptions>({
    name: 'videoEmbed',

    group: 'block',
    atom: true,

    addOptions() {
        return {
            HTMLAttributes: {
                class: 'video-wrapper my-6',
            },
        }
    },

    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: 560,
            },
            height: {
                default: 315,
            },
            frameborder: {
                default: 0,
            },
            allowfullscreen: {
                default: true,
            },
            class: {
                default: 'w-full aspect-video rounded-lg',
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div.video-wrapper iframe',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(this.options.HTMLAttributes),
            ['iframe', HTMLAttributes],
        ]
    },

    addCommands() {
        return {
            setVideo:
                (options: { src: string }) =>
                    ({ chain }) => {
                        return chain()
                            .insertContent({
                                type: this.name,
                                attrs: options,
                            })
                            .run()
                    },
        }
    },
})

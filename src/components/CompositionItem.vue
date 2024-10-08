<template>
    <div class="border border-gray-200 p-3 mb-4 rounded">
        <div v-show="!showForm">
            <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
            <button @click.prevent="deleteSong" class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
                <i class="fa fa-times"></i>
            </button>
            <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
                @click.prevent="showForm = !showForm">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-show="showForm">
            <div class="text-white text-center font-bold p-4 mb-4" v-if="show_alert" :class="alert_variant">{{ alert_message
            }}</div>
            <vee-form :validation-schema="validation_schema" @submit="editSong" :initial-values="song">
                <div class="mb-3">
                    <label class="inline-block mb-2">Song Title</label>
                    <vee-field type="text" name="modified_name" @input="updateUnsavedFlag(true)"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Song Title" />
                    <ErrorMessage class="text-red-600" name="modified_name"></ErrorMessage>
                </div>
                <div class="mb-3">
                    <label class="inline-block mb-2">Genre</label>
                    <vee-field type="text" name="genre" @input="updateUnsavedFlag(true)"
                        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                        placeholder="Enter Genre" />
                    <ErrorMessage class="text-red-600" name="genre"></ErrorMessage>
                </div>
                <button :disabled="in_submission" type="submit" class="py-1.5 px-3 rounded text-white bg-green-600">
                    Submit
                </button>
                <button @click.prevent="showForm = false" :disabled="in_submission" type="button"
                    class="py-1.5 px-3 rounded text-white bg-gray-600">
                    Go Back
                </button>
            </vee-form>
        </div>
    </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
    name: 'CompositionItem',
    props: {
        song: {
            type: Object,
            required: true,
        },
        updateSong: {
            type: Function,
            required: true
        },
        removeSong: {
            type: Function,
            required: true
        },
        updateUnsavedFlag: {
            type: Function,
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showForm: false,
            validation_schema: {
                modified_name: 'required',
                genre: 'required|alpha_spaces'
            },
            in_submission: false,
            show_alert: false,
            alert_variant: 'bg-blue-500',
            alert_message: 'Please wait'
        };
    },
    methods: {
        async editSong(values) {
            console.log(values)
            this.in_submission = true
            this.show_alert = true
            this.alert_message = "Song being edited..."

            try {
                await songsCollection.doc(this.song.docID).update({
                    modified_name: values.modified_name,
                    genre: values.genre
                })
            } catch (error) {
                this.in_submission = false
                this.alert_message = "An error occured"
                this.alert_variant = "bg-red-500"
                return
            }
            this.updateSong(this.index, values)
            this.in_submission = false
            this.alert_message = "Song has been edited"
            this.alert_variant = "bg-green-500"
        },
        async deleteSong() {
            const storageRef = storage.ref();
            const songRef = storageRef.child(`songs/${this.song.original_name}`)

            await songRef.delete()
            await songsCollection.doc(this.song.docID).delete();
            this.removeSong(this.index)
            this.updateUnsavedFlag(false)
        }
    }
}
</script>
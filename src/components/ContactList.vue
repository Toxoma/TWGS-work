<template>
<div class="">
    <ContactBlock v-for="contact in array" :key="contact.id" :info="contact" :delFlag="delFlag" :currentPage="currentPage" v-on:deleteEvent="$emit('deleteEvent', $event)" v-on:selectUser="$emit('selectUser', $event)" />
</div>
</template>

<script>
import {
    mapState,
} from "vuex";
import ContactBlock from '../components/ContactBlock.vue'

export default {
    name: 'ContactList',
    data() {
        return {
            sortArray: [],
        };
    },
    props: {
        delFlag: Boolean,
        currentPage: Boolean,
    },
    components: {
        ContactBlock,
    },
    computed: {
        ...mapState({
            contacts: (state) => state.contacts,
        }),

        array: function () {
            return this.sortMas(this.contacts);
        },

    },
    methods: {
        sortMas: function (mas) {
            mas.sort((prev, next) => {
                if (prev.name < next.name) return -1;
                if (prev.name > next.name) return 1;
            });
            return mas;
        },

    },
    mounted() {

    },
}
</script>

<style scoped lang="scss">

</style>

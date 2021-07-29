<template>
<div class="">
    <ContactBlock 
    v-for="contact in array" :key="contact.id" 
    :info="contact" 
    :delFlag="delFlag" 
    :currentPage="currentPage" 
    v-on:deleteEvent="$emit('deleteEvent', $event)" 
    v-on:selectUser="$emit('selectUser', $event)" />
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
            //массив с нашими контактами
            contacts: (state) => state.contacts,
        }),
        //отсортированный массив по алфавиту
        array: function () {
            return this.sortMas(this.contacts);
        },

    },
    methods: {
        //метод сортировки массива по алфавиту
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

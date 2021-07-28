<template>
<div class="contact-info">
    <div class="header">
        <img @click="$emit('back',!currentPage)" class="foto-back" src="../assets/back.svg" alt="back">
        <button @click="returnEvent" :disabled="previousVersion.length<=1">Отмена изменения</button>
    </div>
    <main>
        <GenerateUserLines v-for="line in array" :key="line" :info="line" :delElemFlag="delElemFlag" :changeLineFlag="changeLineFlag" v-on:deleteLine="$emit('deleteLine',$event)" v-on:changeLine="$emit('changeLine',$event)" />
    </main>
    <button class="add-line" @click="$emit('openPopupAddLine', !addLineFlag)">
        Добавить поле
    </button>

</div>
</template>

<script>
import {
    mapActions,
    mapState
} from "vuex";
import GenerateUserLines from '../components/GenerateUserLines.vue'

export default {
    name: 'ContatcInfo',
    data() {
        return {
            previousVersion: [],
        };
    },
    props: {
        addLineFlag: Boolean,
        delElemFlag: Boolean,
        changeLineFlag: Boolean,
        currentPage: Boolean,
    },
    components: {
        GenerateUserLines,
    },
    computed: {
        ...mapState({
            info: (state) => state.selectedContact,
        }),
        array: function () {
            this.saveInfo(this.info);
            return this.sortMas(Object.entries(this.info));
        },

    },
    methods: {
        ...mapActions({
            returnBehind: "returnBehind",
        }),
        sortMas: function (mas) {
            mas.sort((prev, next) => {
                if (prev[0] < next[0]) return -1;
                if (prev[0] > next[0]) return 1;
            });
            return mas;
        },

        saveInfo: function (arr) {
            this.previousVersion.push({
                ...arr
            });
        },

        returnEvent: function () {
            const key = this.previousVersion.length - 2;

            if (key >= 0) {
                this.returnBehind(this.previousVersion[key]);

                setTimeout(() => {
                    this.previousVersion.splice(key + 1);
                }, 100);
            }
        },
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.contact-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 300px;

    .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .foto-back {
        height: 20px;
        cursor: pointer;
    }

    .add-line {
        cursor: pointer;
        align-self: center;
        width: 50%;
        padding: 5px;
        margin: 10px 0;
        border-radius: 20px;
    }

}
</style>

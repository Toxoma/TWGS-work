<template>
<div class="contact-info">
    <div class="header">
        <img @click="$emit('back',!currentPage)" class="foto-back" src="../assets/back.svg" alt="back">
        <button class="reset-btn" @click="returnEvent" :disabled="previousVersion.length<=1">Отмена изменения</button>
    </div>
    <main>
        <GenerateUserLines v-for="line in array" :key="line" 
        :info="line" 
        :delElemFlag="delElemFlag" 
        :changeLineFlag="changeLineFlag" 
        v-on:deleteLine="$emit('deleteLine',$event)" 
        v-on:changeLine="$emit('changeLine',$event)" />
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
            //здесь массив с записями предыдущих версий изменений
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
            //данные выбранного контакта
            info: (state) => state.selectedContact,
        }),
        //отсортированный массив с данными выбранного контакта
        array: function () {
            //вызов метода сохранения текущей версии изменения
            this.saveInfo(this.info);
            // результат метода сортировки в который мы передали объект пересобранный в массив
            return this.sortMas(Object.entries(this.info));
        },

    },
    methods: {
        ...mapActions({
            //перезапись выбранных данных на шаг назад
            returnBehind: "returnBehind",
        }),
        //метод сортировки массива
        sortMas: function (mas) {
            mas.sort((prev, next) => {
                if (prev[0] < next[0]) return -1;
                if (prev[0] > next[0]) return 1;
            });
            return mas;
        },
        //метод сохранения текущей версии изменения
        saveInfo: function (arr) {
            this.previousVersion.push({
                ...arr
            });
        },
        //метод отката версии изменения
        returnEvent: function () {
            //ключ предыдущей версии иззменения
            const key = this.previousVersion.length - 2;

            if (key >= 0) {
                this.returnBehind(this.previousVersion[key]);
                //очистка массива previousVersion от более новых изменений
                //кнопка "отката" при размере previousVersion < 2 не работает
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
        .reset-btn{
             cursor: pointer;
        }
        .reset-btn:disabled{
            cursor: default;
        }
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

<template>
<div class="wrapp">
    <div class="contact-list" v-if="!currentPage">
        <button class="add-contact" @click="addFlag=true">
            Добавить контакт
        </button>
        <div class="main">
            <ContactList :delFlag="delFlag" :currentPage="currentPage" v-on:deleteEvent="delFlag=$event.delFlag, selectEl=$event.info" v-on:selectUser="currentPage=$event" />
        </div>
    </div>
    <ContactInfo v-else :addLineFlag="addLineFlag" :delElemFlag="delElemFlag" :changeLineFlag="changeLineFlag" v-on:openPopupAddLine="addLineFlag=$event" :currentPage="currentPage" v-on:back="currentPage=$event" v-on:deleteLine="delElemFlag=$event.delElemFlag, selectLine=$event.info" v-on:changeLine="changeLineFlag=$event.changeLineFlag, selectLine=$event.info, selectLineKey = $event.info[0]" />
    <div class="popup-add" v-if="addFlag">
        <form id="form1" @submit.prevent="addContact">
            <input type="text" v-model="name" placeholder="Имя">
            <input type="tel" v-model="phone" placeholder="Телефон">
            <button type="submit">Добавить</button>
        </form>
    </div>
    <div class="popup-confirm" v-if="delFlag">
        <div class="wrapp-confirm">
            <p>Вы уверены,<br>что хотите удалить контакт?<br>{{selectEl.name}}</p>
            <div class="btns">
                <button @click="deletElem">Да</button>
                <button @click="closeConfirmPopup">Нет</button>
            </div>
        </div>
    </div>
    <div class="popup-elem-confirm" v-if="delElemFlag">
        <div class="wrapp-confirm">
            <p>Вы уверены,<br>что хотите удалить строку?<br>{{selectLine[0]}}</p>
            <div class="btns">
                <button @click="delLine">Да</button>
                <button @click="closeElemConfirmPopup">Нет</button>
            </div>
        </div>
    </div>
    <div class="popup-add-line" v-if="addLineFlag">
        <form id="form2" @submit.prevent="addLine">
            <input type="text" v-model="nameLine" placeholder="Название">
            <input type="text" v-model="valueLine" placeholder="Значение">
            <button type="submit">Добавить</button>
        </form>
    </div>
    <div class="popup-change-line" v-if="changeLineFlag">
        <form id="form3" @submit.prevent="changeLine">
            <input type="text" v-model="selectLine[0]" placeholder="Название">
            <input type="text" v-model="selectLine[1]" placeholder="Значение">
            <button type="submit">Сохранить</button>
        </form>
    </div>

</div>
</template>

<script>
import ContactList from '../components/ContactList.vue'
import ContactInfo from '../components/ContatcInfo.vue'
import {
    mapActions
} from "vuex";

export default {
    name: 'Home',
    components: {
        ContactList,
        ContactInfo
    },
    data() {
        return {
            currentPage: false,
            addFlag: false,
            delFlag: false,
            delElemFlag: false,
            addLineFlag: false,
            changeLineFlag: false,
            name: '',
            phone: '',
            nameLine: '',
            valueLine: '',
            selectLineKey: '',
            selectEl: {},
            selectLine: {},
        };
    },
    computed: {

    },
    methods: {
        ...mapActions({
            getContacts: "getContacts",
            addNewContact: "addNewContact",
            addNewLine: "addNewLine",
            deleteContact: "deleteContact",
            deleteLine: "deleteLine",
            changeUserLine: "changeUserLine",
        }),
        checkClick: function (e) {
            if (e.target.closest('.popup-add') && !e.target.closest('#form1')) {
                this.closeAddPopup();
            }
            if (e.target.closest('.popup-confirm') && !e.target.closest('.wrapp-confirm')) {
                this.closeConfirmPopup();
            }
            if (e.target.closest('.popup-add-line') && !e.target.closest('#form2')) {
                this.closeAddLinePopup();
            }
            if (e.target.closest('.popup-change-line') && !e.target.closest('#form3')) {
                this.closeChangeLinePopup();
            }
            if (e.target.closest('.popup-elem-confirm') && !e.target.closest('.wrapp-confirm')) {
                this.closeElemConfirmPopup();
            }
        },

        closeAddPopup: function () {
            this.addFlag = false;
            this.name = '';
            this.phone = '';
        },
        closeAddLinePopup: function () {
            this.addLineFlag = false;
            this.nameLine = '';
            this.valueLine = '';
        },
        closeConfirmPopup: function () {
            this.delFlag = false;
        },
        closeElemConfirmPopup: function () {
            this.delElemFlag = false;
        },
        closeChangeLinePopup: function () {
            this.changeLineFlag = false;
        },

        deletElem: function () {
            this.deleteContact(this.selectEl);
            this.closeConfirmPopup();
        },
        delLine: function () {
            this.deleteLine(this.selectLine);
            this.closeElemConfirmPopup();
        },

        addContact: function () {
            this.addNewContact({
                name: this.name,
                phone: this.phone
            });
            this.closeAddPopup();
        },
        addLine: function () {
            this.addNewLine({
                name: this.nameLine,
                value: this.valueLine
            });
            this.closeAddLinePopup();
        },
        changeLine: function () {
            this.changeUserLine([this.selectLineKey, this.selectLine]);
            this.closeChangeLinePopup();
        },
    },
    mounted() {
        document.addEventListener('click', this.checkClick);
        this.getContacts();
    },
}
</script>

<style lang="scss">
.wrapp {
    margin: 1rem;
    padding: 1rem;
    height: 100%;
    min-width: 280px;
    max-width: 450px;
    background-color: rgb(218, 218, 218);
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    position: relative;

    & * {
        margin: 0;
        padding: 0;
    }

    &>.contact-list {
        display: flex;
        flex-direction: column;

        .add-contact {
            align-self: center;
            width: 50%;
            padding: 5px;
            margin-bottom: 10px;
            border-radius: 20px;
        }

        &>.main {
            // Для примера высота в 400px чтобы было видно прокрутку.
            // height: 100%;
            height: 400px;
            overflow-y: auto;
            box-shadow: 0px -5px 5px -5px rgba(34, 60, 80, 0.6) inset;
        }
    }

    .popup-add::before,
    .popup-add-line::before,
    .popup-elem-confirm::before,
    .popup-change-line::before,
    .popup-confirm::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        opacity: 0.5;
        border-radius: 20px;
        background-color: rgb(0, 0, 0);
    }

    .popup-confirm,
    .popup-add-line,
    .popup-change-line,
    .popup-elem-confirm,
    .popup-add {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    form,
    .wrapp-confirm {
        padding: 20px;
        height: 100px;
        min-width: 20rem;
        border-radius: 30px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .wrapp-confirm {
        p {
            text-align: center;
        }

        button {
            width: 8ch;
            height: 4ch;
        }

        .btns button:first-child {
            margin-right: 1rem;
        }
    }

    .foto-delete,
    .foto-change {
        height: 20px;

    }

    .foto-delete {
        margin-right: 10px;
    }

    .btns>img {
        cursor: pointer;
    }
}
</style>

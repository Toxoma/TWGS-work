<template>
<div class="contact-wrapp">
    <div class="main">
        <div class="user-info" @click="putInStorage">
            <div class="name">
                {{info.name}}
            </div>
            <div class="phone">
                {{info.phone}}
            </div>
        </div>
        <div class="btns">
            <img @click="$emit('deleteEvent', {
                info: info,
                delFlag: !delFlag,
            })" class="foto-delete" src="../assets/delete-svgrepo-com.svg" alt="del">
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";

export default {
    name: 'ContactBlock',
    data() {
        return {

        };
    },
    props: {
        info: Object,
        delFlag: Boolean,
        currentPage: Boolean,
    },
    computed: {

    },
    methods: {
        ...mapActions({
            selectContact: "selectContact",
        }),
        putInStorage: function () {
            this.$emit('selectUser', !this.currentPage);
            this.selectContact(this.info);
        },
    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>
.contact-wrapp {
    margin-bottom: 1rem;
    border-bottom: 1px solid #000;

    .main {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .user-info {
            width: 100%;
            padding: 5px;
            margin-right: 10px;
        }

        .user-info:hover {
            background-color: rgb(157, 213, 229);
            border-radius: 5px;
        }
    }
}
</style>

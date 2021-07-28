<template>
<div class="info-wrap">
    <div class="info">
        <p class="key">{{info[0]}}:</p>
        <p class="value">{{info[1]}}</p>
    </div>
    <div class="btns">
        <img @click="$emit('changeLine', {
                info: info,
                changeLineFlag: !changeLineFlag,
            })" class="foto-change" src="../assets/change.svg" alt="del">
        <img @click="$emit('deleteLine', {
                info: info,
                delElemFlag: !delElemFlag,
            })" class="foto-delete" src="../assets/delete-svgrepo-com.svg" alt="del">
    </div>
</div>
</template>

<script>
export default {
    name: 'ContactList',
    data() {
        return {

        };
    },
    props: {
        info: Object,
        delElemFlag: Boolean,
        changeLineFlag: Boolean,
    },
    components: {

    },
    computed: {

    },
    methods: {

    },
    mounted() {},
}
</script>

<style lang="scss" scoped>
.info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info {
        display: flex;
        padding: 3px 0;
        word-break: break-all;
    }

    .key {
        margin-right: 1rem;
        min-width: 5rem;
    }

    border-bottom: 1px solid #000;

    .btns {
        display: flex;
    }
}
</style>

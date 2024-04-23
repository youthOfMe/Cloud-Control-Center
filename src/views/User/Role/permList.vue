<template>
    <div>
        <el-tree
            :data="getPermList()"
            :props="defaultProps"
            show-checkbox
            ref="tree"
            node-key="id"
            default-expand-all
            :default-checked-keys="getSelectIdData()"
        ></el-tree>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePermStore } from '@/store'

const { getPermList, getSelectIdData } = usePermStore()

const defaultProps = {
    children: 'children',
    label: 'name',
}
</script>

<style lang="less" scoped></style>

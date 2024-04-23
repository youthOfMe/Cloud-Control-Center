<template>
    <el-card>
        <base-info :data="data.baseData"></base-info>
        <cpu-info :data="data.cpuInfo"></cpu-info>
        <memory-info :data="data.memoryInfo"></memory-info>
        <swap-info :data="data.swapInfo"></swap-info>
        <net-info :data="data.netInfo"></net-info>
        <disk-info :data="data.diskInfo"></disk-info>
    </el-card>
</template>

<script setup>
import BaseInfo from './BaseInfo.vue'
import CpuInfo from './CpuInfo.vue'
import MemoryInfo from './MemoryInfo.vue'
import SwapInfo from './SwapInfo.vue'
import NetInfo from './NetInfo.vue'
import DiskInfo from './DiskInfo.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { reqHostDetail } from '@/api/host/index.js'

const data = ref({
    baseData: {
        name: '',
        username: '',
        user: '',
        port: '',
        ip_addr: '',
        environment: '',
        status: '',
        memo: '',
        created_time: '',
        updated_time: '',
        category: '',
    },
    cpuInfo: {
        cpu_count: '',
        cpu_logical_count: '',
    },
    memoryInfo: {
        memory_total: '',
    },
    swapInfo: {
        swap_total: '',
    },
    netInfo: {
        base_data: '',
        cpu_info: '',
        memory_info: '',
        swap_info: '',
        net_info: '',
    },
    diskInfo: {
        disk_info: [],
    },
})
const route = useRoute()
const getHosDetail = () => {
    reqHostDetail({
        id: route.params.id,
    }).then((response) => {
        ;(data.value.baseData = response.base_data), (data.value.cpuInfo = response.cpu_info)
        data.value.memoryInfo = response.memory_info
        data.value.swapInfo = response.swap_info
        data.value.netInfo = response.net_info
        let data_disk = response.disk_info.disk_info
        data_disk = eval('(' + data_disk + ')')
        data.value.diskInfo.disk_info = data_disk
        // console.log(data_disk.substring(1, data_disk.length - 1).split('}'))
        // console.log(data_disk)
        // data.value.diskInfo = response.disk_info
    })
}

getHosDetail()
</script>

<style lang="less" scoped>
.margin-top {
    margin-top: 20px;
}
</style>

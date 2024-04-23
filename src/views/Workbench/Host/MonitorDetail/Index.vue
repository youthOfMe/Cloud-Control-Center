<template>
    <dash-board
        :cpuStatus="data.cpuStatus"
        :memoryStatus="data.memoryStatus"
        :diskInfo="data.diskInfo"
    ></dash-board>
    <el-row :gutter="15" style="margin-top: 15px">
        <el-col :span="6">
            <cpu-status></cpu-status>
        </el-col>
        <el-col :span="6">
            <memory-status :memoryStatus="data.memoryStatus"></memory-status>
        </el-col>
        <el-col :span="6">
            <swap-status></swap-status>
        </el-col>
        <el-col :span="6">
            <disk-status></disk-status>
        </el-col>
    </el-row>
    <el-card style="margin-top: 15px">
        <disk-info :data="data.diskInfo"></disk-info>
    </el-card>
</template>

<script setup>
import DashBoard from './DashBoard.vue'
import CpuStatus from './CpuStatus.vue'
import MemoryStatus from '@/views/Workbench/Host/MonitorDetail/MemoryStatus.vue'
import SwapStatus from './SwapStatus.vue'
import DiskStatus from './DiskStatus.vue'
import DiskInfo from '@/views/Host/Host/Detail/DiskInfo.vue'
import { ref } from 'vue'
import { reqHostDetail } from '@/api/host/index.js'
import { reqMonitorHostData } from '@/api/workbench/host/index.js'
import { useRoute } from 'vue-router'

const data = ref({
    diskInfo: {
        disk_info: [],
    },
    cpuStatus: {
        cpu_conut: '',
        cpu_avg_percent: 0,
        cpu_every_percent: [0, 0],
    },
    memoryStatus: {
        memory_total: '',
        memory_free: '',
        memory_available: '',
        memory_percent1: 0,
        memory_percent2: 0,
    },
    swapStatus: {},
})

const route = useRoute()
const getMonitorHostDetail = () => {
    reqMonitorHostData({
        id: route.params.id,
    }).then((response) => {
        response.cpu_data.cpu_every_percent = eval('(' + response.cpu_data.cpu_every_percent + ')')
        data.value.cpuStatus = response.cpu_data
        data.value.memoryStatus = response.memory_data
        let data_disk = response.disk_data.disk_data
        data_disk = eval('(' + data_disk + ')')
        console.log(data_disk)
        data.value.diskInfo.disk_info = data_disk

        // disk total
        let diskTotal = 0
        let diskFree = 0
        for (let item of data_disk.values()) {
            diskTotal += Number(item.total.substring(0, item.total.length - 1))
            diskFree += Number(item.free.substring(0, item.free.length - 1))
        }
        data.value.diskInfo.total = diskTotal
        data.value.diskInfo.free = diskFree

        // swap
    })
}

getMonitorHostDetail()
</script>

<style lang="less" scoped></style>

<template>
    <div id="main">
        <div
            class="screen-bg bg-[url('@/assets/displayUser/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-2 flex overflow-hidden"
            v-if="data"
        >
            <div class="flex-1 mr-2 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
                <!-- 横向柱状图 -->
                <HorizontalBar class="h-1/3 box-border pb-4" :data="data.regionData" />
                <!-- 雷达图 -->
                <RadarBar class="h-1/3 box-border pb-4" :data="data.riskData" />
                <!-- 数据传递关系图 -->
                <Relation class="h-1/3" :data="data.relationData" />
            </div>
            <div class="w-1/2 mr-2 flex flex-col">
                <!-- 数据展示图 -->
                <TotalData class="bg-opacity-50 bg-slate-800 p-3" :data="data.totalData" />
                <!-- 地图可视化 -->
                <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1" :data="data.mapData" />
            </div>
            <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
                <!-- 竖向柱状图 -->
                <VerticalBar class="h-1/3 box-border pb-4" :data="data.serverData" />
                <!-- 环形资源站比图 -->
                <RadiueBar class="h-1/3 box-border pb-4" :data="data.abnormalData" />
                <!-- 文档云图 -->
                <WordCloud class="h-1/3 box-border" :data="data.wordCloudData" />
            </div>
        </div>
    </div>
</template>

<script setup>
import HorizontalBar from '@/components/displayuser/HorizontalBar'
import RadarBar from '@/components/displayuser/RadarBar.vue'
import Relation from '@/components/displayuser//Relation.vue'
import TotalData from '@/components/displayuser/TotalData.vue'
import MapChart from '@/components/displayuser/MapChart.vue'
import VerticalBar from '@/components/displayuser/VerticalBar.vue'
import RadiueBar from '@/components/displayuser/RadiueBar.vue'
import useScalePage from '@/hooks/useScalePage'
import WordCloud from '@/components/displayuser/WordCloud.vue'

import { ref } from 'vue'
import { getVisualization } from '@/api/visualization.js'
import '@/style/display/style.css'

const data = ref(null)

const loadData = async () => {
    data.value = await getVisualization()
    // console.log(data.value)
}
loadData()

// // 大屏适配 hook
useScalePage({
    targetX: 1920,
    targetY: 1080,
    targetRatio: 16 / 9,
})

setInterval(() => {
    loadData()
}, 3000)
</script>

<style scoped>
.screen-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-color: #070a3c;
}
</style>

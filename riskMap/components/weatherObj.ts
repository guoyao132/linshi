import bingbao from '@/assets/images/riskMap/weather/tq-bb.png'
import baoxue from '@/assets/images/riskMap/weather/tq-bx.png'
import baoyu from '@/assets/images/riskMap/weather/tq-by.png'
import dafeng from '@/assets/images/riskMap/weather/tq-df.png'
import duoyun from '@/assets/images/riskMap/weather/tq-dy.png'
import dongyu from '@/assets/images/riskMap/weather/tq-dy-1.png'
import leidian from '@/assets/images/riskMap/weather/tq-ld.png'
import nishiliu from '@/assets/images/riskMap/weather/tq-nsl.png'
import qingtian from '@/assets/images/riskMap/weather/tq-qt.png'
import shachen from '@/assets/images/riskMap/weather/tq-sc.png'
import taifeng from '@/assets/images/riskMap/weather/tq-tf.png'
import yintian from '@/assets/images/riskMap/weather/tq-yt.png'
import zhongyu from '@/assets/images/riskMap/weather/tq-zy.png'
import hanchao from '@/assets/images/riskMap/weather/tq-hc.png'
import senlinhuozai from '@/assets/images/riskMap/weather/tq-slhz.png'
import hongzai from '@/assets/images/riskMap/weather/tq-hz.png'
import huapo from '@/assets/images/riskMap/weather/tq-hp.png'
import dizhen from '@/assets/images/riskMap/weather/tq-dz.png'
import yanqizhongdu from '@/assets/images/riskMap/weather/tq-yqzd.png'
import qiangnongwu from '@/assets/images/riskMap/weather/tq-qnw.png'

let weatherObjArr = [
  {
    name: "暴雪",
    img: baoxue,
    type: '4',
  },
  {
    name: "冻雨",
    img: dongyu,
    type: '1',
  },
  {
    name: '冰雹',
    img: bingbao,
    type: '2',
  },
  {
    name: "暴雨",
    img: baoyu,
    type: '6',
  },
  {
    name: "沙尘",
    img: shachen,
    type: '5',
  },
  {
    name: "大风",
    img: dafeng,
    type: '3',
  },
  {
    name: "大雾",
    img: qiangnongwu,
    type: '7',
  },
  {
    name: "霾",
    img: duoyun,
    type: '8',
  },
  {
    name: "台风",
    img: taifeng,
  },
  {
    name: "泥石",
    img: nishiliu,
  },
  {
    name: "多云",
    img: duoyun,
  },
  {
    name: "雷电",
    img: leidian,
  },
  {
    name: "晴",
    img: qingtian,
  },
  {
    name: "高温",
    img: qingtian,
  },
  {
    name: "阴",
    img: yintian,
  },
  {
    name: "中雨",
    img: zhongyu,
  },
  {
    name: "浓雾",
    img: qiangnongwu,
  },
  {
    name: "强浓雾",
    img: qiangnongwu,
  },
  {
    name: "烟气中毒",
    img: yanqizhongdu,
  },
  {
    name: "地震",
    img: dizhen,
  },
  {
    name: "滑坡",
    img: huapo,
  },
  {
    name: "洪灾",
    img: hongzai,
  },
  {
    name: "森林火灾",
    img: senlinhuozai,
  },
  {
    name: "寒潮",
    img: hanchao,
  },
  {
    name: "沙尘暴",
    img: shachen,
  },
  {
    name: "泥石流",
    img: nishiliu,
  },
]
export const getWeatherImgByName = (name: string) => {
  let obj = weatherObjArr.find((item) => item.name === name);
  if(obj){
    return obj.img;
  }else{
    return yintian;
  }
}
export default weatherObjArr;


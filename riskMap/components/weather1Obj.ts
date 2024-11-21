import baoyu from '@/assets/images/riskMap/weather/tq1-by.png'
import gaowen from '@/assets/images/riskMap/weather/tq1-gw.png'
import dafeng from '@/assets/images/riskMap/weather/tq1-df.png'
import leidian from '@/assets/images/riskMap/weather/tq1-ld.png'

let weatherObjArr = [
  {
    name: "高温",
    img: gaowen,
  },
  {
    name: "暴雨",
    img: baoyu,
  },
  {
    name: "雷电",
    img: leidian,
  },
  {
    name: "大风",
    img: dafeng,
  },
  // {
  //   name: "暴雪",
  //   img: baoxue,
  // },
  // {
  //   name: "冻雨",
  //   img: dongyu,
  // },
  // {
  //   name: '冰雹',
  //   img: bingbao,
  // },
  // {
  //   name: "沙尘",
  //   img: shachen,
  // },
  // {
  //   name: "泥石",
  //   img: nishiliu,
  // },
  // {
  //   name: "台风",
  //   img: taifeng,
  // },
  // {
  //   name: "多云",
  //   img: duoyun,
  // },
  // {
  //   name: "晴",
  //   img: qingtian,
  // },
  // {
  //   name: "阴",
  //   img: yintian,
  // },
  // {
  //   name: "中雨",
  //   img: zhongyu,
  // },
]
export const getWeatherImgByName = (name: string) => {
  let obj = weatherObjArr.find((item) => item.name === name);
  if(obj){
    return obj.img;
  }else{
    return gaowen;
  }
}
export default weatherObjArr;

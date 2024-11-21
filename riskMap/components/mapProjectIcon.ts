import bdzSGZ from '@/assets/images/riskMap/map/bdz-SGZ.png'
import bdzWSG from '@/assets/images/riskMap/map/bdz-WSG.png'
import gtSGZ from '@/assets/images/riskMap/map/gt-SGZ-2.png'
import gtWSG from '@/assets/images/riskMap/map/gt-WSG-2.png'

let mapProjectIconArr = [
  {
    name: "bdzSGZ",
    img: bdzSGZ,
  },
  {
    name: "bdzWSG",
    img: bdzWSG,
  },
  {
    name: "gtSGZ",
    img: gtSGZ,
  },
  {
    name: "gtWSG",
    img: gtWSG,
  },
]


export const getIconImgByName = (name: string) => {
  let obj = mapProjectIconArr.find((item) => item.name === name);
  if(obj){
    return obj.img;
  }else{
    return bdzWSG;
  }
}

export default mapProjectIconArr;

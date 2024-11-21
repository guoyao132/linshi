import Dexie from 'dexie'

export const getOffsetTop = (el: HTMLElement) => {
  let offset = 0;
  let parent: HTMLElement | null = el;
  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement | null;
  }
  return offset;
};
export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};
export const getCurrentHref = (containerEl: HTMLElement, tabsList: any) => {
  if (!containerEl)
    return;
  const scrollTop = containerEl.scrollTop;
  const anchorTopList = [];
  let ids: string[] = tabsList.map((item: any) => item.value);
  for (const id of ids) {
    const target = document.getElementById(id);
    if (!target)
      continue;
    const scrollEle = containerEl;
    const distance = getOffsetTopDistance(target, scrollEle);
    anchorTopList.push({
      top: distance - 100,
      id
    });
  }
  anchorTopList.sort((prev, next) => prev.top - next.top);
  for (let i = 0; i < anchorTopList.length; i++) {
    const item = anchorTopList[i];
    const next = anchorTopList[i + 1];
    if (i === 0 && scrollTop === 0) {
      return "";
    }
    if (item.top <= scrollTop && (!next || next.top > scrollTop)) {
      return item.id;
    }
  }
};

export const showViewById = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "start"
  })
}

export class MapIndexDB {
  public db: any;

  constructor() {
    this.db = null;
  }

  async init() {
    const db = new Dexie('MapIndexDB');
    db.version(1).stores({
      CITY: '++id, name'
    });
    db.version(1).stores({
      PROVINCE: '++id, name'
    });
    this.db = db;
    await db.open();
  }

  addDB(name: string, data: any, type = 'PROVINCE') {
    return this.db[type].add({name, data})
  }

  updateDB(name: string, data: any, type = 'PROVINCE') {
    return this.db[type].update(name, {data: data});
  }

  getPROVINCE(name: string) {
    return this.db.PROVINCE.get({name});
  }

  getCITY(name: string) {
    return this.db.CITY.get({name});
  }

  closeDB() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}


//格式化日期
/**
 * time 一个日期或者时间戳(number)
 * type 需要转换时间的格式
 *      hms 返回 h:m:s
 *      ymd 返回 y-m-d
 *      其他或者不传为：y-m-d h:m:s
 * customFormat 自定义返回时间格式
 *      例 y-m-d h:M:s、 yy/m/d、h:M:s、m/d h:M:s
 *      y:年，yy:年后两位，m:月，d:日，h:时，M:分，s: 秒
 *
 * */
export const formatTime = (time, type, customFormat) => {
  let date = time instanceof Date ? time : new Date(time);
  if (date == "Invalid Date") {
    console.error("日期格式错误");
    return
  }
  let dataStr = "";
  let y = date.getFullYear().toString(),
    m = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
    d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
    h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    M = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (customFormat) {
    customFormat = customFormat.replace(/yy/g, y.substring(2));
    customFormat = customFormat.replace(/y/g, y);
    customFormat = customFormat.replace(/m/g, m);
    customFormat = customFormat.replace(/d/g, d);
    customFormat = customFormat.replace(/h/g, h);
    customFormat = customFormat.replace(/M/g, M);
    customFormat = customFormat.replace(/s/g, s);
    return customFormat;
  } else {
    if (type === "hms") {
      dataStr = `${h}:${M}:${s}`;
    } else if (type === "ymd") {
      dataStr = `${y}-${m}-${d}`;
    } else if (type === "y") {
      dataStr = y;
    } else if (type === "ym") {
      dataStr = `${y}-${m}`;
    } else {
      dataStr = `${y}-${m}-${d} ${h}:${M}:${s}`;
    }
  }
  return dataStr;
}



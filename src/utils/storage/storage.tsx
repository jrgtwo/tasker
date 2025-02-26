class Storage {
  #storage = new Map()
  #splitKeys = []
  constructor() {
   
  }

  setData<InputType>(name: string, data:InputType, separateBy?: string|undefined, silentInsert = false) {
    debugger
    if (!!separateBy && Array.isArray(data)) {
      this.#storage.set(name, new Map())
      const tryUpdate = this.splitData(name, data, separateBy)  
      if (tryUpdate) {
        return Array.from(this.#storage.get(name), (_, val) => val)
      } else {
        return false
      }
    } 
    
    return this.#storage.set(name, data);
  }
  hasDataBy(name: string, key: string) {
    return this.#storage.get(name).has(key)
  }

  getDataBy(name: string, key: string) {
    return this.#storage.get(name).get(key)
  }

  getData(name: string) {
    if (this.#splitKeys.includes(name)) {
      debugger
      return Array.from(this.#storage.get(name), (_, val) => val)
    }
    return this.#storage.get(name)
  }

  hasData(name: string) {
    return this.#storage.has(name)
  }

  splitData(name: string, data, key: string) {
    const errors = []
    if (!this.#splitKeys.includes(name)) this.#splitKeys.push(name);

    if (!key) return false
  
    const dataMap = this.#storage.get(name)
    if (!dataMap) return false

    data.forEach((elem, index: number) => {
      if (!elem) {
        errors.push(`Missing Elem @ ${index}`);
        return
      }
      if (!elem[key]) {
        errors.push(`Missing Key Value @ ${index}`)
      }
      
      dataMap.set(elem[key], elem)
    })
    return true
  }
}

export { Storage }
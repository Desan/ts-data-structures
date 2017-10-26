import { HashTable } from './HashTable'
import { expect } from 'chai'

describe('Performance', () => {
    const hashTable = new HashTable(64000)
    it('should write fast', () => {
        const startTime = Date.now()
        for(let i = 0; i < 10000; i++) {
            hashTable.set(String(i), i)
        }
        const endTime = Date.now()
        const diff = endTime - startTime
        console.log('Time spent:', diff + ' ms')
        expect(diff).lessThan(100)
    })

    it('should read fast', () => {
        const startTime = Date.now()
        for(let i = 0; i < 10000; i++) {
            let dummy = hashTable.get(String(i))
        }
        const endTime = Date.now()
        const diff = endTime - startTime
        console.log('Time spent:', diff + ' ms')
        expect(diff).lessThan(100)
    })
})

describe('JS Object performance', () => {
    const object = {} as {[key: string]: number}
    it('should write fast', () => {
        const startTime = Date.now()
        for(let i = 0; i < 10000; i++) {
            object[String(i)] = i
        }
        const endTime = Date.now()
        const diff = endTime - startTime
        console.log('Time spent:', diff + ' ms')
        expect(diff).lessThan(100)
    })

    it('should read fast', () => {
        const startTime = Date.now()
        for(let i = 0; i < 10000; i++) {
            let dummy = object[String(i)]
        }
        const endTime = Date.now()
        const diff = endTime - startTime
        console.log('Time spent:', diff + ' ms')
        expect(diff).lessThan(100)
    })
})
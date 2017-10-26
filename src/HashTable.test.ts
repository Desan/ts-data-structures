import { HashTable } from './HashTable'
import { expect } from 'chai'

describe('HashTable', () => {
    const one = 'one'
    const two = 'two'
    const three = 'three'
    const dataSet = { one, two, three } as {[key: string]: string}

    describe('set()', () => {
        const hashTable = new HashTable()

        it('should set value', () => {
            hashTable.set(one, dataSet[one])
            expect(hashTable.size).equal(1)
            expect(hashTable.get(one)).equal(dataSet[one])

            hashTable.set(two, dataSet[two])
            expect(hashTable.size).equal(2)
            expect(hashTable.get(one)).equal(dataSet[one])
            expect(hashTable.get(two)).equal(dataSet[two])
        })
    })

    describe('get()', () => {
        const hashTable = new HashTable()

        it('should get value by key', () => {
            hashTable.set('key', 'value')
            const value = hashTable.get('key')
            expect(value).is.equal('value')
        })

        it('should return undefined if key does not exist', () => {
            const undefinedValue = hashTable.get('nonExistingKey')
            expect(undefinedValue).is.equal(void 0)
        })
    })

    describe('remove()', () => {
        it('should remove element', () => {
            const hashTable = new HashTable()
            hashTable.set(one, dataSet[one])
            hashTable.set(two, dataSet[two])
            hashTable.set(three, dataSet[three])
            expect(hashTable.size).equal(3)

            hashTable.remove(two)
            expect(hashTable.size).equal(2)
            expect(hashTable.get(two)).equal(void 0)
        })
    })

    describe('clear()', () => {
        const hashTable = new HashTable()

        it('should clear whole hashtable', () => {
            Object.keys(dataSet).forEach(key => {
                hashTable.set(key, dataSet[key])
            })
            expect(hashTable.size).equal(Object.keys(dataSet).length)
            hashTable.clear()
            expect(hashTable.size).equal(0)
        })

    })

    describe('size()', () => {
        const hashTable = new HashTable()

        it('should properly display elements count', () => {
            Object.keys(dataSet).forEach((key, index)=> {
                hashTable.set(key, dataSet[key])
                expect(hashTable.size).equal(index + 1)
            })
        })

        it('should be empty after clear() call', () => {
            hashTable.clear()
            expect(hashTable.size).equal(0)
        })

    })
    
    describe('Referential integrity', () => {
        const arr1 = [ one, two, three ]
        const arr2 = [ one, two ]
        const arr3 = [ one ]
        it('should point at same object', () => {
            const hashTable = new HashTable<string[]>()
            hashTable.set('arr1', arr1)
            hashTable.set('arr2', arr2)
            hashTable.set('arr3', arr3)

            expect(hashTable.get('arr1')).equal(arr1)

            hashTable.remove('arr2')
            hashTable.set('arr2', arr2)
            expect(hashTable.get('arr2')).equal(arr2)
            expect(hashTable.get('arr3')).equal(arr3)
        })
    })


})

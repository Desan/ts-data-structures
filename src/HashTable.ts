export interface IHashTable<T extends Object> {
    remove(hash: string): void
    set(hash: string, value: T): void
    get(hash: string): T
    clear(): void
    resize(newSize: number): this
}

export enum Table {
    Key,
    Value
}

export type TableEntry<T> = [string, T]

export class HashTable<T> implements IHashTable<T> {

    private $size: number
    private $table: (TableEntry<T>[] | void)[] = []
    private $elementsCount: number = 0

    public static fromObject<T>(obj: {[key: string]: T}, size?: number) {
        const hashTable = new HashTable<T>(size)
        Object.keys(obj).forEach(key => {
            hashTable.set(key, obj[key])
        })
    }

    public constructor(size: number = 16) {
        this.$size = size
    }

    private hash(key: string): number {
        let hash = 0
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) + hash + key.charCodeAt(i)
            hash = hash & hash
            hash = Math.abs(hash)
        }
        return hash % this.$size
    }

    private findEntry(key: string, precomputedHash?: number) {
        const hash = precomputedHash || this.hash(key)
        const bucket = this.$table[hash]
        if (!bucket) {
            return
        }
        return bucket.find(e => e && e[Table.Key] === key)
    }

    public remove(key: string) {
        const hash = this.hash(key)
        const bucket = this.$table[hash]
        if (bucket) {
            this.$table[hash] = bucket.filter(entry => entry && entry[Table.Key] !== key)
            this.$elementsCount--
        }
    }

    public set(key: string, value: T) {
        const hash = this.hash(key)
        const storedEntry = this.findEntry(key, hash)
        if (storedEntry) {
            storedEntry[Table.Value] = value
        }
        const bucket = this.$table[hash]
        if (bucket) {
            bucket.push([key, value])
            this.$elementsCount++
        } else {
            this.$table[hash] = [ [key, value] ]
            this.$elementsCount++
        }
    }

    public get(key: string): T {
        const entry = this.findEntry(key)
        if (entry) {
            return entry[Table.Value]
        }
    }

    public clear() {
        this.$table = []
        this.$elementsCount = 0
    }

    public resize(newSize: number) {
        return this
    }

    public get size() {
        return this.$elementsCount
    }

}

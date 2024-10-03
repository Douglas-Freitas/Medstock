export default interface Medicine {
  id: string
  name: string
  validity: string
  quantity: number
  batch: string,
  vendor: string,
  medicationInterval: number,
  useAlert: boolean
}
